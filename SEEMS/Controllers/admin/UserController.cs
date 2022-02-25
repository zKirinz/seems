using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;
using SEEMS.Data.Entities;
using SEEMS.Data.DTOs;
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
    private IMapper _mapper;

    public UserController(IAuthManager authManager, IRepositoryManager repoManager, IMapper mapper)
    {
        _authManager = authManager;
        _repoManager = repoManager;
        _mapper = mapper;
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
   
    [ValidateModel]
    [RoleBasedAuthorization(RoleBased = RoleTypes.ADM)]
    [HttpPut("{id}")]
    public async Task<IActionResult> SetRole(int id, [FromBody] RoleToUpdateDTO dto)
    {
        string[] roleCanBeUpdated =  { RoleTypes.CUSR, RoleTypes.ORG };

        if (!roleCanBeUpdated.Contains(dto.Role))
            return UnprocessableEntity(new Response(ResponseStatusEnum.Fail, "", "Can not update admin role", 422));
        try
        {
                     
            var entity = await _repoManager.UserMeta.GetRoleByUserIdAsync(id, true);
                    
            if (entity == null) throw new ArgumentNullException();
            _mapper.Map(dto, entity);
            await _repoManager.SaveAsync();
        
            return Ok(new Response(ResponseStatusEnum.Success, entity, $"Update to {dto.Role} successfully", 200));
        }
        catch (ArgumentNullException)
        {
            return UnprocessableEntity(new Response(ResponseStatusEnum.Error, "", $"Id {id} is not existed", 422));
        }
    }
}