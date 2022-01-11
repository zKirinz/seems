using System.ComponentModel.DataAnnotations;

namespace SEEMS.Models
{
    public class FeedBack
    {

        [Key]
        public int Id { get; set; }

        [StringLength(100)]
        public String Content { get; set; }

        public int Rating { get; set; }

        public DateTime CreateAt { get; set; }

        public DateTime LastUpdateAt { get; set; }

        public Reservation Reservation { get; set; }

    }
}
