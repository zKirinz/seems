using System.ComponentModel.DataAnnotations;

namespace SEEMS.Data.DTOs;

public class FeedBackDTO
{
    [StringLength(100)] public string Content { get; set; }

    public int EventId { get; set; }
    public int Rating { get; set; }
}