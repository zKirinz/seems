using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Extensions;
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
    private readonly IMapper _mapper;
    private readonly IRepositoryManager _repoManager;

    public UserController(IAuthManager authManager, IRepositoryManager repoManager, IMapper mapper)
    {
        _authManager = authManager;
        _repoManager = repoManager;
        _mapper = mapper;
    }

    [RoleBasedAuthorization(RoleBased = RoleTypes.Admin)]
    [HttpGet("")]
    public async Task<IActionResult> GetListUsers([FromQuery] UserParams userParams)
    {
        var listUsers = await _repoManager.User.GetAllUsersAsync(userParams, false);
        var result = new List<UserDTO>();
        for (var i = 0; i < listUsers.Count; i++)
        {
            var roleByUserId = await _repoManager.UserMeta.GetRoleByUserIdAsync(listUsers[i].Id, false);
            result.Add(ReturnUser(listUsers[i], roleByUserId));
        }

        return Ok(new Response(ResponseStatusEnum.Success, result, $"Found {listUsers.Meta.TotalCount} result(s)", 200,
            listUsers.Meta));
    }

    [ValidateModel]
    [RoleBasedAuthorization(RoleBased = RoleTypes.Admin)]
    [HttpPut("{id}")]
    public async Task<IActionResult> SetRole(int id, [FromBody] RoleToUpdateDto dto)
    {
        string[] roleCanBeUpdated = {RoleTypes.User, RoleTypes.Organizer};

        if (!roleCanBeUpdated.Contains(dto.Role))
            return UnprocessableEntity(new Response(ResponseStatusEnum.Fail, "", $"Can not update {dto.Role}  role",
                422));
        try
        {
            var entity = await _repoManager.UserMeta.GetRoleByUserIdAsync(id, true);

            if (entity == null)
                throw new ArgumentNullException();
            _mapper.Map(dto, entity);
            await _repoManager.SaveAsync();

            return Ok(new Response(ResponseStatusEnum.Success, entity, $"Update to {dto.Role} successfully", 200));
        }
        catch (ArgumentNullException)
        {
            return UnprocessableEntity(new Response(ResponseStatusEnum.Error, "", $"Id {id} is not existed", 422));
        }
    }

    [ValidateModel]
    [RoleBasedAuthorization(RoleBased = RoleTypes.Admin)]
    [HttpPut("edit/{id}")]
    public async Task<IActionResult> PartialUpdateUser(int id, [FromBody] UserForUpdateDto dto)
    {
        if (dto == null)
            return BadRequest(new Response(ResponseStatusEnum.Fail, "", "patch document sent from client is null"));

        try
        {
            var entity = await _repoManager.User.GetUserAsync(id, true);

            dto.Active ??= entity.Active;
            if (entity == null)
                throw new ArgumentNullException();
            _mapper.Map(dto, entity);
            await _repoManager.SaveAsync();

            var returnUser = await _repoManager.User.GetUserAsync(entity.Id, false);

            var returnRole = await _repoManager.UserMeta.GetRoleByUserIdAsync(returnUser.Id, false);

            return Ok(new Response(ResponseStatusEnum.Success, ReturnUser(returnUser, returnRole),
                $"Update user {entity.UserName} successfully"));
        }
        catch (ArgumentNullException e)
        {
            return UnprocessableEntity(new Response(ResponseStatusEnum.Error, "", $"Id {id} is not existed", 422));
        }
    }

    private static UserDTO ReturnUser(User user, UserMeta role)
    {
        return new()
        {
            User = user,
            Organization = user.OrganizationName.GetDisplayName(),
            Role = role.MetaValue
        };
    }
}