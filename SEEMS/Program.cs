using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SEEMS.Configs;
using SEEMS.Database;
using SEEMS.Models;
using SEEMS.Models.Identities;
using SEEMS.Services;
using SEEMS.Services.Interfaces;
using System.Reflection;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var configuration = builder.Configuration;

// Add services to the container.

services.AddControllersWithViews().AddJsonOptions(options =>
{
    // True to indent the JSON output
    options.JsonSerializerOptions.WriteIndented = true;
});

// Add database services to the container.
services.AddDbContext<IdentityDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("AppConnection"));
});
services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
{
/*    options.Password.RequiredLength = 8;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;*/

    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15);
/*
    options.User.RequireUniqueEmail = true;
    options.SignIn.RequireConfirmedEmail = true;*/
})
/*services.AddDefaultIdentity<User>(options =>
                                 options.SignIn.RequireConfirmedAccount = true)*/
    .AddEntityFrameworkStores<IdentityDbContext>();

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
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetValue<string>("SecretKey"))),
            ValidateLifetime = true,
            ValidateAudience = false,
            ValidateIssuer = false,
            ClockSkew = TimeSpan.Zero
        };
        options.Events = new JwtBearerEvents
        {

            OnAuthenticationFailed = context =>
            {
                if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                {
                    context.Response.Headers.Add("Token-Expired", "true");
                }
                return Task.CompletedTask;
            }
        };
    })
    .AddGoogle(options =>
    {
        IConfigurationSection googleAuthNSection = configuration.GetSection("Authentication:Google");
        options.ClientId = googleAuthNSection["ClientId"];
        options.ClientSecret = googleAuthNSection["ClientSecret"];
        options.SignInScheme = IdentityConstants.ExternalScheme;
        options.SaveTokens = true;
        options.ReturnUrlParameter = "~/";
        options.Events.OnCreatingTicket = ctx =>
        {
            List<AuthenticationToken> tokens = ctx.Properties.GetTokens().ToList();

            tokens.Add(new AuthenticationToken()
            {
                Name = "TicketCreated",
                Value = DateTime.UtcNow.ToString()
            });

            ctx.Properties.StoreTokens(tokens);

            return Task.CompletedTask;
        };
    });

services.Configure<CookiePolicyOptions>(options =>
{
    options.CheckConsentNeeded = context => true;
    options.MinimumSameSitePolicy = SameSiteMode.Strict;
});

services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireClaim("Admin"));
    options.AddPolicy("Organizer", policy => policy.RequireClaim("Organizer"));
});

services.AddSingleton<IAuthService, AuthService>();
/*services.AddHttpContextAccessor();*/

services.AddEndpointsApiExplorer();
services.AddSwaggerGen(s =>
{
    s.SwaggerDoc("v1", new OpenApiInfo { Title = "Seem API", Version = "v1" });

    s.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n 
                      Enter 'Bearer' [space] and then your token in the text input below.
                      \r\n\r\nExample: 'Bearer 12345abcdef'",
        Type = SecuritySchemeType.OAuth2,
        Flows = new OpenApiOAuthFlows()
        {
            Implicit = new OpenApiOAuthFlow()
            {
                AuthorizationUrl = new Uri("http://localhost:5148/api/authentication?provider=Google&returnUrl=/"),
                Scopes = new Dictionary<string, string>
                {
                    { "readAccess", "Access Read Operations" },
                    { "writeAccess", "Access Write Operations" }
                }
            }
        }
    });

    s.AddSecurityRequirement(new OpenApiSecurityRequirement()
      {
        {
          new OpenApiSecurityScheme
          {
            Reference = new OpenApiReference
              {
                Type = ReferenceType.SecurityScheme,
                Id = "oauth2"
              },
            },
            new [] { "readAccess", "writeAccess" }
          }
        });
});
services.AddAutoMapper(typeof(MappingProfile));

var app = builder.Build();
app.UseCookiePolicy(new CookiePolicyOptions
{
    Secure = CookieSecurePolicy.Always
});
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{

} else
{
    app.UseSwagger();
    app.UseSwaggerUI(s =>
    {
        s.SwaggerEndpoint("/swagger/v1/swagger.json", "Seem API v1");
        s.OAuthClientId(configuration.GetSection("Authentication:Google")["ClientId"]);
        s.OAuthClientSecret(configuration.GetSection("Authentication:Google")["ClientSecret"]);
        s.OAuthAppName("Google");
        s.OAuthUseBasicAuthenticationWithAccessCodeGrant();
    });
}

/*app.UseHttpsRedirection();*/
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();
app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
app.Use((httpContext, next) => // For the oauth2-less!
{
    if (httpContext.Request.Headers["X-Authorization"].Any())
        httpContext.Request.Headers.Add("Authorization", httpContext.Request.Headers["X-Authorization"]);

    return next();
});
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
