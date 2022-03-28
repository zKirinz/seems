using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using SEEMS.Data.Models;
using SEEMS.Models;
using SEEMS.Services.Interfaces;

namespace SEEMS.Services;

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


    public async Task<string> GenerateToken(User user, UserMeta roleMeta)
    {
        var signinCredentials = GetSigninCredentials();
        var claims = await GetClaims(user, roleMeta);
        var tokenOptions = GenerateTokenOptions(signinCredentials, claims);

        return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
    }

    public JwtSecurityToken DecodeToken(string token)
    {
        var parsedToken = token.Replace("Bearer ", string.Empty);
        var handler = new JwtSecurityTokenHandler();
        return handler.ReadJwtToken(parsedToken);
    }

    public User? GetUserInfo(AuthenticateResult info)
    {
        var email = info.Principal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Email);
        User user;
        if (email != null && !email.Value.EndsWith("fpt.edu.vn")) return null;

        {
            var name = info.Principal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name);
            var image = info.Principal.Claims.FirstOrDefault(x => x.Type == "picture");

            user = new User
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
                var token = headers.First();
                currentUser = DecodeToken(token).Claims.FirstOrDefault(e => e.Type == "email").Value;
            }
        }
        catch
        {
            return null;
        }

        return currentUser;
    }

    private SigningCredentials GetSigninCredentials()
    {
        var key = Encoding.UTF8.GetBytes(_configuration.GetValue<string>("SecretKey"));
        var secret = new SymmetricSecurityKey(key);

        return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
    }

    private Task<List<Claim>> GetClaims(User user, UserMeta roleMeta)
    {
        var claims = new List<Claim>
        {
            new("email", user.Email),
            new("name", user.UserName),
            new("organization", user.OrganizationName.ToString()),
            new("role", roleMeta.MetaValue),
            new("image", user.ImageUrl)
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
}