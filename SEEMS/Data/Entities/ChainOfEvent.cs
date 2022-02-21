using SEEMS.Data.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using SEEMS.Data.Models;

namespace SEEMS.Models
{
    [Index(nameof(CategoryName), IsUnique = true)]
    public class ChainOfEvent : AbstractEntity<int>
    {
        [StringLength(100)]
        public String CategoryName { get; set; }

        [StringLength(255)]
        public String? ImageUrl { get; set; }
        
        [ForeignKey("User")]
        public int? CreatedBy { get; set; }
        
        [JsonIgnore]
        public User? User { get; set; }

        [JsonIgnore]
        public List<Event>? Events { get; set; }

    }
}