using AutoMapper;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using SEEMS.Contexts;
using SEEMS.Data.DTO;
using SEEMS.Data.ValidationInfo;
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
			this._mapper = mapper;
			this._context = context;
		}

		/*[HttpGet()]
		public async Task<ActionResult<List<Event>>> Get()
		{
			try
			{
				return Ok(new Response(ResponseStatusEnum.Success, _context.Events.ToList()));
			}
			catch (Exception ex)
			{
				return Ok(new Response(ResponseStatusEnum.Error, ex.Message));
			}
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<Event>> Get(int id)
		{
			//need to replace by EF
			var anEvent = events.Find(h => h.Id == id);
			if (anEvent == null)
				return BadRequest("Event not found.");
			return Ok(anEvent);
		}*/

		[HttpPost]
		public async Task<ActionResult> AddEvent(EventDTO anEvent)
		{
			EventValidationInfo eventValidationInfo = EventsServices.GetValidatedEventInfo(anEvent);
			try
			{
				if (eventValidationInfo != null)
				{
					return BadRequest(new Response(ResponseStatusEnum.Fail, eventValidationInfo, "Some fields didn't match requirements"));
				}
				else
				{
					_context.Events.Add(_mapper.Map<Event>(anEvent));
					_context.SaveChanges();
					return Ok(new Response(ResponseStatusEnum.Success, _context.Events.ToList()));
				}
			}
			catch (Exception)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, eventValidationInfo);
			}
		}
	}
}
