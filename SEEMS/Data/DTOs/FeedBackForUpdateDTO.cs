using System.ComponentModel.DataAnnotations;

namespace SEEMS.Data.DTOs;

public class FeedBackForUpdateDTO
{
    public int FeedBackId { get; set; }
    public int Rating { get; set; }

    [StringLength(100)] public string Content { get; set; }
}