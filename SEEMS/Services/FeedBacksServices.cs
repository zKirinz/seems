using SEEMS.Data.ValidationInfo;

namespace SEEMS.Services;

public class FeedBacksServices
{
    public static FeedBackValidationInfo? CheckValidatedFeedBack(int rating, string content)
    {
        var feedBackValidation = new FeedBackValidationInfo();
        var failCheck = false;
        if (rating < FeedBackValidationInfo.MinimumRating || rating > FeedBackValidationInfo.MaximumRating)
        {
            feedBackValidation.Rating = "You have to rate quality before sending feedback";
            failCheck = true;
        }

        if (content.Length < FeedBackValidationInfo.MinimumContent ||
            content.Length > FeedBackValidationInfo.MaximumContent)
        {
            feedBackValidation.Content =
                $"Feedback must be from {FeedBackValidationInfo.MinimumContent} to {FeedBackValidationInfo.MaximumContent} characters";
            failCheck = true;
        }

        return failCheck ? feedBackValidation : null;
    }
}