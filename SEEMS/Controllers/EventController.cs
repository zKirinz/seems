using AutoMapper;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using SEEMS.Contexts;
using SEEMS.Data.DTO;
using SEEMS.Data.ValidationInfo;
using SEEMS.Models;
using SEEMS.Services;

using System.Runtime.InteropServices;

namespace SEEMS.Controller
{
	[Route("api/Events")]
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


		/*
		[HttpGet("{id}")]
		public async Task<ActionResult<Event>> Get(int id)
		{
			//need to replace by EF
			var anEvent = events.Find(h => h.Id == id);
			if (anEvent == null)
				return BadRequest("Event not found.");
			return Ok(anEvent);
		}*/

		[HttpGet("all")]
		public async Task<ActionResult<List<Event>>> Get()
		{
			try
			{
				return Ok(new Response(ResponseStatusEnum.Success, _context.Events.ToList()));
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, new Response(ResponseStatusEnum.Error, msg: ex.Message));
			}
		}

		[HttpGet("upcoming")]
		public async Task<ActionResult<List<Event>>> Get([FromQuery] int? pageNum, [FromQuery] string? orderBy)
		{
			try
			{
				var allEvents = _context.Events.ToList();
				var result = allEvents.Where(e => e.EndDate.Subtract(DateTime.Now).TotalMinutes >= 1).OrderBy(e => e.EndDate);
				if (orderBy != null)
				{
					switch (orderBy)
					{
						case "title_asc":
							result = allEvents.OrderBy(e => e.EventTitle);
							break;
						case "title_desc":
							result = allEvents.OrderByDescending(e => e.EventTitle);
							break;
						default:
							throw new Exception($"No such '{orderBy}' query");
					}
				}

				//Paging
				int pageSize = pageNum == null ? 100 : 5;
				var paginatedResult = PaginatedList<Event>.Create(result.AsQueryable(), pageNum ?? 1, pageSize);

				string? resMsg;
				if (result.Count() == 0 || pageNum < 1 || pageNum > paginatedResult.TotalPages)
				{
					resMsg = "No event was found";
				}
				else
				{
					resMsg = "Successfully get your events";
				}

				return Ok(new Response(ResponseStatusEnum.Success,
					new
					{
						pageNum = pageNum,
						pageSize = pageSize,
						itemCount = paginatedResult.Count(),
						hasPreviousPage = paginatedResult.HasPreviousPage,
						hasNextPage = paginatedResult.HasNextPage,
						events = paginatedResult
					},
					resMsg));
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, new Response(ResponseStatusEnum.Error, msg: ex.Message));
			}
		}

		[HttpPost]
		public async Task<ActionResult> AddEvent(EventDTO anEvent)
		{
			anEvent.StartDate = anEvent.StartDate.ToLocalTime();
			anEvent.EndDate = anEvent.EndDate.ToLocalTime();
			EventValidationInfo? eventValidationInfo = EventsServices.GetValidatedEventInfo(anEvent);

			try
			{
				if (eventValidationInfo != null)
				{
					return BadRequest(new Response(ResponseStatusEnum.Fail,
							eventValidationInfo,
						"Some fields didn't match requirements"));
				}
				else
				{
					anEvent.Active = true;
					if (anEvent.IsFree) anEvent.ExpectPrice = 0;
					var newEvent = _mapper.Map<Event>(anEvent);
					_context.Events.Add(newEvent);
					_context.SaveChanges();
					return Ok(new Response(ResponseStatusEnum.Success,
						anEvent));
				}
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, new Response(ResponseStatusEnum.Error, msg: ex.Message));
			}
		}
	}
}
