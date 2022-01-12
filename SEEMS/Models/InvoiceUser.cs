using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SEEMS.Models
{
    public class InvoiceUser
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Reservation")]
        public int ReservationId { get; set; }

        public DateTime IssuedAt { get; set; }

        public DateTime PaidAt { get; set; }

        public DateTime CanceledAt { get; set; }

        public String PaymentMethods { get; set; }

        public Reservation Reservation { get; set; }
    }
}
