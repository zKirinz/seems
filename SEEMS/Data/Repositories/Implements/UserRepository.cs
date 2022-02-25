using Microsoft.EntityFrameworkCore;
using SEEMS.Contexts;
using SEEMS.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SEEMS.Data.Entities;
using SEEMS.Data.Entities.RequestFeatures;
using SEEMS.Models;
using SEEMS.Services;

namespace SEEMS.Data.Repositories.Implements
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {

        public UserRepository(ApplicationDbContext context) : base(context)
        {

        }

        public void CreateUser(User user) => Create(user);

        public async Task<PaginatedList<User>?> GetAllUsersAsync(Organization? org, UserParams userParams, bool trackChanges)
        {
            var users = await FindByCondition(u => u.OrganizationId == org.Id, trackChanges)
                        .OrderBy(u => u.Email)
                        .Skip((userParams.PageNumber - 1) * userParams.PageSize)
                        .Take(userParams.PageSize)
                        .ToListAsync();
            return PaginatedList<User>.Create(users, userParams.PageNumber, userParams.PageSize);
        } 

        public async Task<User> GetUserAsync(string email, bool trackChanges) =>
        #pragma warning disable CS8603 // Possible null reference return.
           await FindByCondition(u => u.Email.Equals(email), trackChanges)
            .SingleOrDefaultAsync();
        #pragma warning restore CS8603 // Possible null reference return.
    }
}
