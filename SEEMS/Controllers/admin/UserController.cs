using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;
using SEEMS.Data.Entities.RequestFeatures;
using SEEMS.Data.Models;
using SEEMS.Services;
using SEEMS.Services.Interfaces;

namespace SEEMS.Controllers.admin;

[ApiController]
[Route("/api/admin/users")]
public class UserController : ControllerBase
{
    private IAuthManager _authManager;
    private IRepositoryManager _repoManager;

    public UserController(IAuthManager authManager, IRepositoryManager repoManager)
    {
        _authManager = authManager;
        _repoManager = repoManager;
    }
    
    [Authorize]
    [HttpGet("")]
    public async Task<IActionResult> GetListUsers([FromQuery] UserParams userParams)
    {
        var listUsers = await _repoManager.User.GetAllUsersAsync(userParams, false);
        Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(listUsers.Meta));
        return Ok(listUsers);
    }
    
    [HttpPut("/{id}/role")]
    public IActionResult UpdateRoleForUsers()
    {
        return Ok();
    }

    public IActionResult UpdateStatusForUsers()
    {
        return Ok();
    }
    
}