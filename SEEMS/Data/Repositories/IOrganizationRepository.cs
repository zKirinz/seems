using SEEMS.Data.Entities;

namespace SEEMS.Data.Repositories.Implements;

public interface IOrganizationRepository
{
    public Task<Organization?> GetOrganizationAsync(int id, bool trackChanges);
}