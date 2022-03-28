using Microsoft.EntityFrameworkCore;
using SEEMS.Contexts;
using SEEMS.Data.Entities.RequestFeatures;
using SEEMS.Data.Models;
using SEEMS.Data.Repositories.Extensions;
using SEEMS.Services;

namespace SEEMS.Data.Repositories.Implements;

public class UserRepository : RepositoryBase<User>, IUserRepository
{
    public UserRepository(ApplicationDbContext context) : base(context)
    {
    }

    public void CreateUser(User user)
    {
        Create(user);
    }

    public List<User> GetAllUsers()
    {
        return _context.Users.ToList();
    }

    public async Task<PaginatedList<User>?> GetAllUsersAsync(UserParams param, bool trackChanges)
    {
        var users = await FindAll(trackChanges)
            .FilterUsersByOrg(_context, param.Organization)
            .FilterUsersByRole(_context, param.Role)
            .ToListAsync();
        return PaginatedList<User>.Create(users, param.PageNumber, param.PageSize);
    }

    public async Task<PaginatedList<User>?> GetAllUsersAsync(UserPagination param, bool trackChanges)
    {
        var user = await FindAll(false)
            .OrderBy(u => u.Id)
            .Skip((param.PageNumber - 1) * param.PageSize)
            .ToListAsync();
        return PaginatedList<User>.Create(user, param.PageNumber, param.PageSize);
    }

    public int GetCount(List<User> except, bool trackChanges)
    {
        return FindAll(trackChanges).ToList().Except(except).Count();
    }

    public User GetUser(string email)
    {
        return _context.Users.AsNoTracking().FirstOrDefault(u => u.Email.Equals(email));
    }

    public async Task<User> GetUserAsync(string email, bool trackChanges)
    {
        return await FindByCondition(u => u.Email.Equals(email), trackChanges)
            .SingleOrDefaultAsync();
    }

    public async Task<User> GetActiveUserAsync(string email, bool trackChanges)
    {
        return await FindByCondition(u => u.Email.Equals(email) && u.Active == true, trackChanges)
            .SingleOrDefaultAsync();
    }

    public async Task<User> GetUserAsync(int id, bool trackChanges)
    {
        return await FindByCondition(u => u.Id == id, trackChanges)
            .SingleOrDefaultAsync();
    }

    public void UpdateUser(User user)
    {
        _context.Update(user);
        _context.SaveChanges();
    }
}