using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SEEMS.Contexts;
using SEEMS.Data.DTOs;
using SEEMS.Data.Models;
using SEEMS.Models;
using SEEMS.Services;
using SEEMS.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SEEMS.Controllers
{
    [Route("api/Reservations")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private IRepositoryManager _repoManager;
        public ReservationController(ApplicationDbContext context, IMapper mapper, IRepositoryManager repoManager)
        {
            _context = context;
            _mapper = mapper;
            _repoManager = repoManager;
        }

        // POST api/<ReservationController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ReservationDTO reservationDTO)
        {
            try
            {
                //var currentUser = await GetCurrentUser(_authManager.GetCurrentEmail(Request));
                if (/*currentUser != null*/ 1 == 1)
                {
                    //var userId = currentUser.Id;
                    if (!CommentsServices.CheckValidEventId(reservationDTO.EventId, _context))
                    {
                        return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Invalid EventId"));
                    }
                    var reservation = _mapper.Map<Reservation>(reservationDTO);
                    reservation.UserId = 2;
                    _context.Add(reservation);
                    _context.SaveChanges();

                    return Ok(new Response(ResponseStatusEnum.Success, reservation));
                }
                else
                {
                    return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Invalid token"));
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new Response(ResponseStatusEnum.Fail, "", ex.Message));
            }
        }

        private Task<User> GetCurrentUser(string email) => _repoManager.User.GetUserAsync(email, false);
    }
}
