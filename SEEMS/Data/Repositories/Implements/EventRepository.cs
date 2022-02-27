using SEEMS.Contexts;
using SEEMS.Models;

namespace SEEMS.Data.Repositories.Implements
{
	public class EventRepository : RepositoryBase<Event>, IEventRepository
	{
		public EventRepository( ApplicationDbContext context ) : base(context)
		{
		}

		public IEnumerable<Event> GetAllEvents( bool trackChanges )
			=> FindAll(trackChanges)
			.OrderBy(c => c.StartDate)
			.ToList();

		public Event GetEvent( int id, bool trackChanges = false )
			=> FindByCondition(c => c.Id.Equals(id), trackChanges)
			.SingleOrDefault();

	}
}
