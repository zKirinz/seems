using Google.Apis.Auth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using SEEMS.Configs;
using SEEMS.Models;
using SEEMS.Models.Identities;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SEEMS.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("/api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;

        public AuthenticationController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration)
        {
            this._signInManager = signInManager;
            this._userManager = userManager;
            this._configuration = configuration;
        }

        [HttpGet]

        public IActionResult ExternalLogin(string provider, string returnUrl=null)
        {
            var props = _signInManager.ConfigureExternalAuthenticationProperties(provider, returnUrl);
            var callback = Url.Action("ExternalLoginCallBack");
            props.RedirectUri = callback;
            return Challenge(props, provider);
        }

        private string GenerateToken(IEnumerable<Claim> claims, DateTime expiredAt)
        {
            var secretKey = Encoding.UTF8.GetBytes(_configuration.GetValue<string>("SecretKey"));
            var jwtToken = new JwtSecurityToken(
                    claims: claims,
                    notBefore: DateTime.UtcNow,
                    expires: expiredAt,
                    signingCredentials: new SigningCredentials(
                            new SymmetricSecurityKey(secretKey),
                            SecurityAlgorithms.HmacSha256Signature
                        )
                );

            return new JwtSecurityTokenHandler().WriteToken(jwtToken);
        }

        [Route("~/sigin-google")]
        public async Task<IActionResult> ExternalLoginCallBack()
        {
            var info = await _signInManager.GetExternalLoginInfoAsync();

            var emailClaim = info.Principal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Email);
            var user = new ApplicationUser { EmailAddress = emailClaim.Value, FullName = emailClaim.Value };

            await _userManager.CreateAsync(user);
            /*    await _userManager.AddLoginAsync(user, info);*/
            /*            await _signInManager.SignInAsync(user, false);*/

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.FullName),
                new Claim(ClaimTypes.Email, user.EmailAddress)
            };

            var expiredAt = DateTime.UtcNow.AddMinutes(30);

            return Ok(new
            {
                access_token = GenerateToken(claims, expiredAt),
                expire_at = expiredAt
            });
        }
    }
}
