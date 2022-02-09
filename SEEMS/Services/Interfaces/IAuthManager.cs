using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using SEEMS.Data.Models;
using System.Security.Claims;

namespace SEEMS.Services.Interfaces
{
    public interface IAuthManager
    {

        public Task<string> GenerateToken(User user);

        public User? GetUserInfo(AuthenticateResult info);

    }
}
