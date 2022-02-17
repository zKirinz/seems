using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SEEMS.Data.DTOs;
using SEEMS.Data.Entities.RequestFeatures;
using SEEMS.Data.Models;
using SEEMS.Infrastructures.Attributes;
using SEEMS.Infrastructures.Commons;
using SEEMS.Models;
using SEEMS.Services;
using SEEMS.Services.Interfaces;

namespace SEEMS.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class ChainOfEventController : ControllerBase
{
    private IRepositoryManager _repoManager;
    private IAuthManager _authManager;
    private IControllerBaseServices<ChainOfEvent> _baseServices;
    private IMapper _mapper;

    public ChainOfEventController(IAuthManager authManager, IRepositoryManager repoManager, 
        IControllerBaseServices<ChainOfEvent> baseServices, IMapper mapper)
    {
        _authManager = authManager;
        _repoManager = repoManager;
        _baseServices = baseServices;
        _mapper = mapper;
    }
    
    [Authorize] 
    [HttpGet("")]
    public async Task<IActionResult> GetAllChainOfEvents([FromQuery] ChainOfEventsPagination param)
    {
        var currentUser = await GetCurrentUser(_authManager.GetCurrentEmail(Request));
        var listOfChains = await _repoManager.ChainOfEvent.GetAllChainOfEventsAsync(currentUser.Id, param, false);
        _baseServices.AddPaginationHeaders(Response, listOfChains);

        return Ok(new Response(ResponseStatusEnum.Success, listOfChains));
    }
    
    [Authorize]
    [HttpPost("")]
    [ValidateModel]
    public async Task<IActionResult> CreateNewChainOfEvent([FromBody] ChainOfEventForCreationDto body)
    {
        var currentUser = await IsOrganization(Request);
        
        var entity = _mapper.Map<ChainOfEvent>(body);

        if (currentUser == null)
        {
            return UnprocessableEntity(new Response(ResponseStatusEnum.Fail, "",
                "Only Organizer role can create chains", 422));
        }
        
        try
        {
            _repoManager.ChainOfEvent.CreateChainOfEvent(currentUser.Id, entity);
            await _repoManager.SaveAsync();
        }
        catch(DbUpdateException)
        {
            return BadRequest(new Response(ResponseStatusEnum.Fail, "", $"{body.CategoryName} is duplicated", 422));
        }
        
        return Ok(new Response(ResponseStatusEnum.Success, entity));
    }
    
    [Authorize]
    [ValidateModel]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateChainOfEvent(int id, [FromBody] ChainOfEventForUpdateDTO dto)
    {
        var currentUser = await IsOrganization(Request);
        if (currentUser == null)
        {
            return UnprocessableEntity(new Response(ResponseStatusEnum.Fail, "",
                "Only Organizer role can update chains", 422));
        } 
        
        try
        {
            var entity = await _repoManager.ChainOfEvent.GetChainOfEventsAsync(id, true);
            _mapper.Map(dto, entity);
            await _repoManager.SaveAsync();

            return Ok(new Response(ResponseStatusEnum.Success, entity));
        }
        catch (DbUpdateException)
        {
            return BadRequest(new Response(ResponseStatusEnum.Error, "", $"{dto.CategoryName} is duplicated", 400));
        }
    }

    private Task<User> GetCurrentUser(string email) => _repoManager.User.GetUserAsync(email, false);

    private async Task<User?> IsOrganization(HttpRequest request)
    {
        var currentEmail = _authManager.GetCurrentEmail(Request);

        var currentUser = await GetCurrentUser(currentEmail!);
        

        var role = await _repoManager.UserMeta.GetRolesAsync(currentEmail!, false);

        return role.MetaValue != RoleTypes.ORG ? null : currentUser;
    }
}