using SEEMS.Contexts;
using SEEMS.Models;

namespace SEEMS.Data.Repositories.Implements
{
	public class CommentRepository : RepositoryBase<Comment>, ICommentRepository
	{
		public CommentRepository( ApplicationDbContext context ) : base(context)
		{
		}

		public int CountCommentsOfEvent( int eventId )
		{
			return _context.Comments.Count(c => c.EventId == eventId);
		}
	}
}
