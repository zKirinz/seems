using SEEMS.Models.Identities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SEEMS.Models
{
    public class InvoiceUser
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [ForeignKey("Reservation")]
        public int ReservationId { get; set; }

        public DateTime IssuedAt { get; set; }
                
        public DateTime PaidAt { get; set; }

        public DateTime CanceledAt { get; set; }

        public String PaymentMethods { get; set; }

        [JsonIgnore]
        public ApplicationUser? User { get; set; }

        [JsonIgnore]
        public Reservation Reservation { get; set; }
    }
}
