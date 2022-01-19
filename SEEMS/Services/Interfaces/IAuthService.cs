using Microsoft.AspNetCore.Identity;
using SEEMS.Models.Identities;
using System.Security.Claims;

namespace SEEMS.Services.Interfaces
{
    public interface IAuthService
    {

        public string GenerateToken(IEnumerable<Claim> claims);

        public ApplicationUser GetUserInfo(ExternalLoginInfo info);

        public List<Claim> GetUserClaims(ApplicationUser user);

        public DateTime GetExpiration();
    }
}
