using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SEEMS.Configs;
using SEEMS.Database;
using SEEMS.Handlers.Options;
using SEEMS.Models;
using SEEMS.Models.Identities;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var configuration = builder.Configuration;

// Add services to the container.

services.AddControllersWithViews();

/*services.AddIdentity<ApplicationUser, ApplicationRole>()
     .AddEntityFrameworkStores<ApplicationDbContext>();
*/
// Add database services to the container.
services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("AppConnection"));
});
services.AddIdentity<User, ApplicationRole>(options =>
{
    options.Password.RequiredLength = 8;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;

    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15);

    options.User.RequireUniqueEmail = true;
    options.SignIn.RequireConfirmedEmail = true;
})
/*services.AddDefaultIdentity<User>(options =>
                                 options.SignIn.RequireConfirmedAccount = true)*/
    .AddEntityFrameworkStores<ApplicationDbContext>();

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
/*            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(configuration.GetValue<string>("SecretKey"))),*/
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
services.AddOptions<ExternalAuthOptions>();

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
