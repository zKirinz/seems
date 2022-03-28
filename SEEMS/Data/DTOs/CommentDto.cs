namespace SEEMS.DTOs;

public class CommentDTO
{
    public int? Id { get; set; }
    public int? EventId { get; set; }
    public int? NumberReplyComment { get; set; }
    public int? NumberLikeComment { get; set; }
    public string? CommentContent { get; set; }
    public int? ParentCommentId { get; set; }
    public string? ImageUrl { get; set; }
    public string? UserName { get; set; }
    public string? Email { get; set; }
    public bool? IsLike { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime? ModifiedAt { get; set; }
}