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
    private IControllerBaseServices<ChainOfEvent> _baseServices;

    public ChainOfEventController(IRepositoryManager repoManager, 
        IControllerBaseServices<ChainOfEvent> baseServices)
    {
        _repoManager = repoManager;
        _baseServices = baseServices;
    }
    
    [Authorize]
    [HttpGet("")]
    public async Task<IActionResult> GetAllChainOfEvents([FromQuery] ChainOfEventsPagination param)
    {
        var listOfChains = await _repoManager.ChainOfEvent.GetAllChainOfEventsAsync(param, false);
        _baseServices.AddPaginationHeaders(Response, listOfChains);

        return Ok(new Response(ResponseStatusEnum.Success, listOfChains));
    }

}