using SEEMS.Contexts;
using SEEMS.Models;

namespace SEEMS.Data.Repositories.Implements
{
    public class FeedbackRepository : RepositoryBase<FeedBack>, IFeedBackRepository
    {
        public FeedbackRepository(ApplicationDbContext context) : base(context)
        {
        }

        public bool CanFeedBack(int eventId, int userId)
        {
            var reservation = _context.Reservations.FirstOrDefault(x => x.Id == eventId && x.UserId == userId);
            bool canFeedback = false;
            if (reservation != null && reservation.Attend == true)
            {
                var feedBack = _context.FeedBacks.FirstOrDefault(x => x.ReservationId == reservation.Id);
                if (feedBack == null)
                {
                    canFeedback = true;
                }
            }  
            
            return canFeedback;
        }
    }
}
