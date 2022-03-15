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
		
		public async Task<IEnumerable<Reservation>> GetReservationsByEventId(DateTime from, bool trackChanges) =>
			await FindByCondition(r => r.CreatedAt <= from.AddMinutes(30) && r.IsEmailed == false, 
					trackChanges)
				.ToListAsync();

		public async Task<Reservation> GetReservationAsync(int id, bool trackChanges) =>
			await FindByCondition(r => r.Id == id, trackChanges)
				.SingleOrDefaultAsync();

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
				result = "Attended";
			}
			return result;
		}
	}
}
