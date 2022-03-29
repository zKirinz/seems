using SEEMS.Models;

namespace SEEMS.Data.Repositories;

public interface ICommentRepository
{
    public int CountCommentsOfEvent(int eventId);

    public Task<IEnumerable<Comment>> GetCommentsByEventId(int eventId, bool trackChanges);

    void DeleteComment(Comment comment);
}