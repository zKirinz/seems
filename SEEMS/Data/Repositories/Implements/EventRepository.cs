using Microsoft.EntityFrameworkCore;

using SEEMS.Contexts;
using SEEMS.Models;

namespace SEEMS.Data.Repositories.Implements
{
	public class EventRepository : RepositoryBase<Event>, IEventRepository
	{
		public EventRepository(ApplicationDbContext context) : base(context)
		{
		}

		public IEnumerable<Event> GetAllEvents(bool trackChanges)
			=> FindAll(trackChanges)
			.OrderBy(c => c.StartDate)
			.ToList();

		public Event GetEvent(int id, bool trackChanges = false)
			=> FindByCondition(c => c.Id.Equals(id), trackChanges)
			.SingleOrDefault();

		public async Task<IEnumerable<Event>> GetAllEventsAsync(bool trackChanges) =>
			await FindAll(trackChanges).ToListAsync();

		public async Task<IEnumerable<Event>> GetAllEventsAboutToStartIn30Min(DateTime from, bool trackChanges) =>
			await FindByCondition(e => e.StartDate <= from.AddMinutes(30)
					&& e.StartDate >= from, trackChanges)
				.ToListAsync();

		public async Task<Event> GetEventAsync(int id, bool trackChanges) =>
			await FindByCondition(e => e.Id == id, trackChanges).SingleOrDefaultAsync();

		public bool CanRegister(int id)
		{
			var myEvent = _context.Events.FirstOrDefault(e => e.Id == id);
			var registeredNum = _context.Reservations.Count(r => r.EventId == id);
			return registeredNum < myEvent.ParticipantNum && myEvent.RegistrationDeadline.CompareTo(DateTime.Now) > 0;
		}

		public bool CanUnregister(int id, int minHourToUnregister)
        {
			var myEvent = _context.Events.SingleOrDefault(e => e.Id == id);
			return myEvent.StartDate.Subtract(DateTime.Now).TotalHours > minHourToUnregister;
        }
	}
}
