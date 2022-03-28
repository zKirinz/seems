namespace SEEMS.Data.DTOs;

public class RegisteredEventsDTO
{
    public int Id { get; set; }
    public int ReservationId { get; set; }
    public bool FeedBack { get; set; }
    public string EventTitle { get; set; }
    public string EventDescription { get; set; }
    public int CommentsNum { get; set; }
    public bool? CanRegister { get; set; }
    public bool? Attend { get; set; }
    public bool IsAttendanceChecked { get; set; } = false;
    public string? ReservationStatus { get; set; }
    public string OrganizationName { get; set; }
    public bool IsPrivate { get; set; }
    public string ImageUrl { get; set; }
    public bool Active { get; set; }
    public string Location { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

    public static int CompareByEndDate(RegisteredEventsDTO r1, RegisteredEventsDTO r2)
    {
        return r1.EndDate.CompareTo(r2.EndDate);
    }
}