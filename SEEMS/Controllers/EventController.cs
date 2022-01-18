using AutoMapper;
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
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public EventController(ApplicationDbContext context, IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;
        }

        [HttpPost("add-event")]
        public IActionResult Post([FromBody] EventDTO eventDTO)
        {
            try
            {
                var _event = _mapper.Map<Event>(eventDTO);
                _context.Events.Add(_event);
                _context.SaveChanges();
            }
            catch (Exception ex)
        {
                return BadRequest();
            }

            return Ok(eventDTO);
        }

        [HttpGet("test")]
        public IActionResult Get()
        {
            return Ok("Ditme");
        }
    }
}
