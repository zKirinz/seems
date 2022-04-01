using Microsoft.EntityFrameworkCore;
using SEEMS.Contexts;
using SEEMS.Data.DTOs;
using SEEMS.Models;

namespace SEEMS.Data.Repositories.Implements;

public class ReservationRepository : RepositoryBase<Reservation>, IReservationRepository
{
    private IReservationRepository _reservationRepositoryImplementation;

    public ReservationRepository(ApplicationDbContext context) : base(context)
    {
    }

    public int GetRegisteredNum(int eventId)
    {
        return _context.Reservations.Where(r => r.EventId == eventId).Count();
    }

    public async Task<IEnumerable<Reservation>> GetReservationsByEventId(int eventId, bool trackChanges)
    {
        return await FindByCondition(r => r.EventId == eventId, trackChanges)
            .ToListAsync();
    }

    public void BulkDeleteReservations(IEnumerable<Reservation> locationIds)
    {
        if (locationIds.Any()) BulkDelete(locationIds);
    }

    public async Task<Reservation> GetReservationAsync(int id, bool trackChanges)
    {
        return await FindByCondition(r => r.Id == id, trackChanges)
            .SingleOrDefaultAsync();
    }

    public string GetRegisterEventStatus(int reservationId)
    {
        var feedback = _context.FeedBacks.Any(f => f.ReservationId == reservationId);
        var reservation = _context.Reservations.FirstOrDefault(r => r.Id == reservationId);
        var attended = reservation.Attend;
        var registeredEvent = _context.Events.FirstOrDefault(e => e.Id == reservation.EventId);
        string result = null;
        if (DateTime.Now.CompareTo(registeredEvent.EndDate) < 0)
            result = "Pending";
        else if (!attended)
            result = "Absent";
        else if (feedback)
            result = "Feedbacked";
        else
            result = "Attended";
        return result;
    }

    public IEnumerable<RegisteredEventsDTO> GetListRegisteredEvents(int userId)
    {
        var listReservations = _context.Reservations.Where(x => x.UserId == userId);
        var listRegisteredEventsDTO = new List<RegisteredEventsDTO>();
        var registeredEvent = new RegisteredEventsDTO();
        listReservations.ToList().ForEach(x =>
        {
            var anEvent = _context.Events.FirstOrDefault(e => e.Id == x.EventId);
            registeredEvent = new RegisteredEventsDTO();
            if (anEvent != null)
            {
                registeredEvent.Id = anEvent.Id;
                registeredEvent.EventTitle = anEvent.EventTitle;
                registeredEvent.EventDescription = anEvent.EventDescription;
                registeredEvent.IsPrivate = anEvent.IsPrivate;
                registeredEvent.ImageUrl = anEvent.ImageUrl;
                registeredEvent.Active = anEvent.Active;
                registeredEvent.Location = anEvent.Location;
                registeredEvent.StartDate = anEvent.StartDate;
                registeredEvent.EndDate = anEvent.EndDate;
                registeredEvent.CommentsNum = _context.Comments.Where(c => c.EventId == x.EventId).Count();
                var registeredNum = _context.Reservations.Count(r => r.EventId == anEvent.Id);
                registeredEvent.CanRegister = anEvent.RegistrationDeadline.CompareTo(DateTime.Now) > 0 &&
                                              (registeredNum == 0 || registeredNum < anEvent.ParticipantNum);
                registeredEvent.OrganizationName = anEvent.OrganizationName.ToString();
                registeredEvent.IsAttendanceChecked = x.IsAttendanceChecked;
                registeredEvent.ReservationId = x.Id;
                registeredEvent.ReservationStatus = GetRegisterEventStatus(x.Id);
                registeredEvent.FeedBack = x.Attend;
                registeredEvent.Attend = x.Attend;
                listRegisteredEventsDTO.Add(registeredEvent);
            }
        });
        return listRegisteredEventsDTO;
    }

    public int GetRegisteredEventsNumOfUser(int userId)
    {
        return _context.Reservations.Where(r => r.UserId == userId).Count();
    }

    public int GetRegisteredEventsNumByStatus(int userId, string status)
    {
        var listReservations = _context.Reservations.Where(x => x.UserId == userId).ToList();
        var result = listReservations.Count(r => GetRegisterEventStatus(r.Id).Equals(status));
        return result;
    }

