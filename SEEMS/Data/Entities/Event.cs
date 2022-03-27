using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using SEEMS.Data.Entities;
using SEEMS.Infrastructures.Attributes;
using SEEMS.Infrastructures.Commons;

namespace SEEMS.Models;

public class Event : AbstractEntity<int>
{
    [StringLength(100)] public string EventTitle { get; set; }

    [StringLength(2000)] public string EventDescription { get; set; }

    [Required] public OrganizationEnum OrganizationName { get; set; }

    [Required(ErrorMessage = "Participant num is required")]
    public int ParticipantNum { get; set; }

    public bool IsPrivate { get; set; }

    [StringLength(2048)] public string ImageUrl { get; set; }

    public bool Active { get; set; }

    public string Location { get; set; }

    [IsUtc(true)]
    public DateTime StartDate { get; set; }

    [IsUtc(true)]
    public DateTime EndDate { get; set; }

    [IsUtc(true)]
    public DateTime RegistrationDeadline { get; set; }

    [JsonIgnore] public IEnumerable<Reservation>? Reservations { get; set; }

    [JsonIgnore] public List<Comment>? Comments { get; set; }
}