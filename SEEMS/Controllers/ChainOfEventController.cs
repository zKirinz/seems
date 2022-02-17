using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SEEMS.Data.DTOs;
using SEEMS.Data.Entities.RequestFeatures;
using SEEMS.Data.Models;
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
    
    [HttpPost("")]
    [Authorize]
    public async Task<IActionResult> CreateNewChainOfEvent([FromBody] ChainOfEventForCreationDto body)
    {
        var currentEmail = _authManager.GetCurrentEmail(Request);

        var currentUser = await GetCurrentUser(currentEmail);
        
        var entity = _mapper.Map<ChainOfEvent>(body);

        var role = await _repoManager.UserMeta.GetRolesAsync(currentEmail, false);

        if (role.MetaValue != RoleTypes.ORG)
        {
            return UnprocessableEntity(new Response(ResponseStatusEnum.Fail, "", "Only Organizer can create chain of events", 422));
        }

        try
        {
            _repoManager.ChainOfEvent.CreateChainOfEvent(currentUser.Id, entity);
            await _repoManager.SaveAsync();
        }
        catch
        {
            return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Category Name can not be duplicate"));
        }
        
        return Ok(new Response(ResponseStatusEnum.Success, entity));
    }

    private Task<User> GetCurrentUser(string email) => _repoManager.User.GetUserAsync(email, false);
}