using System.ComponentModel.DataAnnotations;

namespace SEEMS.Data.DTOs.Event;

public class EventForUpdateDTO
{
    [MinLength(5, ErrorMessage = "Event Title must be from 5 to 100 characters")]
    [MaxLength(100, ErrorMessage = "Event Title must be from 5 to 100 characters")]
    public string? EventTitle { get; set; }

    [MinLength(20, ErrorMessage = "Event Description must be from 20 to 2000 characters")]
    [MaxLength(2000, ErrorMessage = "Event Description must be from 20 to 2000 characters")]
    public string? EventDescription { get; set; }

    [MinLength(5, ErrorMessage = "Location must be from 5 to 50 characters")]
    [MaxLength(50, ErrorMessage = "Location must be from 5 to 50 characters")]
    public string? Location { get; set; }

    public string? ImageUrl { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public DateTime RegistrationDeadline { get; set; }
}