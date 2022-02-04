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

        public Task<IEnumerable<User>> GetAll()
        {
            throw new NotImplementedException();
        }
    }
}
