using SEEMS.Data.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SEEMS.Models
{
    public class FeedBack : AbstractEntity<int>
    {
        [StringLength(100)]
        public String Content { get; set; }

        [ForeignKey("Reservation")]
        public int ReservationId { get; set; }

        public int Rating { get; set; }

        [JsonIgnore]
        public Reservation Reservation { get; set; }

    }
}
