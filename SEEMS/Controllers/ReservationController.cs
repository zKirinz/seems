using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SEEMS.Contexts;
using SEEMS.Data.DTO;
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

                    var startDateEvent = _context.Events.FirstOrDefault(x => x.Id == reservationDTO.EventId).StartDate;
                    if (startDateEvent.Subtract(DateTime.Now).TotalDays < 1)
                    {
                        return BadRequest(new Response(ResponseStatusEnum.Fail, "", "You must register for the event 1 day before the event starts."));
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
        public async Task<IActionResult> Put([FromBody] List<ReservationForAttendanceReqDTO> listAttendance)
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

        // GET api/Reservations
        // Get all registered events
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var currentUser = await GetCurrentUser(_authManager.GetCurrentEmail(Request));
                if (currentUser != null)
                {
                    var userId = currentUser.Id;
                    var listReservation = _context.Reservations.Where(x => x.UserId == userId).ToList();
                    if (listReservation.Any())
                    {
                        List<EventDTO> listEventDTO = new List<EventDTO>();
                        foreach (var reservation in listReservation)
                        {
                            var events = _context.Events.FirstOrDefault(x => x.Id == reservation.EventId); 
                            var eventDTO = _mapper.Map<EventDTO>(events);
                            eventDTO.CommentsNum = _context.Comments.Where(c => c.EventId == reservation.EventId).Count();
                            eventDTO.OrganizationName = _context.Organizations.FirstOrDefault(x => x.Id == events.OrganizationId).Name;
                            listEventDTO.Add(eventDTO);
                        }

                        return Ok(new Response(ResponseStatusEnum.Success, listEventDTO));
                    }
                    else
                    {
                        return Ok(new Response(ResponseStatusEnum.Success, "", "You have not registered to participate in any event yet"));
                    }
                }
                else
                {
                    return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Login to continue"));
                }
            } catch (Exception ex)
            {
                return BadRequest(new Response(ResponseStatusEnum.Fail, "", ex.Message));
            }
        }

        // GET api/Reservations/id
        // Get all user registered for an event
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var anEvent = _context.Events.FirstOrDefault(x => x.Id == id);
                if (anEvent != null)
                {
                    var listRegisteredUser = _context.Reservations.Where(x => x.EventId == id).ToList();
                    if (listRegisteredUser.Any())
                    {
                        List<ReservationForAttendanceResDTO> listUser = new List<ReservationForAttendanceResDTO>();
                        User user = new User();
                        foreach (var reservation in listRegisteredUser)
                        {
                            user = _context.Users.Where(x => x.Id == reservation.UserId).FirstOrDefault();
                            if (user != null)
                            {
                                var userAttendance = _mapper.Map<ReservationForAttendanceResDTO>(user);
                                userAttendance.ReservationId = reservation.Id;
                                userAttendance.Attend = reservation.Attend;
                                listUser.Add(userAttendance);
                            }
                        }
                        return Ok(new Response(ResponseStatusEnum.Success, listUser));
                    }
                    else
                    {
                        return Ok(new Response(ResponseStatusEnum.Success, "", "No user have registered yet"));
                    }
                }
                else
                {
                    return Ok(new Response(ResponseStatusEnum.Success, "", "Invalid eventId"));
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new Response(ResponseStatusEnum.Fail, "", ex.Message));
            }
        }

        // PUT api/Reservations/id
        // Unregister event
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var currentUser = await GetCurrentUser(_authManager.GetCurrentEmail(Request));
                if (currentUser != null)
                {
                    var userId = currentUser.Id;
                    var reservation = _context.Reservations.FirstOrDefault(x => x.Id == id);
                    if (reservation != null)
                    {
                        var events = _context.Events.Where(x => x.Id == reservation.EventId).FirstOrDefault();
                        if (reservation.UserId == userId)
                        {
                            if (events.StartDate.Subtract(DateTime.Now).TotalHours < 1)
                            {
                                _context.Reservations.Remove(reservation);
                                _context.SaveChanges();
                                return Ok(new Response(ResponseStatusEnum.Success, "", "Unregister successfully"));
                            }
                            else
                            {
                                return BadRequest(new Response(ResponseStatusEnum.Fail, "", "You must unregister for the event 1 hour before the event starts."));
                            }
                        }
                        else
                        {
                            return BadRequest(new Response(ResponseStatusEnum.Fail, "", "You don't have permission."));
                        }
                    }
                    else
                    {
                        return BadRequest(new Response(ResponseStatusEnum.Fail, "", "Invalid ReservationId"));
                    }
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

        private Task<User> GetCurrentUser(string email) => _repoManager.User.GetUserAsync(email, false);
    }
}
