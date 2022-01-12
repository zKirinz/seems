using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SEEMS.Models
{
    public class EventMeta
    {

        [Key]
        public int Id { get; set; }

        [ForeignKey("Event")]
        public int EventId { get; set; }

        [StringLength(20)]
        public String MetaKey { get; set; }

        [StringLength(20)]
        public String MetaValue { get; set; }
        public Event Event { get; set; }

    }
}