using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SEEMS.Models
{
    public class EventMeta
    {

        [Key]
        [Required]
        public int Id { get; set; }

        [ForeignKey("Event")]
        public int EventId { get; set; }

        [StringLength(20)]
        public String MetaKey { get; set; }

        [StringLength(20)]
        public String MetaValue { get; set; }

        [JsonIgnore]
        public Event Event { get; set; }

    }
}