using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using SEEMS.Data.Models;
using System.Security.Claims;
using SEEMS.Models;

namespace SEEMS.Services.Interfaces
{
    public interface IAuthManager
    {

        public Task<string> GenerateToken(User user, UserMeta roleMeta);

        public JwtSecurityToken DecodeToken(string token);

        public User? GetUserInfo(AuthenticateResult info);

    }
}
