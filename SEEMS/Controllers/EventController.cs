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
		private readonly IRepositoryManager _repository;

		public EventController( ApplicationDbContext context, IMapper mapper, IAuthManager authManager, IRepositoryManager repositoryManager )
		{
			_context = context;
			_mapper = mapper;
			_authManager = authManager;
			_repository = repositoryManager;
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetEventDetail( int eventId )
		{
			try
			{
				Event? foundEvent = _repository.Event.GetEvent(eventId);
				if (foundEvent == null)
					throw new Exception("Can't find the event");

				int commentCount = _repository.Comment.CountCommentsOfEvent(eventId);
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
			catch (Exception ex)
			{
				return BadRequest(
					new Response(
						ResponseStatusEnum.Fail,
						ex.Message
					)
				);
			}
		}

		[HttpGet("my-events")]
		public async Task<ActionResult<List<Event>>> GetMyEvents( string? search, bool? upcoming,
			int? lastEventID, int resultCount = 10 )
		{
			User user = await GetCurrentUser(Request);
			try
			{
				if (user != null)
				{
					var findingOrgId = user.OrganizationId;
					var allEvents = _context.Events.Where(a => a.OrganizationId == findingOrgId).ToList();
					IEnumerable<Event> foundResult;
					if (upcoming == null)
					{
						foundResult = allEvents;
					}
					else
					{
						foundResult = (bool) upcoming ? allEvents.Where(
							e => e.StartDate.Subtract(DateTime.Now).TotalMinutes >= 30) :
							allEvents.Where(
							e => e.StartDate.Subtract(DateTime.Now).TotalMinutes <= 0);
					}

					List<Event> returnResult = null;
					bool failed = false;
					bool loadMore = false;
					int lastEventIndex = 0;

					//Filter by title
					if (!string.IsNullOrEmpty(search))
					{
						foundResult = foundResult.Where(e => e.EventTitle.Contains(search, StringComparison.CurrentCultureIgnoreCase));
					}

					foundResult = foundResult.OrderByDescending(e => e.StartDate);
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
					returnResult.ForEach(e =>
					{
						e.Organization = _context.Organizations.FirstOrDefault(o => o.Id == e.OrganizationId);
					});

					return failed
						? BadRequest(
							new Response(ResponseStatusEnum.Fail, msg: "Invalid Id"))
						: Ok(
							new Response(ResponseStatusEnum.Success,
							new
							{
								Count = foundResult.Count(),
								CanLoadMore = loadMore,
								listEvents = returnResult
							})
					);
					foundResult.ToList().ForEach(e =>
					{
						e.Organization = _context.Organizations.FirstOrDefault(o => o.Id == e.OrganizationId);
					});
					return Ok(
						new Response(ResponseStatusEnum.Success,
						new
						{
							Count = foundResult.Count(),
							Events = foundResult
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
		}

		[HttpGet("upcoming")]
		public async Task<ActionResult<List<Event>>> GetUpcoming()
		{
			//int resultCount;
			User currentUser = await GetCurrentUser(Request);
			try
			{
				var result = _context.Events.ToList().Where(
						e => e.StartDate.Subtract(DateTime.Now).TotalMinutes >= 30);

				if (currentUser == null)
				{
					result = result.Where(e => !e.IsPrivate);
				}
				//resultCount = Math.Min(10, result.Count());
				result = result.OrderByDescending(e => e.StartDate);
				result.ToList().ForEach(e =>
				{
					e.Organization = _context.Organizations.FirstOrDefault(o => o.Id == e.OrganizationId);
				});
				return Ok(new Response(
					ResponseStatusEnum.Success,
					new
					{
						Count = result.Count(),
						Events = result.ToList()
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
		public async Task<ActionResult<List<Event>>> Get( string? search, bool? upcoming,
			int? lastEventID, int resultCount = 10 )
		{
			try
			{
				var allEvents = _context.Events.ToList();
				IEnumerable<Event> foundResult;
				if (upcoming == null)
				{
					foundResult = allEvents;
				}
				else
				{
					foundResult = (bool) upcoming ? allEvents.Where(
						e => e.StartDate.Subtract(DateTime.Now).TotalMinutes >= 30) :
						allEvents.Where(
						e => e.StartDate.Subtract(DateTime.Now).TotalMinutes <= 0);
				}

				List<Event> returnResult = null;
				bool failed = false;
				bool loadMore = false;
				int lastEventIndex = 0;

				//Filter by title
				if (!string.IsNullOrEmpty(search))
				{
					foundResult = foundResult.Where(e => e.EventTitle.Contains(search, StringComparison.CurrentCultureIgnoreCase));
				}

				foundResult = foundResult.OrderByDescending(e => e.StartDate);
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
				returnResult.ForEach(e =>
				{
					e.Organization = _context.Organizations.FirstOrDefault(o => o.Id == e.OrganizationId);
				});

				return failed
					? BadRequest(
						new Response(ResponseStatusEnum.Fail, msg: "Invalid Id"))
					: Ok(
						new Response(ResponseStatusEnum.Success,
						new
						{
							Count = foundResult.Count(),
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
		public async Task<ActionResult<bool>> Update( int id, [FromBody] EventDTO eventDTO )
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
					newEvent.OrganizationId = target.OrganizationId;
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
		public async Task<ActionResult> Delete( int id )
		{
			try
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
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError,
					new Response(ResponseStatusEnum.Error, msg: ex.InnerException.Message));
			}
		}

		[HttpPost]
		public async Task<ActionResult> AddEvent( EventDTO eventDTO )
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
					newEvent.OrganizationId = user.Id;
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
		private async Task<User> GetCurrentUser( HttpRequest req )
		{
			var email = _authManager.GetCurrentEmail(req);
			var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
			return user;
		}
	}
}
