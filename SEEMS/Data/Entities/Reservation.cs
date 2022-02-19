using SEEMS.Data.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using SEEMS.Data.Models;

namespace SEEMS.Models
{
    public class Reservation : AbstractEntity<int>
    {
        public bool Attend { get; set; }

        [ForeignKey("Event")]
        public int EventId { get; set; }

        [JsonIgnore]
        public Event Event { get; set; }

        [JsonIgnore]
        public List<FeedBack> FeedBacks { get; set; }

    }
}
