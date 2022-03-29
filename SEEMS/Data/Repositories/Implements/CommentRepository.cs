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

    public async Task<IEnumerable<Comment>> GetChildComments(int commentId, bool trackChanges)
    {
        return await FindByCondition(u => u.ParentCommentId == commentId, trackChanges)
            .ToListAsync();
    }

    public void DeleteComment(Comment comment)
    {
        var list = GetChildComments(comment.Id, false).Result;
        if (list.Any()) BulkDelete(list);
        Delete(comment);
    }

    public void TempDelete(Dictionary<Comment, IEnumerable<Comment>> locationIds)
    {
        foreach (var pair in locationIds)
        {
            var list = GetChildComments(pair.Key.Id, false).Result;
            if (list.Any()) BulkDelete(list);
            Delete(pair.Key);
        }
    }
}