using SEEMS.Models;

namespace SEEMS.Data.Repositories;

public interface IFeedBackRepository
{
    bool CanFeedBack(int eventId, int userId);

    public Task<IEnumerable<FeedBack>> GetFeedbacksByReservationId(int theId, bool trackChanges);

    void BulkDeleteFeedbacks(IEnumerable<FeedBack> locationIds);
}