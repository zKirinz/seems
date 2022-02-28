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
        private readonly IAuthManager _authManager;
        private IRepositoryManager _repoManager;
        public ReservationController(ApplicationDbContext context, IMapper mapper, IAuthManager authManager, IRepositoryManager repoManager)
        {
            _context = context;
            _mapper = mapper;
            _authManager = authManager;
            _repoManager = repoManager;
        }

        // POST api/Reservations
        // Register a event
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ReservationDTO reservationDTO)
        {
            try
            {
                var currentUser = await GetCurrentUser(_authManager.GetCurrentEmail(Request));
                if (currentUser != null)
                {
                    var userId = currentUser.Id;
                    if (!CommentsServices.CheckValidEventId(reservationDTO.EventId, _context))
                    {
                        return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Invalid EventId"));
                    }
                    var reservation = _mapper.Map<Reservation>(reservationDTO);
                    reservation.UserId = userId;
                    _context.Add(reservation);
                    _context.SaveChanges();

                    return Ok(new Response(ResponseStatusEnum.Success, reservation));
                }
                else
                {
                    return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Login to continue"));
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new Response(ResponseStatusEnum.Fail, "", ex.Message));
            }
        }

        // PUT api/Reservations/id
        // Check/Uncheck attendance
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] List<AttendanceForReservationDTO> listAttendance)
        {
            try
            {
                foreach (var attendance in listAttendance)
                {
                    var reservation = _context.Reservations.FirstOrDefault(x => x.Id == attendance.Id);
                    if (reservation != null)
                    {
                        reservation.Attend = attendance.Attend;
                        _context.Reservations.Update(reservation);
                        _context.SaveChanges();
                    }
                }

                return Ok(new Response(ResponseStatusEnum.Success, ""));
            }
            catch (Exception ex)
            {
                return BadRequest(new Response(ResponseStatusEnum.Fail, "", ex.Message));
            }
        }

        private Task<User> GetCurrentUser(string email) => _repoManager.User.GetUserAsync(email, false);
    }
}
