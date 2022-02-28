using SEEMS.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SEEMS.Data.Entities;
using SEEMS.Data.Entities.RequestFeatures;
using SEEMS.Models;
using SEEMS.Services;

namespace SEEMS.Data.Repositories;

public interface IUserRepository
{
    Task<PaginatedList<User>?> GetAllUsersAsync(UserParams userParams, bool trackChanges);

    Task<PaginatedList<User>?> GetAllUsersAsync(UserPagination userParams, bool trackChanges);

    Task<User> GetUserAsync(string email, bool trackChanges);

    int GetCount(List<User> except, bool trackChanges);

    void CreateUser(User user);
}