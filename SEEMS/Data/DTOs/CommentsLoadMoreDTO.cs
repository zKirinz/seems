namespace SEEMS.Data.DTOs;

public class CommentsLoadMoreDTO
{
    public string action { get; set; }
    public int? numberComments { get; set; }
    public int? lastCommentId { get; set; }
}