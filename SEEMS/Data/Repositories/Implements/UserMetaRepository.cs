using Microsoft.EntityFrameworkCore;
using SEEMS.Contexts;
using SEEMS.Data.Models;
using SEEMS.Models;

namespace SEEMS.Data.Repositories.Implements;

public class UserMetaRepository : RepositoryBase<UserMeta>, IUserMetaRepository
{
    private const string CONSECUTIVE_ABSENCES_KEY = "consecutiveAbsences";

    public UserMetaRepository(ApplicationDbContext context) : base(context)
    {
    }

    public void CreateMeta(UserMeta meta)
    {
        Create(meta);
    }

    public void RegisterRole(User user, string role)
    {
        var roleMeta = new UserMeta();
        roleMeta.User = user;
        roleMeta.MetaKey = "role";
        roleMeta.MetaValue = role;

        CreateMeta(roleMeta);
    }

    public async Task<UserMeta> GetRolesAsync(string email, bool trackChanges)
    {
        return await FindByCondition(m => m.User.Email.Equals(email) && m.MetaKey.Equals("role"), trackChanges)
            .SingleOrDefaultAsync();
    }

    public async Task<List<UserMeta>> GetRolesByNameAsync(string roleName, bool trackChanges)
    {
        return await FindByCondition(m => m.MetaValue.Equals(roleName), trackChanges)
            .ToListAsync();
    }

    public async Task<UserMeta> GetRoleByUserIdAsync(int id, bool trackChanges)
    {
        return await FindByCondition(m => m.UserId == id && m.MetaKey.Equals("role"), trackChanges)
            .SingleOrDefaultAsync();
    }

    public void SaveConsecutiveAbsences(int userId, int consecutiveAbsences)
    {
        var meta = _context.UserMetas.FirstOrDefault(m =>
            m.UserId == userId && m.MetaKey.Equals(CONSECUTIVE_ABSENCES_KEY));

        if (meta != null)
            meta.MetaValue = consecutiveAbsences.ToString();
        else
            CreateMeta(new UserMeta
            {
                UserId = userId,
                MetaKey = CONSECUTIVE_ABSENCES_KEY,
                MetaValue = consecutiveAbsences.ToString()
            });
        _context.SaveChanges();
    }

    public int GetConsecutiveAbsences(int userId)
    {
        var result = _context.UserMetas
            .FirstOrDefault(m => m.UserId == userId && m.MetaValue.Equals(CONSECUTIVE_ABSENCES_KEY)).MetaValue;
        return result == null ? 0 : int.Parse(result);
    }
}