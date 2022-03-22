using System.ComponentModel.DataAnnotations;

namespace SEEMS.Data.DTOs.Event;

public class EventForUpdateDTO
{
    public string? EventTitle { get; set; }
    public string? EventDescription { get; set; }
    public string? Location { get; set; }
    public string? ImageUrl { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public DateTime? RegistrationDeadline { get; set; }
}