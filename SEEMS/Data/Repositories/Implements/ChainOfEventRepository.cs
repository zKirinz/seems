using Microsoft.EntityFrameworkCore;
using SEEMS.Contexts;
using SEEMS.Data.Entities.RequestFeatures;
using SEEMS.Models;
using SEEMS.Services;

namespace SEEMS.Data.Repositories.Implements;

public class ChainOfEventRepository : RepositoryBase<ChainOfEvent>, IChainOfEventsRepository
{

    public ChainOfEventRepository(ApplicationDbContext context) : base(context)
    {
    }
    
    public async Task<PaginatedList<ChainOfEvent>> GetAllChainOfEventsAsync(ChainOfEventsPagination args, bool trackChanges)
    {
        var listChainOfEvents = await FindAll(trackChanges)
            .OrderBy(c => c.CategoryName)
            .ToListAsync();
        
        return PaginatedList<ChainOfEvent>.Create(listChainOfEvents, args.PageNumber, args.PageSize);
    }
}