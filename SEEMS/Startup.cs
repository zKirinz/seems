using SEEMS.Infrastructures.Extensions;

namespace SEEMS;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IConfiguration configuration)
    {
        app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
        app.UseCookiePolicy(new CookiePolicyOptions
        {
            Secure = CookieSecurePolicy.Always
        });
        // Configure the HTTP request pipeline.
        if (!env.IsDevelopment())
        {
        }
        else
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
        app.Use((httpContext, next) => // For the oauth2-less!
        {
            if (httpContext.Request.Headers["X-Authorization"].Any())
                httpContext.Request.Headers.Add("Authorization", httpContext.Request.Headers["X-Authorization"]);

            return next();
        });
        // app.UseAuthorizationMiddleware();

        app.UseEndpoints(endpoints => { endpoints.MapControllers(); });

        // app.MapControllerRoute(name: "default", pattern: "{controller}/{action=Index}/{id?}");

        //app.UseUserActivationMiddleware();
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.ConfigureJson();
        services.ConfigureSql(Configuration);
        services.ConfigureAuthentication(Configuration);
        services.ConfigureScope(Configuration);
        services.ConfigureSwagger();
        services.ConfigureAutoMapper();
        services.ConfigureFilter();
        services.ConfigureApiBehaviour();
        services.ConfigureQuartzJob(Configuration);
    }
}