namespace SEEMS.Data.ValidationInfo;

public class EventValidationInfo
{
    public const int MinTitleLength = 5;
    public const int MaxTitleLength = 100;
    public const int MinDescriptionLength = 20;
    public const int MaxDescriptionLength = 2000;
    public const int MinPrice = 1000;
    public const int MinLocationLength = 5;
    public const int MaxLocationLength = 50;
    public const int MinDayBeforeStarted = 1;
    public const int MinHoursOfEvent = 1;
    public const int MinHoursRegistrationFromStart = 6;
    public const int MinHoursRegistrationFromNow = 12;

    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Location { get; set; }
    public string? StartDate { get; set; }
    public string? EndDate { get; set; }
    public string? RegistrationDeadline { get; set; }
}