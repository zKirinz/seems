using SEEMS.Data.DTOs;
using SEEMS.Models;

namespace SEEMS.Data.Repositories;

public interface IReservationRepository
{
    int GetRegisteredNum(int eventId);
    int GetRegisteredEventsNumOfUser(int userId);
    int GetRegisteredEventsNumByStatus(int userId, string status);
    int GetConsecutiveAbsentNum(int userId);
    int GetAttendedReservationsOfMyEvents(int userId);
    int GetAllReservationsOfMyEvents(int userId);
    int GetAllFeedbacksOfMyEvents(int userId);
    void SetAttendanceCheckedForConsecutiveAbsences(int userId);
    public Task<IEnumerable<Reservation>> GetReservationsByEventId(int eventId, bool trackChanges);

    void BulkDeleteReservations(IEnumerable<Reservation> locationIds);

    public Task<Reservation> GetReservationAsync(int id, bool trackChanges);
    string GetRegisterEventStatus(int reservationId);
    IEnumerable<RegisteredEventsDTO> GetListRegisteredEvents(int userId);
}