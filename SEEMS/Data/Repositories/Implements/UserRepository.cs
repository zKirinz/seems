using Microsoft.EntityFrameworkCore;
using SEEMS.Contexts;
using SEEMS.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SEEMS.Data.Repositories.Implements
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {

        public UserRepository(ApplicationDbContext context) : base(context)
        {

        }

        public void CreateUser(User user) => Create(user);

        public async Task<IEnumerable<User>> GetAllUsersAsync(bool trackChanges) =>
            await FindAll(trackChanges)
            .OrderBy(u => u.Email)
            .ToListAsync();

        public async Task<User> GetUserAsync(string email, bool trackChanges) =>
        #pragma warning disable CS8603 // Possible null reference return.
           await FindByCondition(u => u.Email.Equals(email), trackChanges)
            .SingleOrDefaultAsync();
        #pragma warning restore CS8603 // Possible null reference return.
    }
}
