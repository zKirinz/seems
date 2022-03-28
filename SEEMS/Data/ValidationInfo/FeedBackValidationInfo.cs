namespace SEEMS.Data.ValidationInfo;

public class FeedBackValidationInfo
{
    public const int MinimumContent = 1;
    public const int MaximumContent = 100;
    public const int MinimumRating = 1;
    public const int MaximumRating = 5;
    public string? Content { get; set; }
    public string? Rating { get; set; }
}