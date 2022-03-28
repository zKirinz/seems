using Microsoft.EntityFrameworkCore;
using SEEMS.Contexts;
using SEEMS.Models;

namespace SEEMS.Data.Repositories.Implements;

public class CommentRepository : RepositoryBase<Comment>, ICommentRepository
{
    public CommentRepository(ApplicationDbContext context) : base(context)
    {
    }

    public int CountCommentsOfEvent(int eventId)
    {
        return _context.Comments.Count(c => c.EventId == eventId);
    }

    public async Task<IEnumerable<Comment>> GetCommentsByEventId(int eventId, bool trackChanges)
    {
        return await FindByCondition(u => u.EventId == eventId, trackChanges)
            .ToListAsync();
    }

    public void BulkDeleteComments(IEnumerable<Comment> locationIds)
    {
        if (locationIds.Any()) BulkDelete(locationIds);
    }
}