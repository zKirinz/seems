namespace SEEMS.Data.DTOs;

public class ReservationForAttendanceResDTO
{
    public int ReservationId { get; set; }
    public string UserName { get; set; }
    public string ImageUrl { get; set; }
    public string Email { get; set; }
    public bool Attend { get; set; }
}