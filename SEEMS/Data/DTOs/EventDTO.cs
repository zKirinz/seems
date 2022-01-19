using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SEEMS.Data.DTO
{
    public class EventDTO
    {
        [Required]
        public string EventTitle { get; set; }

        public Guid? ClientId { get; set; }

        [Required]
        public string EventDescription { get; set; }

        [JsonIgnore]
        public int? ChainOfEventId { get; set; }
        [Required]
        public bool IsPrivate { get; set; }
        [Required]
        public String ImageUrl { get; set; }
        [Required]
        public decimal ExpectPrice { get; set; }
        [Required]
        public bool Active { get; set; }
        [Required]
        public string Location { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }

    }
}
