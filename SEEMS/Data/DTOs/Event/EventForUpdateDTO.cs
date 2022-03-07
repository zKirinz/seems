using SEEMS.Infrastructures.Commons;

using System.ComponentModel.DataAnnotations;

namespace SEEMS.Data.DTOs.Event
{
	public class EventForUpdateDTO
	{
		[Required]
		public string EventTitle { get; set; }
		[Required]
		public string EventDescription { get; set; }
		public string Location { get; set; }
	}
}
