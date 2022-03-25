using Microsoft.EntityFrameworkCore;

using SEEMS.Contexts;
using SEEMS.Infrastructures.Commons;
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

		public async Task<IEnumerable<Event>> GetAllEventsShouldBeChangedToInactive(DateTime from, bool trackChanges) =>
			await FindByCondition(e => e.EndDate == from || e.EndDate.AddMinutes(5) == from, trackChanges)
				.ToListAsync();

		public void DeleteEvent(Event @event) => Delete(@event);

		public async Task<IEnumerable<Event>> GetAllEventsRecentlyModifiedFor5Minutes(DateTime from, bool trackChanges) =>
			await FindByCondition(e => from.AddMinutes(-5) <= e.ModifiedAt, trackChanges)
				.ToListAsync();

		public async Task<Event> GetEventAsync(int id, bool trackChanges) =>
			await FindByCondition(e => e.Id == id, trackChanges).SingleOrDefaultAsync();

		public bool CanRegister(int id)
		{
			var myEvent = _context.Events.FirstOrDefault(e => e.Id == id);
			var registeredNum = _context.Reservations.Count(r => r.EventId == id);
			return myEvent.RegistrationDeadline.CompareTo(DateTime.Now) > 0 && (registeredNum == 0 || registeredNum < myEvent.ParticipantNum);
		}
		public bool CanUnregister(int id, int minHourToUnregister)
		{
			var myEvent = _context.Events.SingleOrDefault(e => e.Id == id);
			return myEvent.StartDate.Subtract(DateTime.Now).TotalHours > minHourToUnregister;
		}

		public bool CanTakeAttendance(int id)
		{
			var myEvent = _context.Events.SingleOrDefault(e => e.Id == id);
			var now = DateTime.Now;
			return now.CompareTo(myEvent.StartDate.Subtract(TimeSpan.FromHours(1))) > 0 && now.CompareTo(myEvent.EndDate) < 0;
		}

		public string? GetMyEventStatus(int eventId)
		{
			var myEvent = _context.Events.FirstOrDefault(e => e.Id == eventId);
			string? statusResult = null;
			if(myEvent != null)
			{
				var registrationDeadline = myEvent.RegistrationDeadline;
				var now = DateTime.Now;
				if(CanTakeAttendance(eventId))
				{
					statusResult = "TakingAttendance";
				}
				else if(now.CompareTo(myEvent.StartDate.Subtract(TimeSpan.FromHours(1))) < 0)
				{
					statusResult = "Pending";
				}
				else if(now.CompareTo(myEvent.EndDate) > 0)
				{
					statusResult = "Finished";
				}
			}
			return statusResult;
		}

		public int GetHostedEventsNum(int userId)
		{
			var user = _context.Users.FirstOrDefault(u => u.Id == userId);
			return _context.Events.Count(e => e.OrganizationName.Equals(user.OrganizationName));
		}

		public int GetFinishedHostedEventsNum(int userId)
		{
			var user = _context.Users.FirstOrDefault(u => u.Id == userId);
			var foundList = _context.Events.Where(e => e.OrganizationName.Equals(user.OrganizationName)).ToList();
			return foundList.Count(e => GetMyEventStatus(e.Id).Equals("Finished"));
		}
	}
}
