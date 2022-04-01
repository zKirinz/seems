using System.Net.Mail;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SEEMS.Contexts;
using SEEMS.Data.DTO;
using SEEMS.Data.DTOs.Event;
using SEEMS.Data.Entities.RequestFeatures;
using SEEMS.Data.Models;
using SEEMS.Infrastructures.Attributes;
using SEEMS.Infrastructures.Commons;
using SEEMS.Models;
using SEEMS.Services;
using SEEMS.Services.Interfaces;

namespace SEEMS.Controller;

[Route("api/Events")]
[ApiController]
[ApiExplorerSettings(GroupName = "v1")]
public class EventController : ControllerBase
{
    private readonly IAuthManager _authManager;
    private readonly ApplicationDbContext _context;
    private readonly IEmailService _emailService;
    private readonly ILogger<EventController> _logger;
    private readonly IMapper _mapper;
    private readonly IRepositoryManager _repository;

    public EventController(ApplicationDbContext context, IMapper mapper, IAuthManager authManager,
        IRepositoryManager repositoryManager, IEmailService emailService, ILogger<EventController> logger)
    {
        _context = context;
        _mapper = mapper;
        _authManager = authManager;
        _repository = repositoryManager;
        _emailService = emailService;
        _logger = logger;
    }

    [HttpGet("{id}")]
    [CheckUserStatus]
    public async Task<IActionResult> GetEventDetail(int id)
    {
        try
        {
            var user = await GetCurrentUser(Request);
            var foundEvent = _repository.Event.GetEvent(id);
            if (foundEvent == null)
                throw new Exception("Can't find the event");
            var dtoEvent = _mapper.Map<EventDTO>(foundEvent);
            dtoEvent.CommentsNum = _repository.Comment.CountCommentsOfEvent(id);
            dtoEvent.RootCommentsNum =
                _context.Comments.Where(c => c.EventId == id && c.ParentCommentId == null).Count();
            dtoEvent.RegisteredNum = _repository.Reservation.GetRegisteredNum(id);
            dtoEvent.MyEventStatus = _repository.Event.GetMyEventStatus(id);
            var registered = _context.Reservations.Where(r => r.UserId == user.Id && r.EventId == id).Any();
            var registeredNum = _repository.Reservation.GetRegisteredNum(foundEvent.Id);
            dtoEvent.CanRegister = _repository.Event.CanRegister(id);
            dtoEvent.StartDate = dtoEvent.StartDate.ToLocalTime();
            dtoEvent.EndDate = dtoEvent.EndDate.ToLocalTime();
            dtoEvent.RegistrationDeadline = dtoEvent.RegistrationDeadline.Value.ToLocalTime();
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
    [CheckUserStatus]
    public async Task<ActionResult<List<EventDTO>>> GetMyEvents(string? search, bool? upcoming,
        int? lastEventID, string? myEventStatus, int resultCount = 10)
    {
        try
        {
            var user = await GetCurrentUser(Request);
            var myEvents = _context.Events.Where(a => a.OrganizationName == user.OrganizationName).ToList();
            IEnumerable<Event> foundEvents;

            //filter upcoming
            if (upcoming == null)
                foundEvents = myEvents;
            else
                foundEvents = (bool) upcoming
                    ? myEvents.Where(
                        e => e.StartDate.Subtract(DateTime.UtcNow).TotalMinutes >= 30)
                    : myEvents.Where(
                        e => e.StartDate.Subtract(DateTime.UtcNow).TotalMinutes <= 0);

            //Filter by title
            if (!string.IsNullOrEmpty(search))
                foundEvents = foundEvents.Where(e =>
                    e.EventTitle.Contains(search, StringComparison.CurrentCultureIgnoreCase));

            //sort found Events
            foundEvents = foundEvents.OrderByDescending(e => e.StartDate);

            //map list events to list eventDTOs for using MyEventStatus filter
            var foundEventDTOs = new List<EventDTO>();
            foundEvents.ToList().ForEach(e =>
            {
                var eMapped = _mapper.Map<EventDTO>(e);
                eMapped.CommentsNum = _context.Comments.Where(c => c.EventId == e.Id).Count();
                eMapped.CanTakeAttendance = _repository.Event.IsAbleToTakeAttendance(DateTime.UtcNow, e);
                eMapped.MyEventStatus = _repository.Event.GetMyEventStatus(e.Id);
                foundEventDTOs.Add(eMapped);
            });

            //filter myEventStatus
            if (myEventStatus != null)
                foundEventDTOs = foundEventDTOs.Where(e => e.MyEventStatus.Equals(myEventStatus)).ToList();

            //Implement load more
            var paginatedEventDTOs = new List<EventDTO>();
            var failed = false;
            var canLoadMore = false;
            var lastEventIndex = 0;

            if (lastEventID != null)
            {
                lastEventIndex = foundEventDTOs.ToList().FindIndex(e => e.Id == lastEventID);
                if (lastEventIndex > 0)
                    paginatedEventDTOs = foundEventDTOs.ToList().GetRange(
                        lastEventIndex + 1,
                        Math.Min(resultCount, foundEventDTOs.Count() - lastEventIndex - 1));
                else
                    failed = true;
            }
            else
            {
                paginatedEventDTOs = foundEventDTOs.OrderByDescending(e => e.StartDate).ToList()
                    .GetRange(0, Math.Min(foundEventDTOs.Count(), resultCount));
            }

            if (!failed && foundEventDTOs.Count() - lastEventIndex - 1 > paginatedEventDTOs.Count()) canLoadMore = true;

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
        catch (Exception e)
        {
            return BadRequest(new Response(ResponseStatusEnum.Error, e.Message));
        }
    }

    //Everybody can view upcoming so not check banned user here
    [HttpGet("upcoming")]
    public async Task<ActionResult<List<Event>>> GetUpcoming()
    {
        var currentUser = await GetCurrentUser(Request);
        string userRole = null;
        try
        {
            var result = _context.Events.ToList().Where(
                e => e.StartDate.Subtract(DateTime.Now).TotalMinutes >= 30);

            if (currentUser == null)
                result = result.Where(e => !e.IsPrivate);
            else
                userRole = (await _repository.UserMeta.GetRoleByUserIdAsync(currentUser.Id, false)).MetaValue;
            result = result.OrderBy(e => e.StartDate);
            var dtoResult = new List<EventDTO>();
            result.ToList().ForEach(e =>
            {
                var eMapped = _mapper.Map<EventDTO>(e);
                var registeredNum = _repository.Reservation.GetRegisteredNum(e.Id);
                eMapped.CanRegister = _repository.Event.CanRegister(e.Id);
                dtoResult.Add(eMapped);
            });
            if (userRole != null && userRole.Equals("Admin")) dtoResult.ForEach(e => e.CanRegister = false);
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
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new Response(ResponseStatusEnum.Error, msg: ex.Message));
        }
    }

    //Everybody can view all events => not check banned user here
    [HttpGet]
    public async Task<ActionResult<List<Event>>> Get(string? search, bool? upcoming,
        int? lastEventID, bool? active, string? organizationName, int resultCount = 10)
    {
        var currentUser = await GetCurrentUser(Request);
        string userRole = null;
        try
        {
            if (currentUser != null)
                userRole = (await _repository.UserMeta.GetRoleByUserIdAsync(currentUser.Id, false)).MetaValue;
            var allEvents = _context.Events.ToList();
            IEnumerable<Event> foundResult;
            if (upcoming == null)
                foundResult = allEvents;
            else
                foundResult = (bool) upcoming
                    ? allEvents.Where(
                        e => e.StartDate.Subtract(DateTime.Now).TotalMinutes >= 30)
                    : allEvents.Where(
                        e => e.StartDate.Subtract(DateTime.Now).TotalMinutes <= 0);

            if (active != null)
                foundResult = (bool) active
                    ? foundResult.Where(e => e.Active)
                    : foundResult.Where(e => !e.Active);

            if (organizationName != null)
                foundResult = foundResult.Where(e => e.OrganizationName.ToString().Equals(organizationName));

            List<Event> returnResult = null;
            var failed = false;
            var loadMore = false;
            var lastEventIndex = 0;

            //Filter by title
            if (!string.IsNullOrEmpty(search))
                foundResult = foundResult.Where(e =>
                    e.EventTitle.Contains(search, StringComparison.CurrentCultureIgnoreCase));

            foundResult = foundResult.OrderByDescending(e => e.StartDate);
            //Implement load more

            if (lastEventID != null)
            {
                lastEventIndex = foundResult.ToList().FindIndex(e => e.Id == lastEventID);
                if (lastEventIndex > 0)
                    returnResult = foundResult.ToList().GetRange(
                        lastEventIndex + 1,
                        Math.Min(resultCount, foundResult.Count() - lastEventIndex - 1));
                else
                    failed = true;
            }
            else
            {
                returnResult = foundResult.OrderByDescending(e => e.StartDate).ToList()
                    .GetRange(0, Math.Min(foundResult.Count(), resultCount));
            }

            if (foundResult.Count() - lastEventIndex - 1 > returnResult.Count()) loadMore = true;
            var dtoResult = new List<EventDTO>();
            returnResult.ForEach(e =>
            {
                var eMapped = _mapper.Map<EventDTO>(e);
                var registeredNum = _repository.Reservation.GetRegisteredNum(e.Id);
                //eMapped.OrganizationName = OrganizationEnumHelper.ToString(e.OrganizationName);
                eMapped.CanRegister = _repository.Event.CanRegister(e.Id);
                dtoResult.Add(eMapped);
            });

            if (userRole != null && userRole.Equals("Admin")) dtoResult.ForEach(e => e.CanRegister = false);

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
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new Response(ResponseStatusEnum.Error, msg: ex.Message));
        }
    }

    [ValidateModel]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] EventForUpdateDTO? eventDTO,
        [FromQuery] bool allowEmail)
    {
        var eventValidationInfo = EventsServices.GetValidatedEventInfo(eventDTO);
        try
        {
            if (eventValidationInfo != null)
                return BadRequest(
                    new Response(ResponseStatusEnum.Fail,
                        eventValidationInfo,
                        "Some fields didn't match requirements"));
            var @event = await _repository.Event.GetEventAsync(id, true);
            if (@event == null)
                return BadRequest(
                    new Response(ResponseStatusEnum.Fail,
                        false,
                        "ID not found")
                );
            ExplicitInvalidDate(eventDTO, @event);
            _mapper.Map(eventDTO, @event);
            await _repository.SaveAsync();

            var returnEvent = await _repository.Event.GetEventAsync(id, false);

            if (allowEmail)
                try
                {
                    SendEmailInformChangedEvent(returnEvent, TrackingState.Update);
                }
                catch (InvalidOperationException e)
                {
                    _logger.LogError(e.Message);
                }

            // returnEvent.StartDate = returnEvent.StartDate.AddHours(7);
            // returnEvent.EndDate = returnEvent.EndDate.AddHours(7);
            // returnEvent.RegistrationDeadline = returnEvent.RegistrationDeadline.AddHours(7);
            return Ok(
                new Response(
                    ResponseStatusEnum.Success,
                    returnEvent,
                    "Successfully Update"
                )
            );
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

    [RoleBasedAuthorization(RoleBased = RoleTypes.AdminOrOrganizer)]
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        try
        {
            var @event = await _repository.Event.GetEventAsync(id, false);
            if (@event is null)
                return BadRequest(
                    new Response(ResponseStatusEnum.Fail,
                        false,
                        "ID not found"));
            await SendEmailInformChangedEvent(@event, TrackingState.Delete);
            await DeleteRelationalChildResources(@event);
            _repository.Event.DeleteEvent(@event);
            await _repository.SaveAsync();
            return Ok(
                new Response(ResponseStatusEnum.Success,
                    true,
                    "Delete event successfully"));
        }
        catch (InvalidOperationException)
        {
            return Ok(
                new Response(ResponseStatusEnum.Success,
                    true,
                    "Delete event successfully")); 
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.StackTrace);
            return StatusCode(StatusCodes.Status500InternalServerError,
                new Response(ResponseStatusEnum.Error, msg: ex.Message));
        }
    }

    [HttpPost]
    [RoleBasedAuthorization(RoleBased = RoleTypes.AdminOrOrganizer)]
    [CheckUserStatus]
    public async Task<ActionResult> AddEvent(EventDTO eventDTO)
    {
        var eventValidationInfo = EventsServices.GetValidatedEventInfo(eventDTO);
        try
        {
            var user = await GetCurrentUser(Request);
            if (eventValidationInfo != null)
                return BadRequest(
                    new Response(ResponseStatusEnum.Fail,
                        eventValidationInfo,
                        "Some fields didn't match requirements"));

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
        catch (Exception ex)
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
            if (myEvent != null)
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

            return BadRequest(
                new Response(
                    ResponseStatusEnum.Fail,
                    msg: "Event does not existed!"
                )
            );
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

    [HttpGet("can-take-attendance/{id}")]
    [CheckUserStatus]
    public async Task<ActionResult> CanTakeAttendance(int id)
    {
        var user = await GetCurrentUser(Request);
        var myEvent = _context.Events.FirstOrDefault(e => e.Id == id);
        if (myEvent != null)
        {
            var canTakeAttendance = _repository.Event.IsAbleToTakeAttendance(DateTime.Now, myEvent);
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

        return BadRequest(
            new Response(
                ResponseStatusEnum.Fail,
                msg: "Event does not existed!"
            )
        );
    }

    [HttpGet("is-updatable/{eventId}")]
    [CheckUserStatus]
    public async Task<ActionResult> IsUpdatable(int eventId)
    {
        var user = await GetCurrentUser(Request);
        var myEvent = _context.Events.FirstOrDefault(e => e.Id == eventId);
        if(myEvent != null)
        {
            return Ok(
                new Response(
                    ResponseStatusEnum.Success,
                    new
                    {
                        IsUpdatable = DateTime.Now.AddHours(2) < myEvent.StartDate.ToLocalTime()
                    }
                )
            );
        }

        return BadRequest(
            new Response(
                ResponseStatusEnum.Fail,
                msg: "Event does not existed!"
            )
        );
    } 
    
    private DateTime? GetValidDeadline(EventDTO eventDTO)
    {
        return eventDTO.RegistrationDeadline == null
            ? eventDTO.StartDate.Subtract(TimeSpan.FromHours(6))
            : eventDTO.RegistrationDeadline;
    }

    private async Task<User> GetCurrentUser(HttpRequest req)
    {
        var email = _authManager.GetCurrentEmail(req);
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
        return user;
    }

    private async Task SendEmailInformChangedEvent(Event updatedEvent, TrackingState state)
    {
        var reservations =
            _repository.Reservation.GetReservationsByEventId(updatedEvent.Id, false).Result;

        if (!reservations.Any())
            throw new InvalidOperationException(
                $"There are no reservations qualified with this eventId: {updatedEvent.Id}");

        foreach (var reservation in reservations)
        {
            var mailToUser = new EmailMeta();
            reservation.User = _repository.User.GetUserAsync((int) reservation.UserId, false).Result;
            reservation.Event = _repository.Event.GetEventAsync(reservation.EventId, false).Result;

            if (reservation.User == null || reservation.Event == null)
                throw new InvalidOperationException("Invalid operations");

            mailToUser.ToEmail = reservation.User.Email;
            mailToUser.Message = _emailService.GetEmailTemplate(Dictionaries.MsgTemplates[state],
                _emailService.InitTemplates(reservation));
            mailToUser.Subject = Dictionaries.ParseArguments("{eventName}", $"{updatedEvent.EventTitle}",
                Dictionaries.SubjectTemplates[state]);
            _emailService.SendEmail(mailToUser);
            _logger.LogInformation(mailToUser.Message.ToString());
        }
    }

    private void ExplicitInvalidDate(EventForUpdateDTO src, Event dst)
    {
        if (src.StartDate == DateTime.MinValue) src.StartDate = dst.StartDate;

        if (src.EndDate == DateTime.MinValue) src.EndDate = dst.EndDate;

        if (src.RegistrationDeadline == DateTime.MinValue) src.RegistrationDeadline = dst.RegistrationDeadline;
    }

    private async Task DeleteRelationalChildResources(Event @event)
    {
        var listComments = await _repository.Comment.GetCommentsByEventId(@event.Id, false);
        if (listComments.Any()) DeleteRelatedComments(listComments);

        var listReservations = await _repository.Reservation.GetReservationsByEventId(@event.Id, false);
        if (listReservations.Any()) DeleteRelatedReservations(listReservations); 
    }

    private void DeleteRelatedReservations(IEnumerable<Reservation> listReservations)
    {
        foreach (var res in listReservations)
        {
            var locationIds = _repository.FeedBack.GetFeedbacksByReservationId(res.Id, false).Result;

            _repository.FeedBack.BulkDeleteFeedbacks(locationIds);
        }

        _repository.Reservation.BulkDeleteReservations(listReservations);
    }

    private void DeleteRelatedComments(IEnumerable<Comment> listComments)
    {
        foreach (var comment in listComments)
        {
            var locationIds = _repository.LikeComment.GetLikeCommentByCommentIdAsync(comment.Id, false).Result;
            if (locationIds.Any()) _repository.LikeComment.BulkDeleteLikeComments(locationIds);
            _repository.Comment.DeleteComment(comment);
        }
    }
}