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
			var attended = _context.Reservations.FirstOrDefault(r => r.Id == reservationId).Attend;
			string result = null;
			if(!attended)
			{
				result = "Absent";
			}
			else
			{
				if(feedback)
				{
					result = "Feedbacked";
				}
				else
				{
					result = "Attend";
				}
			}
			return result;
		}
	}
}
