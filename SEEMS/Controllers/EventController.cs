using AutoMapper;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using SEEMS.Contexts;
using SEEMS.Data.DTO;
using SEEMS.Data.DTOs.Event;
using SEEMS.Data.Models;
using SEEMS.Data.ValidationInfo;
using SEEMS.Infrastructures.Attributes;
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

		public EventController(ApplicationDbContext context, IMapper mapper, IAuthManager authManager, IRepositoryManager repositoryManager)
		{
			_context = context;
			_mapper = mapper;
			_authManager = authManager;
			_repository = repositoryManager;
		}

		[HttpGet("{id}")]
		[CheckUserStatus]
		public async Task<IActionResult> GetEventDetail(int id)
		{
			try
			{
				User user = await GetCurrentUser(Request);
				Event? foundEvent = _repository.Event.GetEvent(id);
				if(foundEvent == null)
					throw new Exception("Can't find the event");
				EventDTO dtoEvent = _mapper.Map<EventDTO>(foundEvent);
				dtoEvent.CommentsNum = _repository.Comment.CountCommentsOfEvent(id);
				dtoEvent.RootCommentsNum = _context.Comments.Where(c => c.EventId == id && c.ParentCommentId == null).Count();
				dtoEvent.RegisteredNum = _repository.Reservation.GetRegisteredNum(id);
				dtoEvent.MyEventStatus = _repository.Event.GetMyEventStatus(id);
				var registered = _context.Reservations.Where(r => r.UserId == user.Id && r.EventId == id).Any();
				var registeredNum = _repository.Reservation.GetRegisteredNum(foundEvent.Id);
				dtoEvent.CanRegister = _repository.Event.CanRegister(id);
				return Ok(
					new Response(
						ResponseStatusEnum.Success,
						new
						{
							Event = dtoEvent,
							Registered = registered
						}
					)
				);
			}
			catch(Exception ex)
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
		[CheckUserStatus]
		public async Task<ActionResult<List<EventDTO>>> GetMyEvents(string? search, bool? upcoming,
			int? lastEventID, string? myEventStatus, int resultCount = 10)
		{
			try
			{
				User user = await GetCurrentUser(Request);
				var myEvents = _context.Events.Where(a => a.OrganizationName == user.OrganizationName).ToList();
				IEnumerable<Event> foundEvents;

				//filter upcoming
				if(upcoming == null)
				{
					foundEvents = myEvents;
				}
				else
				{
					foundEvents = (bool) upcoming ? myEvents.Where(
						e => e.StartDate.Subtract(DateTime.Now).TotalMinutes >= 30) :
						myEvents.Where(
						e => e.StartDate.Subtract(DateTime.Now).TotalMinutes <= 0);
				}

				//Filter by title
				if(!string.IsNullOrEmpty(search))
				{
					foundEvents = foundEvents.Where(e => e.EventTitle.Contains(search, StringComparison.CurrentCultureIgnoreCase));
				}

				//sort found Events
				foundEvents = foundEvents.OrderByDescending(e => e.StartDate);

				//map list events to list eventDTOs for using MyEventStatus filter
				var foundEventDTOs = new List<EventDTO>();
				foundEvents.ToList().ForEach(e =>
				{
					var eMapped = _mapper.Map<EventDTO>(e);
					eMapped.CommentsNum = _context.Comments.Where(c => c.EventId == e.Id).Count();
					eMapped.CanTakeAttendance = _repository.Event.CanTakeAttendance((int) e.Id);
					eMapped.MyEventStatus = _repository.Event.GetMyEventStatus((int) e.Id);
					foundEventDTOs.Add(eMapped);
				});

				//filter myEventStatus
				if(myEventStatus != null)
				{
					foundEventDTOs = foundEventDTOs.Where(e => e.MyEventStatus.Equals(myEventStatus)).ToList();
				}

				//Implement load more
				List<EventDTO> paginatedEventDTOs = new List<EventDTO>();
				bool failed = false;
				bool canLoadMore = false;
				int lastEventIndex = 0;

				if(lastEventID != null)
				{
					lastEventIndex = foundEventDTOs.ToList().FindIndex(e => e.Id == lastEventID);
					if(lastEventIndex > 0)
					{
						paginatedEventDTOs = foundEventDTOs.ToList().GetRange(
							lastEventIndex + 1,
							Math.Min(resultCount, foundEventDTOs.Count() - lastEventIndex - 1));
					}
					else
					{
						failed = true;
					}
				}
				else
				{
					paginatedEventDTOs = foundEventDTOs.OrderByDescending(e => e.StartDate).ToList().GetRange(0, Math.Min(foundEventDTOs.Count(), resultCount));
				}
				if(!failed && foundEventDTOs.Count() - lastEventIndex - 1 > paginatedEventDTOs.Count())
				{
					canLoadMore = true;
				}

				return failed
					? BadRequest(
						new Response(ResponseStatusEnum.Fail, msg: "Invalid Id"))
					: Ok(
						new Response(ResponseStatusEnum.Success,
						new
						{
							Count = foundEventDTOs.Count(),
							CanLoadMore = canLoadMore,
							listEvents = paginatedEventDTOs
						})
				);
			}
			catch(Exception e)
			{
				return BadRequest(new Response(ResponseStatusEnum.Error, e.Message));
			}
		}

		//Everybody can view upcoming so not check banned user here
		[HttpGet("upcoming")]
		public async Task<ActionResult<List<Event>>> GetUpcoming()
		{
			User currentUser = await GetCurrentUser(Request);
			string userRole = null;
			try
			{
				var result = _context.Events.ToList().Where(
						e => e.StartDate.Subtract(DateTime.Now).TotalMinutes >= 30);

				if(currentUser == null)
				{
					result = result.Where(e => !e.IsPrivate);
				}
				else
				{
					userRole = (await _repository.UserMeta.GetRoleByUserIdAsync(currentUser.Id, false)).MetaValue;
				}
				result = result.OrderBy(e => e.StartDate);
				var dtoResult = new List<EventDTO>();
				result.ToList().ForEach(e =>
				{
					var eMapped = _mapper.Map<EventDTO>(e);
					var registeredNum = _repository.Reservation.GetRegisteredNum(e.Id);
					eMapped.CanRegister = _repository.Event.CanRegister(e.Id);
					dtoResult.Add(eMapped);
				});
				if(userRole != null && userRole.Equals("Admin"))
				{
					dtoResult.ForEach(e => e.CanRegister = false);
				}
				return Ok(
					new Response(
						ResponseStatusEnum.Success,
						new
						{
							Count = dtoResult.Count(),
							Events = dtoResult
						}
					)
				);
			}
			catch(Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError,
					new Response(ResponseStatusEnum.Error, msg: ex.Message));
			}
		}

		//Everybody can view all events => not check banned user here
		[HttpGet()]
		public async Task<ActionResult<List<Event>>> Get(string? search, bool? upcoming,
			int? lastEventID, bool? active, string? organizationName, int resultCount = 10)
		{
			var currentUser = await GetCurrentUser(Request);
			string userRole = null;
			try
			{
				if(currentUser != null)
				{
					userRole = (await _repository.UserMeta.GetRoleByUserIdAsync(currentUser.Id, false)).MetaValue;
				}
				var allEvents = _context.Events.ToList();
				IEnumerable<Event> foundResult;
				if(upcoming == null)
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

				if(active != null)
				{
					foundResult = (bool) active
						? foundResult.Where(e => e.Active)
						: foundResult.Where(e => !e.Active);
				}

				if(organizationName != null)
				{
					foundResult = foundResult.Where(e => e.OrganizationName.ToString().Equals(organizationName));
				}

				List<Event> returnResult = null;
				bool failed = false;
				bool loadMore = false;
				int lastEventIndex = 0;

				//Filter by title
				if(!string.IsNullOrEmpty(search))
				{
					foundResult = foundResult.Where(e => e.EventTitle.Contains(search, StringComparison.CurrentCultureIgnoreCase));
				}

				foundResult = foundResult.OrderByDescending(e => e.StartDate);
				//Implement load more

				if(lastEventID != null)
				{
					lastEventIndex = foundResult.ToList().FindIndex(e => e.Id == lastEventID);
					if(lastEventIndex > 0)
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
				if(foundResult.Count() - lastEventIndex - 1 > returnResult.Count())
				{
					loadMore = true;
				}
				var dtoResult = new List<EventDTO>();
				returnResult.ForEach(e =>
				{
					var eMapped = _mapper.Map<EventDTO>(e);
					var registeredNum = _repository.Reservation.GetRegisteredNum(e.Id);
					//eMapped.OrganizationName = OrganizationEnumHelper.ToString(e.OrganizationName);
					eMapped.CanRegister = _repository.Event.CanRegister(e.Id);
					dtoResult.Add(eMapped);
				});

				if(userRole != null && userRole.Equals("Admin"))
				{
					dtoResult.ForEach(e => e.CanRegister = false);
				}

				return failed
					? BadRequest(
						new Response(ResponseStatusEnum.Fail, msg: "Invalid Id"))
					: Ok(
						new Response(ResponseStatusEnum.Success,
						new
						{
							Count = foundResult.Count(),
							CanLoadMore = loadMore,
							listEvents = dtoResult
						})
				);
			}
			catch(Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, new Response(ResponseStatusEnum.Error, msg: ex.Message));
			}
		}

		[HttpPut("{id}")]
		public async Task<ActionResult<bool>> Update(int id, [FromBody] EventForUpdateDTO eventDTO)
		{
			try
			{
				var myEvent = _context.Events.AsNoTracking().FirstOrDefault(e => e.Id == id);
				if(myEvent == null)
				{
					return BadRequest(
						new Response(ResponseStatusEnum.Fail,
						false,
						"ID not found")
					);
				}
				else
				{
					EventValidationInfo? eventValidationInfo = EventsServices.GetValidatedEventInfo(eventDTO);
					if(eventValidationInfo != null)
						return BadRequest(
								new Response(ResponseStatusEnum.Fail,
								eventValidationInfo,
								"Some fields didn't match requirements"));
					if(eventDTO.EventTitle != null)
						myEvent.EventTitle = eventDTO.EventTitle;
					if(eventDTO.EventDescription != null)
						myEvent.EventDescription = eventDTO.EventDescription;
					if(eventDTO.Location != null)
						myEvent.Location = eventDTO.Location;
					if(eventDTO.ImageUrl != null)
						myEvent.ImageUrl = eventDTO.ImageUrl;
					_context.Update(myEvent);
					await _context.SaveChangesAsync();
					return Ok(
					new Response(
						ResponseStatusEnum.Success,
						myEvent,
						msg: "Succefully Update"
						)
					);
				}
			}
			catch(Exception ex)
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
			try
			{
				var user = await GetCurrentUser(Request);
				if(user != null)
				{
					if(user.Active)
					{

						var userRole = _context.UserMetas.FirstOrDefault(um => um.UserId == user.Id && um.MetaKey == "role").MetaValue;
						if(userRole == "Organizer" || userRole == "Admin")
						{
							var target = await _context.Events.AsNoTracking().FirstOrDefaultAsync(a => a.Id == id);
							if(target is null)
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
					else
						return Ok(
						 new Response(
							 ResponseStatusEnum.Success,
							 new { ErrorCode = "BANNED_USER" },
							 "User is banned"
						 )
					 );
				}
				else
					throw new Exception("Not authorized user!");
			}
			catch(Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError,
					new Response(ResponseStatusEnum.Error, msg: ex.Message));
			}
		}

		[HttpPost]
		[CheckUserStatus]
		public async Task<ActionResult> AddEvent(EventDTO eventDTO)
		{
			//eventDTO.StartDate = eventDTO.StartDate.ToLocalTime();
			//eventDTO.EndDate = eventDTO.EndDate.ToLocalTime();
			//eventDTO.RegistrationDeadline ??= ((DateTime) eventDTO.RegistrationDeadline).ToLocalTime();

			EventValidationInfo? eventValidationInfo = EventsServices.GetValidatedEventInfo(eventDTO);
			try
			{
				User user = await GetCurrentUser(Request);
				if(eventValidationInfo != null)
				{
					return BadRequest(
						new Response(ResponseStatusEnum.Fail,
						eventValidationInfo,
						"Some fields didn't match requirements"));
				}
				else
				{
					eventDTO.Active = true;
					eventDTO.RegistrationDeadline = eventDTO.RegistrationDeadline == null
						? eventDTO.StartDate.Subtract(TimeSpan.FromHours(6))
						: eventDTO.RegistrationDeadline;
					var newEvent = _mapper.Map<Event>(eventDTO);
					newEvent.OrganizationName = user.OrganizationName;
					_context.Events.Add(newEvent);
					_context.SaveChanges();
					return Ok(new Response(ResponseStatusEnum.Success, newEvent));
				}
			}
			catch(Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError,
					new Response(ResponseStatusEnum.Error, msg: ex.InnerException.Message));
			}
		}

		[HttpGet("is-mine/{id}")]
		[CheckUserStatus]
		public async Task<ActionResult> IsMyEvent(int id)
		{
			try
			{
				var user = await GetCurrentUser(Request);
				var myEvent = _context.Events.FirstOrDefault(e => e.Id == id);
				if(myEvent != null)
				{
					var isMine = user.OrganizationName.Equals(myEvent.OrganizationName);
					return Ok(
						new Response(
							ResponseStatusEnum.Success,
							new
							{
								IsMine = isMine
							}
						)
					);
				}
				else
				{
					return BadRequest(
						new Response(
							ResponseStatusEnum.Fail,
							msg: "Event does not existed!"
						)
					);
				}
			}
			catch(Exception ex)
			{
				return StatusCode(
				   StatusCodes.Status500InternalServerError,
				   new Response(ResponseStatusEnum.Error,
				   msg: ex.Message)
			   );
			}

		}

		[HttpGet("can-take-attendance/{id}")]
		[CheckUserStatus]
		public async Task<ActionResult> CanTakeAttendance(int id)
		{
			var user = await GetCurrentUser(Request);
			var myEvent = _context.Events.FirstOrDefault(e => e.Id == id);
			if(myEvent != null)
			{
				var canTakeAttendance = _repository.Event.CanTakeAttendance(id);
				return Ok(
					new Response(
						ResponseStatusEnum.Success,
						new
						{
							CanTakeAttendance = canTakeAttendance
						}
					)
				);
			}
			else
			{
				return BadRequest(
					new Response(
						ResponseStatusEnum.Fail,
						msg: "Event does not existed!"
					)
					);
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
