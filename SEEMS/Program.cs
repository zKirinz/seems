/*using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using Microsoft.OpenApi.Models;

using SEEMS.Configs;
using SEEMS.Contexts;
using SEEMS.Database;
using SEEMS.Infrastructures.Attributes;
using SEEMS.Models;
using SEEMS.Services;
using SEEMS.Services.Interfaces;

using Swashbuckle.AspNetCore.SwaggerGen;

using System.Security.Claims;
using System.Text;
using AutoMapper;
using Quartz;
using Quartz.Impl;
using Quartz.Spi;
using SEEMS;
using SEEMS.Data.Entities.RequestFeatures;
using SEEMS.Services.Jobs;
using SEEMS.Data.Models;
using SameSiteMode = Microsoft.AspNetCore.Http.SameSiteMode;*/

// var builder = WebApplication.CreateBuilder(args);
// var services = builder.Services;
// var configuration = builder.Configuration;

// Add services to the container.

/*services.AddControllersWithViews().AddJsonOptions(options =>
{
	// True to indent the JSON output
	options.JsonSerializerOptions.WriteIndented = true;
});*/

// Add database services to the container.
/*services.AddDbContext<ApplicationDbContext>(options =>
{
	options.UseSqlServer(builder.Configuration.GetConnectionString("AppConnection"));
});*/
//
// var jwtSettings = configuration.GetSection("JwtSettings");
//
// services.AddAuthentication(options =>
// {
// 	options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
// 	options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
// 	options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
// })
// 	.AddJwtBearer(options =>
// 	{
// 		options.RequireHttpsMetadata = true;
// 		options.SaveToken = true;
// 		options.TokenValidationParameters = new TokenValidationParameters
// 		{
// 			ValidateIssuerSigningKey = true,
// 			IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetValue<string>("SecretKey"))),
// 			ValidateLifetime = true,
// 			ValidateAudience = true,
// 			ValidateIssuer = true,
// 			ClockSkew = TimeSpan.Zero,
// 			ValidIssuer = jwtSettings.GetSection("ValidIssuer").Value,
// 			ValidAudience = jwtSettings.GetSection("ValidAudience").Value
// 		};
// 		options.Events = new JwtBearerEvents
// 		{
//
// 			OnAuthenticationFailed = context =>
// 			{
// 				if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
// 				{
// 					context.Response.Headers.Add("Token-Expired", "true");
// 				}
// 				return Task.CompletedTask;
// 			}
// 		};
// 	})
// 	.AddCookie()
// 	.AddGoogle(options =>
// 	{
// 		IConfigurationSection googleAuthNSection = configuration.GetSection("Authentication:Google");
// 		options.ClientId = googleAuthNSection ["ClientId"];
// 		options.ClientSecret = googleAuthNSection ["ClientSecret"];
// 		options.Scope.Add("profile");
// 		options.Events.OnCreatingTicket = ( context ) =>
// 		{
// 			var picture = context.User.GetProperty("picture").GetString();
// 			context.Identity.AddClaim(new Claim("picture", picture));
//
// 			return Task.CompletedTask;
// 		};
// 		options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
// 		options.SaveTokens = true;
// 		options.ReturnUrlParameter = "~/";
// 	});
//
// services.Configure<CookiePolicyOptions>(options =>
// {
// 	options.CheckConsentNeeded = context => true;
// 	options.MinimumSameSitePolicy = SameSiteMode.Strict;
// });

// services.AddScoped<IAuthManager, AuthManager>();
// services.AddScoped<IRepositoryManager, RepositoryManager>();
// //services.AddScoped<IControllerBaseServices<ChainOfEvent>, ControllerBaseServices<ChainOfEvent>>();
// services.AddScoped<IControllerBaseServices<User>, ControllerBaseServices<User>>();
// services.AddScoped<RoleBasedAuthorizationAttribute>();
// services.AddScoped<AuthManager>();
// services.AddEndpointsApiExplorer();
// services.AddSwaggerGen(s =>
// {
// 	s.SwaggerDoc("v1", new OpenApiInfo { Title = "Seem API", Version = "v1" });
//
// 	s.AddSecurityDefinition("token", new OpenApiSecurityScheme
// 	{
// 		Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n 
//                       Enter 'Bearer' [space] and then your token in the text input below.
//                       \r\n\r\nExample: 'Bearer 12345abcdef'",
// 		Type = SecuritySchemeType.ApiKey,
// 		In = ParameterLocation.Header,
// 		Name = HeaderNames.Authorization,
// 		Scheme = "Bearer"
// 	});
// 	s.OperationFilter<SecureEndpointAuthRequirementFilter>();
// });
/*services.AddAutoMapper(typeof(MappingProfile));
services.AddMvc(opt => opt.Filters.Add(typeof(ValidateModelAttribute)));
services.Configure<ApiBehaviorOptions>(options =>
{
	options.SuppressModelStateInvalidFilter = true;
});*/

