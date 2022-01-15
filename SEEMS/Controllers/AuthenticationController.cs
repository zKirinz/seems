using Google.Apis.Auth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using SEEMS.Configs;
using SEEMS.Models;
using SEEMS.Models.Identities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SEEMS.Controllers
{
    /*    [Produces("application/json")]*/
    [ApiController]
    [Route("/api/[controller]")]
    public class AuthenticationController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AuthenticationController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            this._signInManager = signInManager;
            this._userManager = userManager;
        }
        
        [HttpGet]
        public IActionResult ExternalLogin(String provider, String returnUrl=null)
        {
            var props = _signInManager.ConfigureExternalAuthenticationProperties(provider, returnUrl);
            var callback = Url.Action("ExternalLoginCallBack");
            props.RedirectUri = callback;
            return Challenge(props, provider);
        }

        public async Task<IActionResult> ExternalLoginCallBack()
        {
            var info = await _signInManager.GetExternalLoginInfoAsync();

            var emailClaim = info.Principal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Email);
            var user = new User { EmailAddress = emailClaim.Value, FullName = emailClaim.Value };

            await _userManager.CreateAsync(user);
            await _userManager.AddLoginAsync(user, info);
            await _signInManager.SignInAsync(user, false);

            return RedirectToAction("/", "Values");
        }
    }
}
