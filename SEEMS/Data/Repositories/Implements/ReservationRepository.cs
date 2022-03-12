using SEEMS.Contexts;
using SEEMS.Models;

namespace SEEMS.Data.Repositories.Implements
{
	public class ReservationRepository : RepositoryBase<Reservation>, IReservationRepository
	{
		public ReservationRepository(ApplicationDbContext context) : base(context)
		{
		}

		public int GetRegisteredNum(int eventId)
		{
			return _context.Reservations.Where(r => r.EventId == eventId).Count();
		}

		public string GetEventStatus(int reservationId)
		{
			var feedback = _context.FeedBacks.Any(f => f.ReservationId == reservationId);
			var reservation = _context.Reservations.FirstOrDefault(r => r.Id == reservationId);
			var attended = reservation.Attend;
			var registeredEvent = _context.Events.FirstOrDefault(e => e.Id == reservation.EventId);
			string result = null;
			if(DateTime.Now.CompareTo(registeredEvent.EndDate) < 0)
			{
				result = "Pending";
			}
			else
			if(!attended)
			{
				result = "Absent";
			}
			else
			if(feedback)
			{
				result = "Feedbacked";
			}
			else
			{
				result = "Attend";
			}
			return result;
		}
	}
}
