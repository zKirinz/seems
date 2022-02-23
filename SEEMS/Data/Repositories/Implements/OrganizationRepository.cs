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

}