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
	}
}
