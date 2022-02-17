using AutoMapper;

using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

using SEEMS.Contexts;
using SEEMS.Data.DTO;
using SEEMS.Data.Models;
using SEEMS.Data.ValidationInfo;
using SEEMS.Models;
using SEEMS.Services;
namespace SEEMS.Controller
{
	[Route("api/Events")]
	[ApiController]
	[ApiExplorerSettings(GroupName = "v1")]
	public class EventController : ControllerBase

	{
		private readonly ApplicationDbContext _context;
		private readonly IMapper _mapper;
		private readonly AuthManager _authManager;

		public EventController(ApplicationDbContext context, IMapper mapper,
								 AuthManager authManager)
		{
			_context = context;
			_mapper = mapper;
			_authManager = authManager;
		}

		[HttpGet("my-events")]
		public async Task<ActionResult<List<Event>>> GetMyEvents()
		{
			User currentUser = null;
			try
			{
				//var user = null;
				//if (user != null)
				//{
				//	var listEvents = _context.Events.Where(a => a.Client.Id == user.Id).ToList();
				//	return Ok(
				//		new Response(ResponseStatusEnum.Success,
				//		new
				//		{
				//			Count = listEvents.Count(),
				//			Events = listEvents
				//		})
				//	);
				//}
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
			try
			{
				var result = _context.Events.ToList().Where(
						e => e.StartDate.Subtract(DateTime.Now).TotalMinutes >= 30
				);
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
				return StatusCode(StatusCodes.Status500InternalServerError, new Response(ResponseStatusEnum.Error, msg: ex.Message));
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
					if (eventDTO.IsFree) eventDTO.ExpectPrice = 0;
					var newEvent = _mapper.Map<Event>(eventDTO);
					var info = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);
					var userInfo =  _authManager.GetUserInfo(info);
					newEvent.Creator = userInfo;
					_context.Events.Add(newEvent);
					_context.SaveChanges();
					return Ok(new Response(ResponseStatusEnum.Success, eventDTO));
				}
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, new Response(ResponseStatusEnum.Error, msg: ex.Message));
			}
		}
	}
}
