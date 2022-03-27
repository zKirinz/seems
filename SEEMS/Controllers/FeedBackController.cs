using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SEEMS.Contexts;
using SEEMS.Data.DTOs;
using SEEMS.Data.DTOs.FeedBack;
using SEEMS.Data.Models;
using SEEMS.Infrastructures.Attributes;
using SEEMS.Infrastructures.Commons;
using SEEMS.Models;
using SEEMS.Services;
using SEEMS.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SEEMS.Controllers;

[Route("api/FeedBacks")]
[ApiController]
public class FeedBackController : ControllerBase
{
    private readonly IAuthManager _authManager;

    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly IRepositoryManager _repoManager;

    public FeedBackController(ApplicationDbContext context, IMapper mapper, IAuthManager authManager,
        IRepositoryManager repoManager)
    {
        _context = context;
        _mapper = mapper;
        _authManager = authManager;
        _repoManager = repoManager;
    }

    //Get a feedback
    [HttpGet("{id}")]
    [CheckUserStatus]
    public async Task<IActionResult> Get(int id)
    {
        var currentUser = await GetCurrentUser(_authManager.GetCurrentEmail(Request));
        if (currentUser == null) return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Login to continue."));

        var userId = currentUser.Id;
        var reservation = _context.Reservations.FirstOrDefault(x => x.Id == id);
        if (reservation == null) return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Invalid reservationId"));

        if (reservation.UserId != userId)
            return BadRequest(new Response(ResponseStatusEnum.Fail, "", "You do not have permission."));

        var feedBack = _context.FeedBacks.FirstOrDefault(x => x.ReservationId == id);
        return Ok(new Response(ResponseStatusEnum.Success, feedBack));
    }


    //Create a feedback
    [HttpPost]
    [CheckUserStatus]
    public async Task<IActionResult> Post([FromBody] FeedBackDTO feedBackDTO)
    {
        var currentUser = await GetCurrentUser(_authManager.GetCurrentEmail(Request));
        if (currentUser == null) return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Login to continue."));

        var userId = currentUser.Id;
        var myEvent = _context.Events.FirstOrDefault(x => x.Id == feedBackDTO.EventId);
        if (myEvent == null) return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Invalid eventId."));

        var reservation = _context.Reservations.FirstOrDefault(x => x.EventId == myEvent.Id && x.UserId == userId);
        if (reservation == null)
            return BadRequest(new Response(ResponseStatusEnum.Fail, "", "You are not participating in this event."));

        var feedBack = _context.FeedBacks.FirstOrDefault(x => x.ReservationId == reservation.Id);
        if (feedBack != null)
            return BadRequest(new Response(ResponseStatusEnum.Fail, "", "You are already feedback", 422));

        var feedBackValidate = FeedBacksServices.CheckValidatedFeedBack(feedBackDTO.Rating, feedBackDTO.Content);
        if (feedBackValidate != null)
            return BadRequest(new Response(ResponseStatusEnum.Fail, feedBackValidate, null, 422));

        feedBack = _mapper.Map<FeedBack>(feedBackDTO);
        feedBack.ReservationId = reservation.Id;
        _context.FeedBacks.Add(feedBack);
        _context.SaveChanges();
        var canFeedBack = false;
        return Ok(new Response(ResponseStatusEnum.Success,
            new
            {
                feedBack,
                canFeedBack
            }));
    }

    ////Update a feedback
    //[HttpPut]
    //public async Task<IActionResult> Put([FromBody] FeedBackForUpdateDTO feedBackForUpdate)
    //{
    //    var currentUser = await GetCurrentUser(_authManager.GetCurrentEmail(Request));
    //    if (currentUser == null)
    //    {
    //        return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Login to continue."));
    //    }

    //    var userId = currentUser.Id;
    //    var feedBack = _context.FeedBacks.FirstOrDefault(x => x.Id == feedBackForUpdate.FeedBackId);
    //    if (feedBack == null)
    //    {
    //        return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Invalid FeedBackId."));
    //    }

    //    var reservation = _context.Reservations.FirstOrDefault(x => x.Id == feedBack.ReservationId);
    //    if (reservation.UserId != userId)
    //    {
    //        return BadRequest(new Response(ResponseStatusEnum.Fail, "", "You do not have permission."));
    //    }

    //    var feedBackValidate = FeedBacksServices.CheckValidatedFeedBack(feedBackForUpdate.Rating, feedBackForUpdate.Content);
    //    if (feedBackValidate != null)
    //    {
    //        return BadRequest(new Response(ResponseStatusEnum.Fail, feedBackValidate));
    //    }

    //    //feedBack = _mapper.Map<FeedBack>(feedBackForUpdate);
    //    feedBack.Content = feedBackForUpdate.Content;
    //    feedBack.Rating = feedBackForUpdate.Rating;
    //    _context.FeedBacks.Update(feedBack);
    //    _context.SaveChanges();
    //    return Ok(new Response(ResponseStatusEnum.Success, feedBack));
    //}

    //Get all feedback of an event
    [HttpPost("{id}")]
    [CheckUserStatus]
    public async Task<IActionResult> Post(int id)
    {
        var currentUser = await GetCurrentUser(_authManager.GetCurrentEmail(Request));
        if (currentUser == null) return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Login to continue."));

        var role = _context.UserMetas.FirstOrDefault(x => x.UserId == currentUser.Id).MetaValue;
        if (!role.Contains(RoleTypes.Admin) && !role.Contains(RoleTypes.Organizer))
            return BadRequest(new Response(ResponseStatusEnum.Fail, "", "You do not have permission."));

        var anEvent = _context.Events.FirstOrDefault(x => x.Id == id);
        if (anEvent == null) return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Invalid eventId."));

        var listReservation = _context.Reservations.Where(x => x.EventId == id).ToList();
        var listFeedBacks = new List<FeedBackForResponse>();
        var feedBack = new FeedBack();
        double averageRating = 0;
        foreach (var reservation in listReservation)
        {
            feedBack = _context.FeedBacks.FirstOrDefault(x => x.ReservationId == reservation.Id);
            if (feedBack != null)
            {
                listFeedBacks.Add(_mapper.Map<FeedBackForResponse>(feedBack));
                averageRating += feedBack.Rating;
            }
        }

        if (listFeedBacks.Count > 0) averageRating = Math.Round(averageRating / listFeedBacks.Count, 1);
        return Ok(new Response(ResponseStatusEnum.Success,
            new
            {
                averageRating,
                listFeedBacks
            }));
    }

    [HttpGet("canFeedBack/{id}")]
    [CheckUserStatus]
    public async Task<IActionResult> CanFeedBack(int id)
    {
        var currentUser = await GetCurrentUser(_authManager.GetCurrentEmail(Request));
        if (currentUser == null) return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Login to continue."));

        var userId = currentUser.Id;
        var attend = false;
        var canFeedBack = false;
        var reservation = _context.Reservations.FirstOrDefault(x => x.EventId == id && x.UserId == userId);
        if (reservation != null)
        {
            attend = reservation.Attend;
            canFeedBack = _repoManager.FeedBack.CanFeedBack(id, userId);
        }

        return Ok(new Response(ResponseStatusEnum.Success,
            new
            {
                attend,
                canFeedBack
            }));
    }

    private Task<User> GetCurrentUser(string email)
    {
        return _repoManager.User.GetUserAsync(email, false);
    }
}