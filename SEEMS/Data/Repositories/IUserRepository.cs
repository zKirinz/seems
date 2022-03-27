using SEEMS.Data.Entities.RequestFeatures;
using SEEMS.Data.Models;
using SEEMS.Services;

namespace SEEMS.Data.Repositories;

public interface IUserRepository
{
    User GetUser(string email);
    List<User> GetAllUsers();

    Task<PaginatedList<User>?> GetAllUsersAsync(UserParams userParams, bool trackChanges);

    Task<PaginatedList<User>?> GetAllUsersAsync(UserPagination userParams, bool trackChanges);

    Task<User> GetUserAsync(string email, bool trackChanges);

    Task<User> GetActiveUserAsync(string email, bool trackChanges);

    Task<User> GetUserAsync(int id, bool trackChanges);

    int GetCount(List<User> except, bool trackChanges);

    void CreateUser(User user);
    void UpdateUser(User user);
}