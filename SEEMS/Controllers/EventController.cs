using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using SEEMS.Contexts;
using SEEMS.Data.DTO;
using SEEMS.Models;
using SEEMS.Services;

namespace SEEMS.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    [ApiExplorerSettings(GroupName = "v1")]
    public class EventController : ControllerBase

	{
		private readonly ApplicationDbContext _context;
		private readonly IMapper _mapper;
		public EventController(ApplicationDbContext context, IMapper mapper)
		{
			this._context = context;
			this._mapper = mapper;
		}

		/*private static List<Event> events = new List<Event>
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
			try
			{

				return Ok(new SuccessResponse(_context.Events.ToList()));
			}
			catch (Exception ex)
			{
				return Ok(new ErrorResponse(ex.Message));
			}
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
		public async Task<ActionResult> AddEvent(EventDTO anEvent)
		{
			try
			{
				if (anEvent.EventTitle == "")
				{
					return BadRequest(new FailResponse(new { Title = "Id cannot null" }));
				}
				else
				{
					_context.Events.Add(_mapper.Map<Event>(anEvent));
					_context.SaveChanges();
					return Ok(new SuccessResponse(_context.Events.ToList()));
				}
			}
			catch (Exception ex)
			{
				return Ok(new ErrorResponse(ex.Message));
			}
		}

	}
}
