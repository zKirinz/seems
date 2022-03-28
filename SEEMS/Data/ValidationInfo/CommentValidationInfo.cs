namespace SEEMS.Data.ValidationInfo;

public class CommentValidationInfo
{
    public const int MinLengthCommentContent = 1;
    public const int MaxLengthCommentContent = 500;

    public string UserId { get; set; }
    public string EventId { get; set; }

    public string CommentContent { get; set; }
}