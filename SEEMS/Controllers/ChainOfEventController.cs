using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SEEMS.Data.Entities.RequestFeatures;
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

    public ChainOfEventController(IAuthManager authManager, IRepositoryManager repoManager, 
        IControllerBaseServices<ChainOfEvent> baseServices)
    {
        _authManager = authManager;
        _repoManager = repoManager;
        _baseServices = baseServices;
    }
    
    [Authorize] 
    [HttpGet("")]
    public async Task<IActionResult> GetAllChainOfEvents([FromQuery] ChainOfEventsPagination param)
    {
        var info = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

        var currentUser = _authManager.GetUserInfo(info);
        var userFromDb = _repoManager.User.GetUserAsync(currentUser!.Email, false);
        var listOfChains = await _repoManager.ChainOfEvent.GetAllChainOfEventsAsync(userFromDb.Id, param, false);
        _baseServices.AddPaginationHeaders(Response, listOfChains);

        return Ok(new Response(ResponseStatusEnum.Success, listOfChains));
    }

}