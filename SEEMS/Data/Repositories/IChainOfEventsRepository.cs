using SEEMS.Data.Entities.RequestFeatures;
using SEEMS.Models;
using SEEMS.Services;

namespace SEEMS.Data.Repositories;

public interface IChainOfEventsRepository
{
    Task<PaginatedList<ChainOfEvent>> GetAllChainOfEventsAsync(int userId, ChainOfEventsPagination args, bool trackChanges);

    void CreateChainOfEvent(int userId, ChainOfEvent chainOfEvent);
}