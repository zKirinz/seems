using Microsoft.EntityFrameworkCore;
using SEEMS.Contexts;
using SEEMS.Models;

namespace SEEMS.Data.Repositories.Implements;

public class FeedbackRepository : RepositoryBase<FeedBack>, IFeedBackRepository
{
    public FeedbackRepository(ApplicationDbContext context) : base(context)
    {
    }

    public bool CanFeedBack(int eventId, int userId)
    {
        var reservation = _context.Reservations.FirstOrDefault(x => x.EventId == eventId && x.UserId == userId);
        var canFeedback = false;
        if (reservation != null && reservation.Attend)
        {
            var feedBack = _context.FeedBacks.FirstOrDefault(x => x.ReservationId == reservation.Id);
            if (feedBack == null) canFeedback = true;
        }

        return canFeedback;
    }

    public async Task<IEnumerable<FeedBack>> GetFeedbacksByReservationId(int theId, bool trackChanges)
    {
        return await FindByCondition(u => u.ReservationId == theId, trackChanges)
            .ToListAsync();
    }

    public void BulkDeleteFeedbacks(IEnumerable<FeedBack> locationIds)
    {
        if (locationIds.Any()) BulkDelete(locationIds);
    }
}