// var app = builder.Build();
//
// //using (var scope = app.Services.CreateScope())
// //{
// //	ApplicationDbInitializer.Initialize(scope.ServiceProvider);
// //}
//
//
// app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
// app.UseCookiePolicy(new CookiePolicyOptions
// {
// 	Secure = CookieSecurePolicy.Always
// });
// // Configure the HTTP request pipeline.
// if (!app.Environment.IsDevelopment())
// {
// }
// else
// {
// 	app.UseSwagger();
// 	app.UseSwaggerUI(s =>
// 	{
// 		s.SwaggerEndpoint("/swagger/v1/swagger.json", "Seem API v1");
// 		s.OAuthClientId(configuration.GetSection("Authentication:Google") ["ClientId"]);
// 		s.OAuthClientSecret(configuration.GetSection("Authentication:Google") ["ClientSecret"]);
// 		s.OAuthAppName("Google");
// 		s.OAuthUseBasicAuthenticationWithAccessCodeGrant();
// 	});
// }
//
// /*app.UseHttpsRedirection();*/
// app.UseStaticFiles();
//
// app.UseRouting();
//
// app.UseAuthentication();
// app.UseAuthorization();
// app.Use(( httpContext, next ) => // For the oauth2-less!
// {
// 	if (httpContext.Request.Headers ["X-Authorization"].Any())
// 		httpContext.Request.Headers.Add("Authorization", httpContext.Request.Headers ["X-Authorization"]);
//
// 	return next();
// });
// // app.UseAuthorizationMiddleware();
// app.MapControllerRoute(
// 	name: "default",
// 	pattern: "{controller}/{action=Index}/{id?}");
//
//
// Host.CreateDefaultBuilder(args).ConfigureServices((hostContext, services) =>
// {
// 	services.AddDbContext<ApplicationDbContext>(options =>
// 	{
// 		options.UseSqlServer(builder.Configuration.GetConnectionString("AppConnection"));
// 	});
// 	services.AddAutoMapper(typeof(MappingProfile));
// 	services.AddSingleton<IJobFactory, JobFactory>();
// 	services.AddSingleton<ISchedulerFactory, StdSchedulerFactory>();
// 	services.AddScoped<IRepositoryManager, RepositoryManager>();
// 	services.AddScoped<UpdateEventActiveness>();
//
// 	# region Addings jobs
// 	List<JobMeta> metas = new List<JobMeta>();
// 	metas.Add(new JobMeta(Guid.NewGuid(), typeof(UpdateEventActiveness), "Update Activeness job", "0/10 * * * * ?"));
//
// 	services.AddSingleton(metas);
// 	# endregion
// 	services.AddHostedService<JobSchedular>();
// 	
// }).Build().Run();
//
// internal class SecureEndpointAuthRequirementFilter : IOperationFilter
// {
// 	public void Apply( OpenApiOperation operation, OperationFilterContext context )
// 	{
// 		if (!context.ApiDescription
// 				.ActionDescriptor
// 				.EndpointMetadata
// 				.OfType<RoleBasedAuthorizationAttribute>()
// 				.Any())
// 		{
// 			return;
// 		}
//
// 		operation.Security = new List<OpenApiSecurityRequirement>
// 		{
// 			new OpenApiSecurityRequirement
// 			{
// 				[new OpenApiSecurityScheme
// 				{
// 					Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "token" }
// 				}] = new List<string>()
// 			}
// 		};
// 	}
// }

using SEEMS;

public class Program
{
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args)
    {
        return Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilders => { webBuilders.UseStartup<Startup>(); });
    }
}