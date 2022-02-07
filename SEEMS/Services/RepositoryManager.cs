using SEEMS.Contexts;
using SEEMS.Data.Repositories;
using SEEMS.Data.Repositories.Implements;
using SEEMS.Services.Interfaces;

namespace SEEMS.Services
{
    public class RepositoryManager : IRepositoryManager
    {

        private ApplicationDbContext _context;
        private IUserRepository _userRepository;

        public RepositoryManager(ApplicationDbContext context)
        {
            _context = context;
        }

        public IUserRepository User 
        { 
            get
            {
                if (_userRepository == null)
                {
                    _userRepository = new UserRepository(_context);
                }

                return _userRepository; 
            } 
        }

        public Task SaveAsync() => _context.SaveChangesAsync(); 
    }
}
