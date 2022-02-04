using SEEMS.Data.Entities;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SEEMS.Models
{
    public class ChainOfEvent : AbstractEntity<int>
    {
        [StringLength(20)]
        public String CategoryName { get; set; }

        [StringLength(255)]
        public String? ImageUrl { get; set; }

        [JsonIgnore]
        public List<Event> Events { get; set; }

    }
}