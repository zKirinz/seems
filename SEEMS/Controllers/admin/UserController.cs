using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;
using SEEMS.Data.DTOs;
using SEEMS.Data.Entities.RequestFeatures;
using SEEMS.Data.Models;
using SEEMS.Infrastructures.Attributes;
using SEEMS.Infrastructures.Commons;
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
    public async Task<IActionResult> GetListUsers([FromQuery] UserPagination userParams)
    {
        var listUsers = await _repoManager.User.GetAllUsersAsync(userParams, false);
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