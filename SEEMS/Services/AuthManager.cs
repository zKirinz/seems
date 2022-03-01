using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.Tokens;
using SEEMS.Data.Models;
using SEEMS.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Net.Http.Headers;
using SEEMS.Data.Entities;
using SEEMS.Models;

namespace SEEMS.Services
{
    public class AuthManager : IAuthManager
    {

        private readonly IConfiguration _configuration;
        private readonly IRepositoryManager _repoManager;

        public readonly DateTime EXPIRED_AT = DateTime.UtcNow.AddMinutes(20);

        public AuthManager(IConfiguration config, IRepositoryManager repoManager)
        {
            _configuration = config;
            _repoManager = repoManager;
        }


        public async Task<string> GenerateToken(User user, UserMeta roleMeta, Organization? organization)
        {
            var signinCredentials = GetSigninCredentials();
            var claims = await GetClaims(user, roleMeta, organization);
            var tokenOptions = GenerateTokenOptions(signinCredentials, claims);

            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);

        }

        public JwtSecurityToken DecodeToken(string token)
        {
            string parsedToken = token.Replace("Bearer ", string.Empty);
            var handler = new JwtSecurityTokenHandler();
            return handler.ReadJwtToken(parsedToken);
        }

        private SigningCredentials GetSigninCredentials()
        {
            var key = Encoding.UTF8.GetBytes(_configuration.GetValue<string>("SecretKey"));
            var secret = new SymmetricSecurityKey(key);

            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        }

        private Task<List<Claim>> GetClaims(User user, UserMeta roleMeta, Organization? organization)
        {
            var claims = new List<Claim>
            {
               new Claim("email", user.Email),
               new Claim("name", user.UserName),
               new Claim("role", roleMeta.MetaValue),
               new Claim("organization", organization.Name),
               new Claim("image", user.ImageUrl)
            };

            return Task.FromResult(claims);
        }

        private JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");

            var tokenOptions = new JwtSecurityToken
                (
                    jwtSettings.GetSection("ValidIssuer").Value,
                    jwtSettings.GetSection("ValidAudience").Value,
                    claims,
                    expires: DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings.GetSection("expires").Value)),
                    signingCredentials: signingCredentials
                );

            return tokenOptions;
        }

        public User? GetUserInfo(AuthenticateResult info)
        {
            var email = info.Principal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Email);
            User user; 
            if (email != null && !email.Value.EndsWith("fpt.edu.vn")) {
                return null;
            }
            

            {
                var name = info.Principal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name);
                var image = info.Principal.Claims.FirstOrDefault(x => x.Type == "picture");
            
                user = new User()
                {
                    Email = email.Value,
                    UserName = name.Value,
                    ImageUrl = image.Value
                };
            
                return user;
            }

        }

        public string? GetCurrentEmail(HttpRequest request)
        {
            string currentUser = null;
            try
            {
                if (request.Headers.TryGetValue(HeaderNames.Authorization, out var headers))
                {
                    string token = headers.First();
                    currentUser = DecodeToken(token).Claims.FirstOrDefault(e => e.Type == "email").Value;
                }
            }
            catch
            {
                return null;
            }

            return currentUser;
        }
    }
}
