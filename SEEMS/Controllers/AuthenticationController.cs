using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SEEMS.Models.Identities;
using SEEMS.Services;
using SEEMS.Services.Interfaces;
using System.Security.Claims;

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
        private readonly IAuthService _service;

        public AuthenticationController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IAuthService service)
        {
            this._signInManager = signInManager;
            this._userManager = userManager;
            this._service = service;
        }

        [HttpGet("")]
        public IActionResult ExternalLogin(string provider, string returnUrl=null)
        {
            var props = _signInManager.ConfigureExternalAuthenticationProperties(provider, returnUrl);
            var callback = Url.Action("ExternalLoginCallBack");
            props.RedirectUri = callback;
            return Challenge(props, provider);
        }

        [HttpGet]
        [Route("~/sigin-google")]
        public async Task<IActionResult> ExternalLoginCallBack()
        {
            var info = await _signInManager.GetExternalLoginInfoAsync();

            var user = _service.GetUserInfo(info);

            var foundUser = await _userManager.FindByEmailAsync(user.Email);
            if (foundUser == null)
            {
                await _userManager.CreateAsync(user);
                await _signInManager.SignInAsync(user, false);

            }
            await _userManager.AddLoginAsync(user, info);


            var claims = _service.GetUserClaims(user);

            return Ok(new
            {
                access_token = _service.GenerateToken(claims),
                expire_at = _service.GetExpiration()
            });
        }
    }
}
