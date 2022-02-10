using SEEMS.Data.Models;
using SEEMS.Infrastructures.Commons;
using SEEMS.Models;

namespace SEEMS.Data.Repositories;

public interface IUserMetaRepository
{
    void CreateMeta(UserMeta meta);

    void RegisterRole(User user, string role);

    Task<UserMeta> GetRolesAsync(string email, bool trackChanges);
}