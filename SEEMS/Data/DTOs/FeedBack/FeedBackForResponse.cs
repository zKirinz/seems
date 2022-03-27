namespace SEEMS.Data.DTOs.FeedBack;

public class FeedBackForResponse
{
    public int Id { get; set; }
    public string Content { get; set; }
    public int rating { get; set; }
    public DateTime CreateAt { get; set; }
}