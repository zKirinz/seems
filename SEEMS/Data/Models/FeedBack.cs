using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SEEMS.Models
{
    public class FeedBack
    {

        [Key]
        [Required]
        public int Id { get; set; }

        [StringLength(100)]
        public String Content { get; set; }

        [ForeignKey("Reservation")]
        public int ReservationId { get; set; }

        public int Rating { get; set; }

        public DateTime CreateAt { get; set; }

        public DateTime LastUpdateAt { get; set; }

        [JsonIgnore]
        public Reservation Reservation { get; set; }

    }
}
