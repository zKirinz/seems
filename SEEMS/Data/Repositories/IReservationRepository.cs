using SEEMS.Data.DTOs;

namespace SEEMS.Data.Repositories
{
	public interface IReservationRepository
	{
		int GetRegisteredNum(int eventId);
		string GetEventStatus(int reservationId);
		IEnumerable<RegisteredEventsDTO> GetListRegisteredEvents(int userId);
	}
}
