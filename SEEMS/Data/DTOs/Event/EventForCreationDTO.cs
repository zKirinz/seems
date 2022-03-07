using SEEMS.Infrastructures.Commons;

using System.ComponentModel.DataAnnotations;

namespace SEEMS.Data.DTOs.Event
{
	public class EventForCreationDTO
	{
		[Required]
		public string EventTitle { get; set; }
		[Required]
		public string EventDescription { get; set; }
		public int ParticipantNum { get; set; }
		public string Organization { get; set; }
		[Required]
		public bool IsPrivate { get; set; }
		[Required]
		public string ImageUrl { get; set; }
		[Required]
		public bool Active { get; set; }
		[Required]
		public string Location { get; set; }
		[Required]
		public DateTime StartDate { get; set; }
		[Required]
		public DateTime EndDate { get; set; }
		public DateTime? RegisterDeadline { get; set; }
	}
}
