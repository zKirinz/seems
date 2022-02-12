using SEEMS.Data.DTO;
using SEEMS.Data.ValidationInfo;

namespace SEEMS.Services
{
	public class EventsServices
	{
		public static EventValidationInfo GetValidatedEventInfo(EventDTO eventDTO)
		{
			EventValidationInfo validationInfo = new EventValidationInfo();
			bool failedCheck = false;
			if (eventDTO.EventTitle.Length < EventValidationInfo.MinTitleLength ||
				eventDTO.EventTitle.Length > EventValidationInfo.MaxTitleLength)
			{
				failedCheck = true;
				validationInfo.Title = $"Event title must from {EventValidationInfo.MinTitleLength} to {EventValidationInfo.MaxTitleLength} length";
			}
			if (eventDTO.EventDescription.Length < EventValidationInfo.MinDescriptionLength ||
				eventDTO.EventDescription.Length > EventValidationInfo.MaxDescriptionLength)
			{
				failedCheck = true;
				validationInfo.Description = $"Event description must from {EventValidationInfo.MinDescriptionLength} to {EventValidationInfo.MaxDescriptionLength} length";
			}
			if (eventDTO.Location.Length < EventValidationInfo.MinLocationLength ||
				eventDTO.Location.Length > EventValidationInfo.MaxLocationLength)
			{
				failedCheck = true;
				validationInfo.Location = $"Event location must from {EventValidationInfo.MinLocationLength} to {EventValidationInfo.MaxLocationLength} length";
			}
			if (eventDTO.ExpectPrice < EventValidationInfo.MinPrice)
			{
				failedCheck = true;
				validationInfo.ExpectPrice = $"Price can not smaller than {EventValidationInfo.MinPrice}";
			}
			if (eventDTO.StartDate.Subtract(DateTime.Now).Days < EventValidationInfo.MinDayBeforeStarted)
			{
				failedCheck=true;
				validationInfo.StartDate = $"Start date must after current time at least {EventValidationInfo.MinDayBeforeStarted} days";
			}
			if (eventDTO.EndDate.Subtract(eventDTO.StartDate).Minutes < EventValidationInfo.MinMinutesOfEvent)
			{
				failedCheck = true;
				validationInfo.EndDate = $"End time must behind start time at least {EventValidationInfo.MinMinutesOfEvent} minutes";
			}
			return failedCheck ? validationInfo : null;
		}
	}
}
