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
                    var roleFromToken = jwtToken.Claims.First(x => x.Type == "role").Value;
                    var emailFromToken = jwtToken.Claims.First(x => x.Type == "email").Value;
                    //Get user from dbContext
                    var user = dbContext.Users.FirstOrDefault(x => x.Email == emailFromToken);
                    if (user != null)
                    {
                        //Get userMeta from dbContext
                        var userMeta = dbContext.UserMetas.FirstOrDefault(x => x.User == user);
                        if (userMeta != null)
                        {
                            //Compare role from token and role from dbContext
                            if (userMeta.MetaValue.Contains(roleFromToken))
                            {
                                //Add role to httpContext if role from token and role from dbContext are same
                                context.Items["role"] = roleFromToken;
                                context.Items["email"] = emailFromToken;
                            }
                        }
                    }                    
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
