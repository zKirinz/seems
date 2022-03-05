using SEEMS.Models;

namespace SEEMS.Data.Repositories
{
	public interface IEventRepository
	{
		IEnumerable<Event> GetAllEvents( bool trackChanges = false );
		Event GetEvent( int id, bool trackChanges = false );
	}
}
