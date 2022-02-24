using Microsoft.EntityFrameworkCore;
using SEEMS.Contexts;
using SEEMS.Models;

namespace SEEMS.Data.Repositories.Implements;

public class EventRepository : RepositoryBase<Event>, IEventRepository
{
    public EventRepository(ApplicationDbContext context) : base(context)
    {
    }
    
    public async Task<IEnumerable<Event>> GetEventsAboutToStartAsync()
    {
        var tommorow = DateTime.Today.AddDays(1);
        
        return  await FindAll(false).Where(x => x.StartDate == tommorow).ToListAsync();
    }

    public async Task<Event> GetEventAsync(int id, bool trackChanges) =>
        await FindByCondition(e => e.Id == id, trackChanges)
            .SingleOrDefaultAsync();
}