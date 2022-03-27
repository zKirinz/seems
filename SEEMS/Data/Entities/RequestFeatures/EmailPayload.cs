namespace SEEMS.Data.Entities.RequestFeatures;

public class EmailPayload
{
    public string Email { get; set; }
    public int EventId { get; set; }
    public int ReservationId { get; set; }
}