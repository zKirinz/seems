using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SEEMS.Contexts;
using SEEMS.Data.DTO;
using SEEMS.Models;

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

        /* private static List<EventDTO> events = new List<EventDTO>
             {
                 new Event{
                     EventTitle = "Tech Talk",
                     EventDescription = "This tech talk description",
                     IsPrivate = true,
                     ImageUrl = "this",
                     ExpectPrice = 5,
                     Active = true,
                     Location = "FPTU",
                     StartDate = DateTime.Now,
                     EndDate = DateTime.Now,
                 },
             new Event{
                     EventTitle = "Tech Talk 2",
                     EventDescription = "This tech talk description",
                     IsPrivate = true,
                     ImageUrl = "this",
                     ExpectPrice = 5,
                     Active = true,
                     Location = "FPTU",
                     StartDate = DateTime.Now,
                     EndDate = DateTime.Now,
                 }
             };*/

        [HttpGet()]
        public async Task<ActionResult<List<Event>>> Get()
        {
            return Ok(await _context.Events.ToListAsync());
        }

        //[HttpGet("{id}")]
        //public async Task<ActionResult<Event>> Get(int id)
        //{
        //need to replace by EF 
        //var anEvent = events.Find(h => h.Id == id);
        //if (anEvent == null)
        //    return BadRequest("Event not found.");
        //return Ok(anEvent);
        //}

        [HttpPost]
        public async Task<ActionResult<List<Event>>> AddEvent(EventDTO anEvent)
        {
            //events.Add(anEvent);
            return Ok();
        }

        //HTTP PUT later
    }
}
