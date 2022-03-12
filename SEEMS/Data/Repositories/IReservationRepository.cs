namespace SEEMS.Data.Repositories
{
	public interface IReservationRepository
	{
		int GetRegisteredNum(int eventId);
		string GetEventStatus(int reservationId);
	}
}
