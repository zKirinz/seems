using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SEEMS.Models.Identities;
using SEEMS.Services;
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
        private readonly AuthService _service;

        public AuthenticationController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, AuthService service)
        {
            this._signInManager = signInManager;
            this._userManager = userManager;
            this._service = service;
        }

        [HttpGet]

        public IActionResult ExternalLogin(string provider, string returnUrl=null)
        {
            var props = _signInManager.ConfigureExternalAuthenticationProperties(provider, returnUrl);
            var callback = Url.Action("ExternalLoginCallBack");
            props.RedirectUri = callback;
            return Challenge(props, provider);
        }

        [Route("~/sigin-google")]
        public async Task<IActionResult> ExternalLoginCallBack()
        {
            var info = await _signInManager.GetExternalLoginInfoAsync();

            var user = _service.GetUserInfo(info);

            await _userManager.CreateAsync(user);
            await _userManager.AddLoginAsync(user, info);
            await _signInManager.SignInAsync(user, false);

            var claims = _service.GetUserClaims(user);

            return Ok(new
            {
                access_token = _service.GenerateToken(claims),
                expire_at = _service.EXPIRED_AT
            });
        }
    }
}
