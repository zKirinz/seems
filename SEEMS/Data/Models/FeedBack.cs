using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

        public Reservation Reservation { get; set; }

    }
}
