using AutoMapper;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using SEEMS.Contexts;
using SEEMS.Data.DTO;
using SEEMS.Data.Models;
using SEEMS.Data.ValidationInfo;
using SEEMS.Models;
using SEEMS.Services;
using SEEMS.Services.Interfaces;

namespace SEEMS.Controller
{
	[Route("api/Events")]
	[ApiController]
	[ApiExplorerSettings(GroupName = "v1")]
	public class EventController : ControllerBase

	{
		private readonly ApplicationDbContext _context;
		private readonly IMapper _mapper;
		private readonly IAuthManager _authManager;

		public EventController(ApplicationDbContext context, IMapper mapper, IAuthManager authManager)
		{
			_context = context;
			_mapper = mapper;
			_authManager = authManager;
		}

		[HttpGet("detail/{id}")]
		public async Task<IActionResult> GetEventDetail(int id)
		{
			Event foundEvent = null;
			int commentCount = 0;
			try
			{
				foundEvent = _context.Events.FirstOrDefault(e => e.Id == id);
				if (foundEvent == null)
				{
					throw new Exception("Can't find the event");
				}
				else
				{
					commentCount = _context.Comments.Where(c => c.EventId == foundEvent.Id).Count();
				}
			}
			catch (Exception ex)
			{
				return BadRequest(
					new Response(
						ResponseStatusEnum.Fail,
						ex.Message
					)
				);
			}
			return Ok(
				new Response(
					ResponseStatusEnum.Success,
					new
					{
						CommentCount = commentCount,
						Event = foundEvent,
					}
				)
			);
		}

		[HttpGet("my-events")]
		public async Task<ActionResult<List<Event>>> GetMyEvents()
		{
			User user = await GetCurrentUser(Request);
			try
			{
				if (user != null)
				{
					var listEvents = _context.Events.Where(a => a.Client.Id == user.Id).ToList();
					return Ok(
						new Response(ResponseStatusEnum.Success,
						new
						{
							Count = listEvents.Count(),
							Events = listEvents
						})
					);
				}
				else
				{
					throw new Exception("Invalid User profile");
				}
			}
			catch (Exception e)
			{
				return BadRequest(new Response(ResponseStatusEnum.Error, e.Message));
			}
			return null;
		}

		[HttpGet("upcoming")]
		public async Task<ActionResult<List<Event>>> Get()
		{
			int resultCount;
			User currentUser = await GetCurrentUser(Request);
			try
			{
				var result = _context.Events.ToList().Where(
						e => e.StartDate.Subtract(DateTime.Now).TotalMinutes >= 30);

				if (currentUser == null)
				{
					result = result.Where(e => !e.IsPrivate);
				}
				resultCount = Math.Min(10, result.Count());
				return Ok(new Response(
					ResponseStatusEnum.Success,
					new
					{
						Count = resultCount,
						Events = result.ToList().GetRange(0, resultCount)
					}
				));
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError,
					new Response(ResponseStatusEnum.Error, msg: ex.Message));
			}
		}


		[HttpGet()]
		public async Task<ActionResult<List<Event>>> Get(string? search, int? lastEventID, int resultCount = 10)
		{
			try
			{
				var allEvents = _context.Events.ToList();
				var result = allEvents.Where(
					e => Utilitiies.IsAfterMinutes(e.StartDate, DateTime.Now, 30));
				bool failed = false;

				//Filter by title
				if (!string.IsNullOrEmpty(search))
				{
					result = result.Where(e => e.EventTitle.Contains(search, StringComparison.CurrentCultureIgnoreCase));
				}

				//Implement load more
				if (lastEventID != null)
				{
					var lastEventIndex = result.ToList().FindIndex(e => e.Id == lastEventID);
					if (lastEventIndex > 0)
					{
						result = result.ToList().GetRange(
							lastEventIndex + 1,
							Math.Min(resultCount, result.Count() - lastEventIndex - 1));
					}
					else
					{
						failed = true;
					}
				}
				else
				{
					result = result.OrderByDescending(e => e.StartDate).ToList().GetRange(0, Math.Min(result.Count(), resultCount));
				}

				return failed
					? BadRequest(
						new Response(ResponseStatusEnum.Fail, msg: "Invalid Id"))
					: Ok(
						new Response(ResponseStatusEnum.Success,
						new
						{
							Count = result.Count(),
							listEvents = result
						})
				);
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, new Response(ResponseStatusEnum.Error, msg: ex.Message));
			}
		}

		[HttpPut("{id}")]
		public async Task<ActionResult<bool>> Update(int id, [FromBody] EventDTO eventDTO)
		{
			eventDTO.StartDate = eventDTO.StartDate.ToLocalTime();
			eventDTO.EndDate = eventDTO.EndDate.ToLocalTime();
			EventValidationInfo? eventValidationInfo = EventsServices.GetValidatedEventInfo(eventDTO);
			if (eventValidationInfo != null)
				return BadRequest(
						new Response(ResponseStatusEnum.Fail,
						eventValidationInfo,
						"Some fields didn't match requirements"));
			var newEvent = _mapper.Map<Event>(eventDTO);
			var target = await _context.Events.AsNoTracking().FirstOrDefaultAsync(a => a.Id == id);
			if (target is null)
			{
				return BadRequest(
						new Response(ResponseStatusEnum.Fail,
						false,
						"ID not found"));
			}
			newEvent.Id = target.Id;
			newEvent.ClientId = target.ClientId;
			_context.Update(newEvent);
			await _context.SaveChangesAsync();
			return Ok(
				new Response(
					ResponseStatusEnum.Success,
					newEvent,
					msg: "Succefully Update"
					)
				);
		}

		[HttpPost]
		public async Task<ActionResult> AddEvent(EventDTO eventDTO)
		{
			eventDTO.StartDate = eventDTO.StartDate.ToLocalTime();
			eventDTO.EndDate = eventDTO.EndDate.ToLocalTime();
			EventValidationInfo? eventValidationInfo = EventsServices.GetValidatedEventInfo(eventDTO);
			try
			{
				if (eventValidationInfo != null)
				{
					return BadRequest(
						new Response(ResponseStatusEnum.Fail,
						eventValidationInfo,
						"Some fields didn't match requirements"));
				}
				else
				{
					eventDTO.Active = true;
					var newEvent = _mapper.Map<Event>(eventDTO);
					var user = await GetCurrentUser(Request);
					newEvent.ClientId = user.Id;
					_context.Events.Add(newEvent);
					_context.SaveChanges();
					return Ok(new Response(ResponseStatusEnum.Success, eventDTO));
				}
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError,
					new Response(ResponseStatusEnum.Error, msg: ex.InnerException.Message));
			}
		}
		private async Task<User> GetCurrentUser(HttpRequest req)
		{
			var email = _authManager.GetCurrentEmail(req);
			var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
			return user;
		}
	}
}
