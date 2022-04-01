namespace SEEMS.Data.DTOs;

public class ProfilePageDTO
{
    public string Email { get; set; }
    public string Username { get; set; }
    public string Role { get; set; }
    public string OrganizationName { get; set; }
    public string ImageURL { get; set; }
    public int? RegisteredEventsNum { get; set; }
    public int? NoFeedbackEventsNum { get; set; }
    public int? AbsentEventsNum { get; set; }
    public int? ConsecutiveAbsentEventsNum { get; set; }
    public int? FeedbackedEventsNum { get; set; }
    public int? RegisteredPendingEventsNum { get; set; }

    #region NonNormalUserField
    public int? HostedEventsNum { get; set; }
    public int? HostedFinishedEventsNum { get; set; }
    public int? TotalAttendedOnReceivedReservationsNum { get; set; }
    public int? TotalReceivedReservationsNum { get; set; }
    public int? TotalReceivedFeedbacks { get; set; }
    #endregion
}
