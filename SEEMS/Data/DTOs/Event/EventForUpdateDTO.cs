using SEEMS.Infrastructures.Commons;

using System.ComponentModel.DataAnnotations;

namespace SEEMS.Data.DTOs.Event
{
	public class EventForUpdateDTO
	{
		public string? EventTitle { get; set; }
		public string? EventDescription { get; set; }
		public string? Location { get; set; }
		public string? ImageUrl { get; set; }
	}
}
