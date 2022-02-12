namespace SEEMS.Data.ValidationInfo
{
	public class EventValidationInfo
	{
		public const int MinTitleLength = 5;
		public const int MaxTitleLength = 50;
		public const int MinDescriptionLength = 20;
		public const int MaxDescriptionLength = 100;
		public const int MinPrice = 0;
		public const int MinLocationLength = 5;
		public const int MaxLocationLength = 50;
		public string Title { get; set; }
		public string Description { get; set; }
		public string ExpectPrice { get; set; }
		public string Location { get; set; }
		public string StartDate { get; set; }
		public string EndDate { get; set; }
	}
}
