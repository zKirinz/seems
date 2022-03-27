namespace SEEMS.Data.DTOs;

public class ReservationDTO
{
    public int EventId { get; set; }
    private bool Attend { get; set; } = false;
}