    public int GetConsecutiveAbsentNum(int userId)
    {
        var listRegistered = GetListRegisteredEvents(userId);
        var listRegisteredEnded = listRegistered.Where(e => e.EndDate.CompareTo(DateTime.Now) < 0).ToList();
        listRegisteredEnded.Sort(RegisteredEventsDTO.CompareByEndDate);
        var listAttendStatus = listRegisteredEnded.ConvertAll(x => (bool) x.Attend).TakeLast(3).ToList();
        var consecutiveAbsent = 0;
        var returnResult = 0;

        if(listAttendStatus.Count >= 3)
            for(var i = 0; i <= listAttendStatus.Count - 3; i++)
            {
                consecutiveAbsent = 0;
                if(!listAttendStatus[i] && !listRegisteredEnded[i].IsAttendanceChecked)
                {
                    consecutiveAbsent++;
                    if(!listAttendStatus[i + 1] && !listRegisteredEnded[i + 1].IsAttendanceChecked)
                    {
                        consecutiveAbsent++;
                        if(!listAttendStatus[i + 2] && !listRegisteredEnded[i + 2].IsAttendanceChecked)
                            consecutiveAbsent++;
                    }
                }

                returnResult = Math.Max(returnResult, consecutiveAbsent);
                if(consecutiveAbsent == 3)
                    break;
            }

        return returnResult;
    }

    public int GetAttendedReservationsOfMyEvents(int userId)
    {
        var user = _context.Users.FirstOrDefault(u => u.Id == userId);
        var myEvents = _context.Events.Where(e => e.OrganizationName.Equals(user.OrganizationName));
        var myReservationsIds = myEvents.Join(
                                        _context.Reservations,
                                        ev => ev.Id,
                                        rs => rs.EventId,
                                        (ev, rs) => new { rs.Id }
                                );
        return myReservationsIds.ToList().Count(rs => GetRegisterEventStatus(rs.Id).Equals("Attended"));
    }

    public int GetAllReservationsOfMyEvents(int userId)
    {
        var user = _context.Users.FirstOrDefault(u => u.Id == userId);
        var myEvents = _context.Events.Where(e => e.OrganizationName.Equals(user.OrganizationName));
        var myReservationsIds = myEvents.Join(
                                        _context.Reservations,
                                        ev => ev.Id,
                                        rs => rs.EventId,
                                        (ev, rs) => new { ReservationId = rs.Id, EventEndDate = ev.EndDate }
                                );
        return myReservationsIds.ToList().Count(rs => rs.EventEndDate.CompareTo(DateTime.Now) < 0);
    }

    public int GetAllFeedbacksOfMyEvents(int userId)
    {
        var user = _context.Users.FirstOrDefault(u => u.Id == userId);
        var myEvents = _context.Events.Where(e => e.OrganizationName.Equals(user.OrganizationName));
        var myReservationsIds = myEvents.Join(
                                        _context.Reservations,
                                        ev => ev.Id,
                                        rs => rs.EventId,
                                        (ev, rs) => new { rs.Id }
                                );
        return myReservationsIds.ToList().Count(rs => GetRegisterEventStatus(rs.Id).Equals("Feedbacked"));
    }

    public void SetAttendanceCheckedForConsecutiveAbsences(int userId)
    {
        var listRegistered = GetListRegisteredEvents(userId);
        var listRegisteredEnded = listRegistered.Where(e => e.EndDate.CompareTo(DateTime.Now) < 0).ToList();
        listRegisteredEnded.Sort(RegisteredEventsDTO.CompareByEndDate);
        var listEndedCount = listRegisteredEnded.Count();
        var last3Reservations = _context.Reservations.Where(rs =>
                                                                rs.Id == listRegisteredEnded.ElementAt(listEndedCount - 1).ReservationId
                                                            || rs.Id == listRegisteredEnded.ElementAt(listEndedCount - 2).ReservationId
                                                            || rs.Id == listRegisteredEnded.ElementAt(listEndedCount - 3).ReservationId
                                                            ).ToList();
        last3Reservations.ForEach(rs =>
        {
            rs.IsAttendanceChecked = true;
            _context.Reservations.Update(rs);
        });
        _context.SaveChanges();
    }
}