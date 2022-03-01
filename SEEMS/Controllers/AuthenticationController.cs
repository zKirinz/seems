using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Microsoft.Net.Http.Headers;
using Microsoft.OpenApi.Extensions;
using SEEMS.Data.Entities;
using SEEMS.Data.Models;
using SEEMS.Infrastructures.Commons;
using SEEMS.Models;
using SEEMS.Services;
using SEEMS.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SEEMS.Controllers;

[Produces("application/json")]
[ApiController]
[Route("/api/[controller]")]
public class AuthenticationController : ControllerBase
{
    private readonly IAuthManager _authService;
    private readonly IRepositoryManager _repoService;
    private readonly IMapper _mapper;
    private readonly IControllerBaseServices<User> _baseServices;

    public AuthenticationController(IAuthManager authService, IRepositoryManager repoService, IMapper mapper,
        IControllerBaseServices<User> baseServices)
    {
        _authService = authService;
        _repoService = repoService;
        _mapper = mapper;
        _baseServices = baseServices;
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
            return Redirect($"{MapLoginUiDomain()}?error=fpt-invalid-email");
        }
        if (await _repoService.User.GetUserAsync(currentUser.Email, false) == null)
        {
            _repoService.User.CreateUser(currentUser);
            _repoService.UserMeta.RegisterRole(currentUser, RoleTypes.CUSR);
            await _repoService.SaveAsync();
        }
        else
        {
            var user = await _repoService.User.GetUserAsync(currentUser.Email, true);
            if (!user.Active)
            {
                return Redirect($"{MapLoginUiDomain()}?error=inactive-user");
            }
            _mapper.Map(currentUser, user);
            await _repoService.SaveAsync();
        } 
            
        var currentRole = await _repoService.UserMeta.GetRolesAsync(currentUser.Email, false);
        var currentOrg = await _repoService.Organization.GetOrganizationAsync(currentUser.OrganizationId, false) ??
                         new Organization {Name = "Anonymous"};
        var accessToken = await _authService.GenerateToken(currentUser, currentRole, currentOrg);

        Response.Cookies.Append("jwt", accessToken, new CookieOptions
        {
            HttpOnly = true
        });

        return Redirect($"{MapLoginUiDomain()}?token={accessToken}");
    }
        
    [HttpPost]
    [Route("auth")]
    public async Task<IActionResult> IsAuthenticated()
    {
        ResponseStatusEnum status = ResponseStatusEnum.Fail;
        try
        {
            if (Request.Headers.TryGetValue(HeaderNames.Authorization, out var headers))
            {
                string token = headers.First();
                var jwtToken = _authService.DecodeToken(token);

                var emailClaim = jwtToken.Claims.FirstOrDefault(x => x.Type == "email").Value;
                var roleClaim = jwtToken.Claims.FirstOrDefault(x => x.Type == "role").Value;

                var roleBasedEmail = await _repoService.UserMeta.GetRolesAsync(emailClaim, false);
                        
                if (await _repoService.User.GetUserAsync(emailClaim, false) != null)
                {
                    if (!roleBasedEmail.MetaValue.Equals(roleClaim))
                    {
                        return Unauthorized(new Response(status, "", "You don't have permission for this request"));
                    }
                    status = ResponseStatusEnum.Success;
                }
                else
                {
                    return BadRequest(new Response(status, "", "invalid token"));
                }
            }
        }
        catch (Exception e)
        {
            return BadRequest(new Response(status, "", e.Message));
        }
            
        return Ok(new Response(status, ""));
    }

    private string MapLoginUiDomain()
    {
        return _baseServices.GetUiDomain() + "/login";
    }
}


