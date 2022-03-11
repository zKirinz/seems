using Microsoft.EntityFrameworkCore;
using SEEMS.Contexts;
using SEEMS.Data.Models;
using SEEMS.Models;

namespace SEEMS.Data.Repositories.Implements
{
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

		public async Task<List<Reservation>> GetReservationsByEventId(int eventId, bool trackChanges) =>
			await FindByCondition(r => r.EventId == eventId, trackChanges)	
				.ToListAsync();
		
		public async Task<List<Reservation>> GetReservationsByEventId(DateTime from, bool trackChanges) =>
			await FindByCondition(r => r.CreatedAt == from, trackChanges)
				.ToListAsync();
	}
}
