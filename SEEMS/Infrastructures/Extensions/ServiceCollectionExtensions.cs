using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SEEMS.Contexts;
using SEEMS.Data.Models;
using SEEMS.Infrastructures.Attributes;
using SEEMS.Services;
using SEEMS.Services.Interfaces;
using Swashbuckle.AspNetCore.SwaggerGen;
using Microsoft.Net.Http.Headers;
using Quartz;
using Quartz.Impl;
using Quartz.Spi;
using SEEMS.Configs;
using SEEMS.Data.Entities.RequestFeatures;
using SEEMS.Services.Jobs;
using SameSiteMode = Microsoft.AspNetCore.Http.SameSiteMode;

namespace SEEMS.Infrastructures.Extensions;

public static class ServiceCollectionExtensions
{
    public static void ConfigureSql(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseSqlServer(configuration.GetConnectionString("AppConnection"),
                sqlOptions =>
                {
                    sqlOptions.EnableRetryOnFailure();
                    sqlOptions.MinBatchSize(1).MaxBatchSize(10);
                    sqlOptions.CommandTimeout(50);
                });
        });
    }

    public static void ConfigureAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        var jwtSettings = configuration.GetSection("JwtSettings");

        services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = true;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey =
                        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetValue<string>("SecretKey"))),
                    ValidateLifetime = true,
                    ValidateAudience = true,
                    ValidateIssuer = true,
                    ClockSkew = TimeSpan.Zero,
                    ValidIssuer = jwtSettings.GetSection("ValidIssuer").Value,
                    ValidAudience = jwtSettings.GetSection("ValidAudience").Value
                };
                options.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                            context.Response.Headers.Add("Token-Expired", "true");
                        return Task.CompletedTask;
                    }
                };
            })
            .AddCookie()
            .AddGoogle(options =>
            {
                var googleAuthNSection = configuration.GetSection("Authentication:Google");
                options.ClientId = googleAuthNSection["ClientId"];
                options.ClientSecret = googleAuthNSection["ClientSecret"];
                options.Scope.Add("profile");
                options.Events.OnCreatingTicket = context =>
                {
                    var picture = context.User.GetProperty("picture").GetString();
                    context.Identity.AddClaim(new Claim("picture", picture));

                    return Task.CompletedTask;
                };
                options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.SaveTokens = true;
                options.ReturnUrlParameter = "~/";
            });

        services.Configure<CookiePolicyOptions>(options =>
        {
            options.CheckConsentNeeded = context => true;
            options.MinimumSameSitePolicy = SameSiteMode.Strict;
        });
    }

    public static void ConfigureScope(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<IAuthManager, AuthManager>();
        services.AddScoped<IRepositoryManager, RepositoryManager>();
        services.AddScoped<IControllerBaseServices<User>, ControllerBaseServices<User>>();
        services.AddScoped<RoleBasedAuthorizationAttribute>();
        services.AddScoped<CheckUserStatus>();
        services.AddScoped<IEmailService, EmailService>();
        services.AddScoped<IQRGeneratorService, QRGeneratorService>();
        services.AddScoped<AuthManager>();
        services.AddSingleton<IJobFactory, JobFactory>();
        services.AddSingleton<ISchedulerFactory, StdSchedulerFactory>();
        services.AddScoped<InactivateEventJob>();
        services.AddScoped<InactivateUserJob>();

        #region Quartz

        var metas = new List<JobMeta>();
        metas.Add(GetJobMeta(typeof(UpdateEventActiveness), configuration));
        metas.Add(GetJobMeta(typeof(InactivateEventJob), configuration));
        metas.Add(GetJobMeta(typeof(InactivateUserJob), configuration));
        services.AddSingleton(metas);
        services.AddHostedService<JobSchedular>();

        #endregion
    }

    public static void ConfigureSwagger(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(s =>
        {
            s.SwaggerDoc("v1", new OpenApiInfo {Title = "Seem API", Version = "v1"});

            s.AddSecurityDefinition("token", new OpenApiSecurityScheme
            {
                Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n 
                      Enter 'Bearer' [space] and then your token in the text input below.
                      \r\n\r\nExample: 'Bearer 12345abcdef'",
                Type = SecuritySchemeType.ApiKey,
                In = ParameterLocation.Header,
                Name = HeaderNames.Authorization,
                Scheme = "Bearer"
            });
            s.OperationFilter<SecureEndpointAuthRequirementFilter>();
        });
    }

    public static void ConfigureAutoMapper(this IServiceCollection services)
    {
        services.AddAutoMapper(typeof(MappingProfile));
    }

    public static void ConfigureFilter(this IServiceCollection services)
    {
        services.AddMvc(opt => opt.Filters.Add(typeof(ValidateModelAttribute)));
    }

    public static void ConfigureApiBehaviour(this IServiceCollection services)
    {
        services.Configure<ApiBehaviorOptions>(options => { options.SuppressModelStateInvalidFilter = true; });
    }

    public static void ConfigureJson(this IServiceCollection services)
    {
        services.AddControllersWithViews().AddJsonOptions(options =>
        {
            // True to indent the JSON output
            options.JsonSerializerOptions.WriteIndented = true;
        });
    }

    public static void ConfigureQuartzJob(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddQuartz(q =>
        {
            q.UseMicrosoftDependencyInjectionJobFactory();

            var firstJob = GetJobMeta(typeof(UpdateEventActiveness), configuration);
            var firstKey = new JobKey(firstJob.JobName);

            q.AddJob<UpdateEventActiveness>(opts => opts.WithIdentity(firstKey));

            // Create a trigger for the job
            q.AddTrigger(opts => opts
                .ForJob(firstKey)
                .WithIdentity($"{firstJob.JobName}-trigger")
                .WithCronSchedule(firstJob.CronExpression));

        });
        services.AddQuartz(q =>
        {
            q.UseMicrosoftDependencyInjectionJobFactory();
        });
        services.AddQuartzHostedService(q => q.WaitForJobsToComplete = true);
    }

    private static JobMeta GetJobMeta(Type jobType, IConfiguration configuration)
    {
        var configKey = $"Quartz:{jobType.Name}";
        var cronSchedule = configuration[configKey];

        return new JobMeta(Guid.NewGuid(), jobType, jobType.Name, cronSchedule);
    }
}

internal class SecureEndpointAuthRequirementFilter : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        if (!context.ApiDescription
                .ActionDescriptor
                .EndpointMetadata
                .OfType<RoleBasedAuthorizationAttribute>()
                .Any())
            return;

        operation.Security = new List<OpenApiSecurityRequirement>
        {
            new()
            {
                [new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference {Type = ReferenceType.SecurityScheme, Id = "token"}
                }] = new List<string>()
            }
        };
    }
}