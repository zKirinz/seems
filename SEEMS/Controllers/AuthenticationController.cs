using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using SEEMS.Contexts;
using SEEMS.Data.Models;
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
        private readonly IAuthManager _authService;
        private readonly IRepositoryManager _repoService;

        public AuthenticationController(IAuthManager authService, IRepositoryManager repoService)
        {
            this._authService = authService;
            this._repoService = repoService;
        }

        [HttpGet]
        public IActionResult ExternalLogin(string provider)
        {
            var props = new AuthenticationProperties();
            var callback = Url.Action("ExternalLoginCallBack");
            props.RedirectUri = callback;
            return Challenge(props, provider);
        }

        [Route("~/sigin-google")]
        public async Task<IActionResult> ExternalLoginCallBack()
        {
            var info = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            var currentUser = _authService.GetUserInfo(info);
           
            if (await _repoService.User.GetUserAsync(currentUser.Email, trackChanges: false) == null) 
            {
                 _repoService.User.CreateUser(currentUser);
                await _repoService.SaveAsync();
            }

            return Ok(new { Token = await _authService.GenerateToken(currentUser) });
        }
    }
}
