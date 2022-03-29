using SEEMS.Data.Entities;

namespace SEEMS.Data.Repositories.Implements;

public interface ILikeCommentRepository
{
    public Task<IEnumerable<LikeComment>> GetLikeCommentByCommentIdAsync(int theId, bool trackChanges);

    void BulkDeleteLikeComments(IEnumerable<LikeComment> locationIds); 
}