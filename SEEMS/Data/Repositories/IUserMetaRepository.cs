using SEEMS.Data.Models;
using SEEMS.Models;

namespace SEEMS.Data.Repositories;

public interface IUserMetaRepository
{
    void CreateMeta(UserMeta meta);

    void RegisterRole(User user, string role);
    void SaveConsecutiveAbsences(int userId, int consecutiveAbsences);
    int GetConsecutiveAbsences(int userId);

    Task<UserMeta> GetRolesAsync(string email, bool trackChanges);

    Task<List<UserMeta>> GetRolesByNameAsync(string roleName, bool trackChanges);

    Task<UserMeta> GetRoleByUserIdAsync(int id, bool trackChanges);
}