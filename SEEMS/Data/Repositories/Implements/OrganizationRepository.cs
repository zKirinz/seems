using Microsoft.EntityFrameworkCore;
using SEEMS.Contexts;
using SEEMS.Data.Entities;

namespace SEEMS.Data.Repositories.Implements;

public class OrganizationRepository : RepositoryBase<Organization>, IOrganizationRepository
{
    public OrganizationRepository(ApplicationDbContext context) : base(context)
    {
    }
    
    public async Task<Organization?> GetOrganizationAsync(int id, bool trackChanges) =>
            await FindByCondition(org => org.Id == id, trackChanges)
                .SingleOrDefaultAsync();

    public async Task<Organization> GetOrganizationByName(string? name, bool trackChanges) =>
        await FindByCondition(org => org.Name.ToLower().Equals(name), trackChanges)
            .SingleOrDefaultAsync();
}