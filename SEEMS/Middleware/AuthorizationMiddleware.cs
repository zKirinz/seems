using Microsoft.IdentityModel.Tokens;
using SEEMS.Contexts;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace SEEMS.Services
{
    public class AuthorizationMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IConfiguration _config;
        public AuthorizationMiddleware(RequestDelegate next, IConfiguration config)
        {
            _next = next;
            _config = config;
        }

        public async Task InvokeAsync(HttpContext context, ApplicationDbContext dbContext)
        {
            //Get jwt token from cookies
            var token = context.Request.Cookies["jwt"];
            if (token != null)
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var parsedToken = token.Replace("Bearer", string.Empty);
                //Validate token
                try
                {
                    tokenHandler.ValidateToken(parsedToken, new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetValue<string>("SecretKey"))),
                        ValidateLifetime = false,
                        ValidateAudience = false,
                        ValidateIssuer = false,
                        ClockSkew = TimeSpan.Zero,
                    }, out SecurityToken validatedToken);

                    var jwtToken = (JwtSecurityToken)validatedToken;
                    var role = jwtToken.Claims.First(x => x.Type == "role").Value;
                    context.Items["role"] = role;
                }
                catch
                {
                    //Handle when validate token fail
                }
            }
            await _next(context);
        }

    }

    public static class AuthorizationMiddlewareExtentions
    {
        public static IApplicationBuilder UseAuthorizationMiddleware(
            this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<AuthorizationMiddleware>();
        }
    }
}
