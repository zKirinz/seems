using SEEMS.Data.Entities;

namespace SEEMS.Data.Repositories.Implements;

public interface IOrganizationRepository
{
    public Task<Organization?> GetOrganizationAsync(int id, bool trackChanges);
    
    public Task<Organization?> GetOrganizationByName(string? name, bool trackChanges);
}