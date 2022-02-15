using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SEEMS.Data.Models;
using SEEMS.Services;
using SEEMS.Services.Interfaces;

namespace SEEMS.Controllers;

[ApiController]
[Route("/api/Users")]
public class UserController : ControllerBase
{
    private IAuthManager _authManager;
    private IRepositoryManager _repoManager;

    public UserController(IAuthManager authManager, IRepositoryManager repoManager)
    {
        _authManager = authManager;
        _repoManager = repoManager;
    }
    
    [HttpGet("me")]
    public async Task<IActionResult> GetCurrentUserProfile()
    {
        User currentUser = null;
        try
        {
            if (Request.Headers.TryGetValue("token", out var headers))
            {
                string token = headers.First();
                var email = _authManager.DecodeToken(token).Claims.FirstOrDefault(e => e.Type == "email").Value;

                currentUser = await _repoManager.User.GetUserAsync(email, false);
            }
        }
        catch (Exception e)
        {
            return BadRequest(new Response(ResponseStatusEnum.Error, e.Message));
        }

        if (currentUser == null)
        {
            return BadRequest(new Response(ResponseStatusEnum.Fail, "", "User not found"));
        }
        
        return Ok(new Response(ResponseStatusEnum.Success,  currentUser ));
    } 
}