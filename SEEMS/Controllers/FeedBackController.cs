using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SEEMS.Contexts;
using SEEMS.Data.DTOs;
using SEEMS.Data.Models;
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

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var currentUser = await GetCurrentUser(_authManager.GetCurrentEmail(Request));
            if (currentUser != null)
            {
                var userId = currentUser.Id;
                var reservation = _context.Reservations.FirstOrDefault(x => x.Id == id);
                if (reservation != null)
                {
                    if (reservation.UserId == userId)
                    {
                        var feedBack = _context.FeedBacks.FirstOrDefault(x => x.ReservationId == id);
                        return Ok(new Response(ResponseStatusEnum.Success, feedBack));
                    }
                    else
                    {
                        return BadRequest(new Response(ResponseStatusEnum.Fail, "", "You do not have permission."));
                    }
                }
                else
                {
                    return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Invalid reservationId"));
                }
            }
            else
            {
                return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Login to continue."));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] FeedBackDTO feedBackDTO)
        {
            var currentUser = await GetCurrentUser(_authManager.GetCurrentEmail(Request));
            if (currentUser != null)
            {
                var userId = currentUser.Id;
                return Ok();
            }
            else
            {
                return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Login to continue."));
            }
        }

        private Task<User> GetCurrentUser(string email) => _repoManager.User.GetUserAsync(email, false);
    }
}
