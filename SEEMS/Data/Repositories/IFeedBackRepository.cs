namespace SEEMS.Data.Repositories
{
    public interface IFeedBackRepository
    {
        bool CanFeedBack(int eventId, int userId);
    }
}
