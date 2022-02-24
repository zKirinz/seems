using Microsoft.EntityFrameworkCore;
using SEEMS.Contexts;
using SEEMS.Data.Models;
using SEEMS.Infrastructures.Commons;
using SEEMS.Models;

namespace SEEMS.Data.Repositories.Implements;

public class UserMetaRepository : RepositoryBase<UserMeta>, IUserMetaRepository
{
    public UserMetaRepository(ApplicationDbContext context) : base(context)
    {
    }


    public void CreateMeta(UserMeta meta) => Create(meta);
    
    public void RegisterRole(User user, string role)
    {
        UserMeta roleMeta = new UserMeta();
        roleMeta.User = user;
        roleMeta.MetaKey = "role";
        roleMeta.MetaValue = role;
        
        CreateMeta(roleMeta);
    }

    public async Task<UserMeta> GetRolesAsync(string email, bool trackChanges) =>
        await FindByCondition(m => m.User.Email.Equals(email), trackChanges)
            .SingleOrDefaultAsync();

    public async Task<List<UserMeta>> GetRolesByNameAsync(string roleName, bool trackChanges) =>
        await FindByCondition(m => m.MetaValue.Equals(roleName), trackChanges)
            .ToListAsync();
}