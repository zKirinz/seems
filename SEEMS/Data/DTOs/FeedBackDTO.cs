using System.ComponentModel.DataAnnotations;

namespace SEEMS.Data.DTOs
{
    public class FeedBackDTO
    {
        [StringLength(100)]
        public String Content { get; set; }
        public int EventId { get; set; }
        public int Rating { get; set; }
    }
}
