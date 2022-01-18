using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using SEEMS.Models.Identities;
using SEEMS.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SEEMS.Services
{
    public class AuthService : IAuthService
    {

        private readonly IConfiguration _configuration;

        public readonly DateTime EXPIRED_AT = DateTime.UtcNow.AddMinutes(20);

        public AuthService(IConfiguration config)
        {
            this._configuration = config;
        }

        public string GenerateToken(IEnumerable<Claim> claims)
        {
            var secretKey = Encoding.UTF8.GetBytes(_configuration.GetValue<string>("SecretKey"));
            var jwtToken = new JwtSecurityToken(
                    claims: claims,
                    notBefore: DateTime.UtcNow,
                    expires: EXPIRED_AT,
                    signingCredentials: new SigningCredentials(
                            new SymmetricSecurityKey(secretKey),
                            SecurityAlgorithms.HmacSha256Signature
                        )
                );

            return new JwtSecurityTokenHandler().WriteToken(jwtToken);
        }

        public ApplicationUser GetUserInfo(ExternalLoginInfo info)
        {
            var emailClaim = info.Principal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Email);

            return new ApplicationUser
            #pragma warning disable CS8602 // Dereference of a possibly null reference.
            {
                Email = emailClaim.Value,
                UserName = emailClaim.Value,
            };
            #pragma warning restore CS8602 // Dereference of a possibly null reference.

        }

        public List<Claim> GetUserClaims(ApplicationUser user)
        {
            return new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email)
            };
        }

        public DateTime GetExpiration()
        {
            return EXPIRED_AT;
        }
    }
}
