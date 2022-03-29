using Microsoft.EntityFrameworkCore;
using SEEMS.Contexts;
using SEEMS.Data.Entities;

namespace SEEMS.Data.Repositories.Implements;

public class LikeCommentRepository : RepositoryBase<LikeComment>, ILikeCommentRepository
{
    public LikeCommentRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<LikeComment>> GetLikeCommentByCommentIdAsync(int theId, bool trackChanges) =>
        await FindByCondition(u => u.CommentId == theId, trackChanges)
            .ToListAsync();

    public void BulkDeleteLikeComments(IEnumerable<LikeComment> locationIds)
    {
        if (locationIds.Any()) BulkDelete(locationIds);
    }
}