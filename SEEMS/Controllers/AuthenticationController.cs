using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using SEEMS.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SEEMS.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("/api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private const string BaseUiDomain = "http://localhost:44449";
        private readonly IAuthManager _authService;
        private readonly IRepositoryManager _repoService;

        public AuthenticationController(IAuthManager authService, IRepositoryManager repoService)
        {
            this._authService = authService;
            this._repoService = repoService;
        }

        [HttpGet("")]
        public IActionResult ExternalLogin()
        {
            var props = new AuthenticationProperties();
            var callback = Url.Action("ExternalLoginCallBack");
            props.RedirectUri = callback;
            return Challenge(props, "Google");
        }

        [HttpGet]
        [Route("~/sigin-google")]
        public async Task<IActionResult> ExternalLoginCallBack()
        {
            var info = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            var currentUser = _authService.GetUserInfo(info);

            if (currentUser == null)
            {
                return Redirect(Url.Action("ExternalLogin"));
            }

            if (await _repoService.User.GetUserAsync(currentUser.Email, trackChanges: false) == null)
            {
                _repoService.User.CreateUser(currentUser);
                await _repoService.SaveAsync();
            }

            var accessToken = await _authService.GenerateToken(currentUser);

            Response.Cookies.Append("jwt", accessToken, new CookieOptions
            {
                HttpOnly = true
            });

            return Redirect($"{BaseUiDomain}/oauth-google?token={accessToken}");
        }
    }
}
