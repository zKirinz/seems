using Google.Apis.Util;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;
using SEEMS.Data.Entities;
using SEEMS.Data.Entities.RequestFeatures;
using SEEMS.Data.Models;
using SEEMS.Infrastructures.Attributes;
using SEEMS.Infrastructures.Commons;
using SEEMS.Models;
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
    
    [RoleBasedAuthorization(RoleBased = RoleTypes.ADM)]
    [HttpGet("")]
    public async Task<IActionResult> GetListUsers([FromQuery] UserParams userParams)
    {

        Organization? organizationToFilter;
        
        PaginatedList<User>? listUsers = null;

        if (userParams.Organization != null)
        {
            organizationToFilter =
                        await _repoManager.Organization.GetOrganizationByName(userParams.Organization, false);
            
            listUsers = await _repoManager.User.GetAllUsersAsync(organizationToFilter, userParams, false);
        }

        userParams.Organization = "fptu";
        var roleToFilter = await _repoManager.UserMeta.GetRolesByNameAsync(userParams.Role, false);
        if (listUsers.Any(user => roleToFilter.Any(u => user.Id == u.UserId)))
        {
            var check = listUsers.Where(user => roleToFilter.Any(us => user.Id == us.UserId));
            listUsers = PaginatedList<User>.Create(check.ToList(), userParams.PageNumber, userParams.PageSize);
        }
        
        Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(listUsers.Meta));
        return Ok(listUsers);
    }
}