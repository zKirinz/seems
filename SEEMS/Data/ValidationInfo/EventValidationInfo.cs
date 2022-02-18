namespace SEEMS.Data.ValidationInfo
{
	public class EventValidationInfo
	{
		public const int MinTitleLength = 5;
		public const int MaxTitleLength = 50;
		public const int MinDescriptionLength = 20;
		public const int MaxDescriptionLength = 2000;
		public const int MinPrice = 1000;
		public const int MinLocationLength = 5;
		public const int MaxLocationLength = 50;
		public const int MinDayBeforeStarted = 1;
		public const int MinMinutesOfEvent = 5;
		public string? Title { get; set; }
		public string? Description { get; set; }
		public string? ExpectPrice { get; set; }
		public string? Location { get; set; }
		public string? StartDate { get; set; }
		public string? EndDate { get; set; }
	}
}
