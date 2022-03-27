using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authentication;
using SEEMS.Data.Models;
using SEEMS.Models;

namespace SEEMS.Services.Interfaces;

public interface IAuthManager
{
    public Task<string> GenerateToken(User user, UserMeta roleMeta /*, Organization? organization*/);

    public JwtSecurityToken DecodeToken(string token);

    public User? GetUserInfo(AuthenticateResult info);

    public string? GetCurrentEmail(HttpRequest request);
}