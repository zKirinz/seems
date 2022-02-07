using SEEMS.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SEEMS.Data.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllUsersAsync(bool trackChanges);

        Task<User> GetUserAsync(string email, bool trackChanges);

        void CreateUser(User user);
    }
}
