using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using SEEMS.Data.Entities;
using SEEMS.Data.Models;

namespace SEEMS.Models;

public class Reservation : AbstractEntity<int>
{
    public bool Attend { get; set; }

    [ForeignKey("Event")] public int EventId { get; set; }

    [ForeignKey("User")] public int? UserId { get; set; }

    [JsonIgnore] public Event Event { get; set; }

    [JsonIgnore] public User? User { get; set; }

    [JsonIgnore] public FeedBack FeedBack { get; set; }

    public bool IsAttendanceChecked { get; set; } = false;
}