using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.Tokens;
using SEEMS.Data.Models;
using SEEMS.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SEEMS.Services
{
    public class AuthManager : IAuthManager
    {

        private readonly IConfiguration _configuration;
        private readonly IRepositoryManager _repository;

        public readonly DateTime EXPIRED_AT = DateTime.UtcNow.AddMinutes(20);

        public AuthManager(IRepositoryManager repository, IConfiguration config)
        {
            this._configuration = config;
            this._repository = repository;
        }


        public async Task<string> GenerateToken(User user)
        {
            var signinCredentials = GetSigninCredentials();
            var claims = await GetClaims(user);
            var tokenOptions = GenerateTokenOptions(signinCredentials, claims);

            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);

        }

        private SigningCredentials GetSigninCredentials()
        {
            var key = Encoding.UTF8.GetBytes(_configuration.GetValue<string>("SecretKey"));
            var secret = new SymmetricSecurityKey(key);

            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        }

        private async Task<List<Claim>> GetClaims(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName)
            };

            return claims;
        }

        private JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");

            var tokenOptions = new JwtSecurityToken
                (
                    issuer: jwtSettings.GetSection("ValidIssuer").Value,
                    audience: jwtSettings.GetSection("ValidAudience").Value,
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings.GetSection("expires").Value)),
                    signingCredentials: signingCredentials
                );

            return tokenOptions;
        }

        public User GetUserInfo(AuthenticateResult info)
        {
            var email = info.Principal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Email);
            var name = info.Principal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name);
            var image = info.Principal.Claims.FirstOrDefault(x => x.Type == "picture");

            return new User
            #pragma warning disable CS8602 // Dereference of a possibly null reference.
                {
                    Email = email.Value,
                    UserName = name.Value,
                    ImageUrl = image.Value
                };
            #pragma warning restore CS8602 // Dereference of a possibly null reference.

        }
    }
}
