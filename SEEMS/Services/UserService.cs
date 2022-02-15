using Microsoft.EntityFrameworkCore;

using SEEMS.Contexts;
using SEEMS.Data.Models;
using SEEMS.Services.Interfaces;

namespace SEEMS.Services
{
	public class UserService
	{
		private readonly ApplicationDbContext _context;

		public UserService(ApplicationDbContext context)
		{
			_context = context;
		}

		public async Task<User> getCurrentUser(HttpContext httpContext)
		{
			var email = (string)httpContext.Items["email"];
			var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
			return user;
		}
	}
}
