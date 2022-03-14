using SEEMS.Data.Models;
using SEEMS.Models;

namespace SEEMS.Data.Repositories
{
	public interface IReservationRepository
	{
		int GetRegisteredNum(int eventId);
		
		public Task<List<Reservation>> GetReservationsByEventId(int eventId, bool trackChanges);

		public Task<List<Reservation>> GetReservationsByEventId(DateTime from, bool trackChanges);
		string GetEventStatus(int reservationId);
	}
}
