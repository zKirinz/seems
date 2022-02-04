using SEEMS.Data.Entities;
using SEEMS.Data.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SEEMS.Models
{
    public class InvoiceUser : AbstractEntity<int>
    {
        [ForeignKey("Reservation")]
        public int ReservationId { get; set; }

        public DateTime IssuedAt { get; set; }
                
        public DateTime PaidAt { get; set; }

        public String PaymentMethods { get; set; }

        [JsonIgnore]
        public User? User { get; set; }

        [JsonIgnore]
        public Reservation Reservation { get; set; }
    }
}
