using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using SEEMS.Data.Entities;

namespace SEEMS.Models;

public class FeedBack : AbstractEntity<int>
{
    public string Content { get; set; }

    [ForeignKey("Reservation")] public int ReservationId { get; set; }

    public int Rating { get; set; }

    [JsonIgnore] public Reservation Reservation { get; set; }
}