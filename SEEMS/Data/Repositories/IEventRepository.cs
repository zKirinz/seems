using SEEMS.Models;

namespace SEEMS.Data.Repositories;

public interface IEventRepository
{
    Task<IEnumerable<Event>> GetEventsAboutToStartAsync();

    Task<Event> GetEventAsync(int id, bool trackChanges);
}