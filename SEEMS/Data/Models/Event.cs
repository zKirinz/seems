using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SEEMS.Models
{
    public class Event
    {

        [Key]
        public int Id { get; set; }

        [StringLength(100)]
        public String EventTitle { get; set; }


        [StringLength(255)]
        public String EventDescription { get; set; }

        [JsonIgnore]
        [ForeignKey("ChainOfEvent")]
        public int? ChainOfEventId { get; set; }

        public bool IsPrivate { get; set; }

        [StringLength(255)]
        public String ImageUrl { get; set; }

        public decimal ExpectPrice { get; set; }

        public bool Active { get; set; }

        public String Location { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public DateTime CreateAt { get; set; }

        public DateTime LastUpdateAt { get; set; }

        public ChainOfEvent? ChainOfEvent { get; set; }

        public List<Reservation>? Reservations { get; set; }

        public List<Comment>? Comments { get; set; }


    }
}
