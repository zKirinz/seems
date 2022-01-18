using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SEEMS.Data.DTO;
using SEEMS.Services;

namespace SEEMS.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase

    {
        public EventService _eventService;

        public EventController(EventService eventService)
        {
            _eventService = eventService;
        }

        [HttpPost("add-event")]
        public IActionResult AddEvent([FromBody] EventDTO eventDTO)
        {
            _eventService.AddEvent(eventDTO);

            return Ok();
        }
    }
}
