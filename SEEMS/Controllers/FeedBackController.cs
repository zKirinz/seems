﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SEEMS.Contexts;
using SEEMS.Data.DTOs;
using SEEMS.Data.Models;
using SEEMS.Data.ValidationInfo;
using SEEMS.Infrastructures.Commons;
using SEEMS.Models;
using SEEMS.Services;
using SEEMS.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SEEMS.Controllers
{
    [Route("api/FeedBacks")]
    [ApiController]
    public class FeedBackController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IAuthManager _authManager;
        private IRepositoryManager _repoManager;
        public FeedBackController(ApplicationDbContext context, IMapper mapper, IAuthManager authManager, IRepositoryManager repoManager)
        {
            _context = context;
            _mapper = mapper;
            _authManager = authManager;
            _repoManager = repoManager;
        }

        //Get a feedback
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var currentUser = await GetCurrentUser(_authManager.GetCurrentEmail(Request));
            if (currentUser == null)
            {
                return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Login to continue."));
            }

            var userId = currentUser.Id;
            var reservation = _context.Reservations.FirstOrDefault(x => x.Id == id);
            if (reservation == null)
            {
                return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Invalid reservationId"));
            }

            if (reservation.UserId != userId)
            {
                return BadRequest(new Response(ResponseStatusEnum.Fail, "", "You do not have permission."));
            }

            var feedBack = _context.FeedBacks.FirstOrDefault(x => x.ReservationId == id);
            return Ok(new Response(ResponseStatusEnum.Success, feedBack));        
        }


        //Create a feedback
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] FeedBackDTO feedBackDTO)
        {
            var currentUser = await GetCurrentUser(_authManager.GetCurrentEmail(Request));
            if (currentUser == null)
            {
                return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Login to continue."));
            }

            var userId = currentUser.Id;
            var reservation = _context.Reservations.SingleOrDefault(x => x.Id == feedBackDTO.ReservationId);
            if (reservation == null)
            {
                return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Invalid reservationId."));
            }

            if (reservation.UserId != userId)
            {
                return BadRequest(new Response(ResponseStatusEnum.Fail, "", "You do not have permission."));
            }

            var feedBackValidate = FeedBacksServices.CheckValidatedFeedBack(feedBackDTO.Rating, feedBackDTO.Content);
            if (feedBackValidate != null)
            {
                return BadRequest(new Response(ResponseStatusEnum.Fail, feedBackValidate));
            }

            var feedBack = _mapper.Map<FeedBack>(feedBackDTO);
            _context.FeedBacks.Add(feedBack);
            _context.SaveChanges();
            return Ok(new Response(ResponseStatusEnum.Success, feedBack));
        }

        //Update a feedback
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] FeedBackForUpdateDTO feedBackForUpdate)
        {
            var currentUser = await GetCurrentUser(_authManager.GetCurrentEmail(Request));
            if (currentUser == null)
            {
                return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Login to continue."));
            }

            var userId = currentUser.Id;
            var feedBack = _context.FeedBacks.SingleOrDefault(x => x.Id == feedBackForUpdate.FeedBackId);
            if (feedBack == null)
            {
                return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Invalid FeedBackId."));
            }

            var reservation = _context.Reservations.SingleOrDefault(x => x.Id == feedBack.ReservationId);
            if (reservation.UserId != userId)
            {
                return BadRequest(new Response(ResponseStatusEnum.Fail, "", "You do not have permission."));
            }

            feedBack = _mapper.Map<FeedBack>(feedBackForUpdate);
            _context.FeedBacks.Update(feedBack);
            _context.SaveChanges();
            return Ok(new Response(ResponseStatusEnum.Success, feedBack));
        }


        private Task<User> GetCurrentUser(string email) => _repoManager.User.GetUserAsync(email, false);
    }
}