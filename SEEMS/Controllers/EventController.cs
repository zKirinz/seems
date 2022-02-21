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
				var foundResult = allEvents.Where(
					e => Utilitiies.IsAfterMinutes(e.StartDate, DateTime.Now, 30));
				List<Event> returnResult = null;
				bool failed = false;
				bool loadMore = false;
				int lastEventIndex = 0;

				//Filter by title
				if (!string.IsNullOrEmpty(search))
				{
					foundResult = foundResult.Where(e => e.EventTitle.Contains(search, StringComparison.CurrentCultureIgnoreCase));
				}

				//Implement load more

				if (lastEventID != null)
				{
					lastEventIndex = foundResult.ToList().FindIndex(e => e.Id == lastEventID);
					if (lastEventIndex > 0)
					{
						returnResult = foundResult.ToList().GetRange(
							lastEventIndex + 1,
							Math.Min(resultCount, foundResult.Count() - lastEventIndex - 1));
					}
					else
					{
						failed = true;
					}
				}
				else
				{
					returnResult = foundResult.OrderByDescending(e => e.StartDate).ToList().GetRange(0, Math.Min(foundResult.Count(), resultCount));
				}
				if (foundResult.Count() - lastEventIndex - 1 > returnResult.Count())
				{
					loadMore = true;
				}

				return failed
					? BadRequest(
						new Response(ResponseStatusEnum.Fail, msg: "Invalid Id"))
					: Ok(
						new Response(ResponseStatusEnum.Success,
						new
						{
							Count = returnResult.Count(),
							CanLoadMore = loadMore,
							listEvents = returnResult
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
			try
			{
				eventDTO.StartDate = eventDTO.StartDate.ToLocalTime();
				eventDTO.EndDate = eventDTO.EndDate.ToLocalTime();
				var user = await GetCurrentUser(Request);
				var userMeta = _context.UserMetas.FirstOrDefault(x => x.UserId == user.Id);
				if (userMeta.MetaValue.Equals("Organizer", StringComparison.CurrentCultureIgnoreCase)
					&& user.Id == id)
				{
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
				else
				{
					return BadRequest(
						new Response(
							ResponseStatusEnum.Fail,
							code: 400,
							msg: "Just Organizer who created event can update this event"
						)
					);
				}
			}
			catch (Exception ex)
			{
				return StatusCode(
					StatusCodes.Status500InternalServerError,
					new Response(ResponseStatusEnum.Error,
					msg: ex.Message)
				);
			}
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult> Delete(int id)
		{
			var user = await GetCurrentUser(Request);
			var userRole = _context.UserMetas.FirstOrDefault(um => um.UserId == user.Id && um.MetaKey == "role").MetaValue;
			if (userRole == "Organizer" || userRole == "Admin")
			{
				var target = await _context.Events.AsNoTracking().FirstOrDefaultAsync(a => a.Id == id);
				if (target is null)
				{
					return BadRequest(
							new Response(ResponseStatusEnum.Fail,
							false,
							"ID not found"));
				}
				_context.Events.Remove(target);
				await _context.SaveChangesAsync();
				return Ok(
							new Response(ResponseStatusEnum.Success,
							true,
							"Delete event successfully"));
			}
			else
			{
				return BadRequest(
					new Response(
						ResponseStatusEnum.Fail,
						"Invalid role"
					)
				);
			}
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
