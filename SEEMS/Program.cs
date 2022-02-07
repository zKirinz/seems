using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SEEMS.Configs;
using SEEMS.Contexts;
using SEEMS.Data.Models;
using SEEMS.Data.Repositories;
using SEEMS.Data.Repositories.Implements;
using SEEMS.Services;
using SEEMS.Services.Interfaces;
using System.Security.Claims;
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
services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("AppConnection"));
});

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
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetValue<string>("SecretKey"))),
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
                {
                    context.Response.Headers.Add("Token-Expired", "true");
                }
                return Task.CompletedTask;
            }
        };
    })
    .AddCookie()
    .AddGoogle(options =>
    {
        IConfigurationSection googleAuthNSection = configuration.GetSection("Authentication:Google");
        options.ClientId = googleAuthNSection["ClientId"];
        options.ClientSecret = googleAuthNSection["ClientSecret"];
        options.Scope.Add("profile");
        options.Events.OnCreatingTicket = (context) =>
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

services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireClaim("Admin"));
    options.AddPolicy("Organizer", policy => policy.RequireClaim("Organizer"));
});

services.AddScoped<IAuthManager, AuthManager>();
services.AddScoped<IRepositoryManager, RepositoryManager>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(MappingProfile));

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
    /*app.UseMigrationsEndPoint();*/
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
