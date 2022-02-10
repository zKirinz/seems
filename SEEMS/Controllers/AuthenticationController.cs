﻿using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using SEEMS.Infrastructures.Commons;
using SEEMS.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SEEMS.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("/api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private const string BaseUiDomain = "http://localhost:44449/oauth-google";
        private readonly IAuthManager _authService;
        private readonly IRepositoryManager _repoService;

        public AuthenticationController(IAuthManager authService, IRepositoryManager repoService)
        {
            _authService = authService;
            _repoService = repoService;
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
                return Redirect($"{BaseUiDomain}?error=fpt-invalid-email");
            }

            if (await _repoService.User.GetUserAsync(currentUser.Email, trackChanges: false) == null)
            {
                _repoService.User.CreateUser(currentUser);
                _repoService.UserMeta.RegisterRole(currentUser, RoleTypes.CUSR);
                await _repoService.SaveAsync();
            }

            var currentRole = await _repoService.UserMeta.GetRolesAsync(currentUser.Email, false);
            var accessToken = await _authService.GenerateToken(currentUser, currentRole);

            Response.Cookies.Append("jwt", accessToken, new CookieOptions
            {
                HttpOnly = true
            });

            return Redirect($"{BaseUiDomain}?token={accessToken}");
        }
        
        [HttpPost]
        [Route("auth")]
        public IActionResult IsAuthenticated()
        {
            string message = "invalid";
            if (Request.Headers.TryGetValue("token", out var headers))
            {
                string token = headers.First();
                var jwtToken = _authService.DecodeToken(token);

                var emailClaim = jwtToken.Claims.FirstOrDefault(x => x.Type == "email").Value;
                var roleClaim = jwtToken.Claims.FirstOrDefault(x => x.Type == "role");

                if ( _repoService.User.GetUserAsync(emailClaim, false) != null)
                {
                    message = "success";
                }
            }

            return Ok(message);
        }

    }
    
}
