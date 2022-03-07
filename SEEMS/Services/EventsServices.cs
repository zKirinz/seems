using SEEMS.Data.DTO;
using SEEMS.Data.DTOs.Event;
using SEEMS.Data.ValidationInfo;

namespace SEEMS.Services
{
	public class EventsServices
	{
		public static EventValidationInfo? GetValidatedEventInfo(EventDTO eventDTO)
		{
			EventValidationInfo validationInfo = new EventValidationInfo();
			bool failedCheck = false;

			validationInfo.Title = ValidationMessageGenerator.GetIntRangeValidateMsg("Event title", eventDTO.EventTitle.Length, EventValidationInfo.MinTitleLength, EventValidationInfo.MaxTitleLength);
			validationInfo.Description = ValidationMessageGenerator.GetIntRangeValidateMsg("Event description", eventDTO.EventDescription.Length,
				EventValidationInfo.MinDescriptionLength, EventValidationInfo.MaxDescriptionLength);
			validationInfo.Location = ValidationMessageGenerator.GetIntRangeValidateMsg("Event location", eventDTO.Location.Length,
				EventValidationInfo.MinLocationLength, EventValidationInfo.MaxLocationLength);

			if(validationInfo.Title != null || validationInfo.Location != null || validationInfo.Description != null)
			{
				failedCheck = true;
			}
			if(eventDTO.StartDate.Subtract(DateTime.Now).TotalDays <= EventValidationInfo.MinDayBeforeStarted)
			{
				failedCheck = true;
				validationInfo.StartDate = $"Start date must after current time at least {EventValidationInfo.MinDayBeforeStarted} days";
			}
			if(eventDTO.EndDate.Subtract(eventDTO.StartDate).TotalMinutes < EventValidationInfo.MinMinutesOfEvent)
			{
				failedCheck = true;
				validationInfo.EndDate = $"End time must after start time at least {EventValidationInfo.MinMinutesOfEvent} minutes";

			}
			if(eventDTO.RegistrationDeadline != null && (eventDTO.StartDate.Subtract((DateTime) eventDTO.RegistrationDeadline).TotalHours < EventValidationInfo.MinHoursRegistrationFromStart || ((DateTime) eventDTO.RegistrationDeadline).Subtract(DateTime.Now.AddHours(7)).TotalHours < EventValidationInfo.MinHoursRegistrationFromNow))
			{
				failedCheck = true;
				validationInfo.RegistrationDeadline = $"Registration deadline must before start date at least {EventValidationInfo.MinHoursRegistrationFromStart} hours and after now at least {EventValidationInfo.MinHoursRegistrationFromNow} hours";
			}
			return failedCheck ? validationInfo : null;
		}

		public static EventValidationInfo? GetValidatedEventInfo(EventForUpdateDTO eventDTO)
		{
			EventValidationInfo validationInfo = new EventValidationInfo();
			bool failedCheck = false;

			validationInfo.Title = ValidationMessageGenerator.GetIntRangeValidateMsg("Event title", eventDTO.EventTitle.Length, EventValidationInfo.MinTitleLength, EventValidationInfo.MaxTitleLength);
			validationInfo.Description = ValidationMessageGenerator.GetIntRangeValidateMsg("Event description", eventDTO.EventDescription.Length,
				EventValidationInfo.MinDescriptionLength, EventValidationInfo.MaxDescriptionLength);
			validationInfo.Location = ValidationMessageGenerator.GetIntRangeValidateMsg("Event location", eventDTO.Location.Length,
				EventValidationInfo.MinLocationLength, EventValidationInfo.MaxLocationLength);
			if(validationInfo.Title != null || validationInfo.Location != null || validationInfo.Description != null)
			{
				failedCheck = true;
			}
			return failedCheck ? validationInfo : null;
		}
	}
}
