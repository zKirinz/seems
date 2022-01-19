using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SEEMS.Models
{
    public class Reservation
    {

        [Key]
        [Required]
        public int Id { get; set; }

        public bool Attend { get; set; }

        public DateTime CreateAt { get; set; }

        public DateTime LastUpdateAt { get; set; }

        [Column(TypeName = "decimal(7,2)")]
        public decimal DiscountPercent { get; set; }

        [Column(TypeName = "decimal(7,2)")]
        public decimal TotalPrice { get; set; }

        [ForeignKey("Event")]
        public int EventId { get; set; }

        [JsonIgnore]
        public Event Event { get; set; }

        [JsonIgnore]
        public List<FeedBack> FeedBacks { get; set; }

    }
}
