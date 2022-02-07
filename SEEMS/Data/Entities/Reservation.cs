using SEEMS.Data.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SEEMS.Models
{
    public class Reservation : AbstractEntity<int>
    {
        public bool Attend { get; set; }

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
