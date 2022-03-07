using SEEMS.Data.Entities;
using SEEMS.Data.Models;
using SEEMS.Infrastructures.Commons;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SEEMS.Models
{
	public class Event : AbstractEntity<int>
	{
		[StringLength(100)]
		public string EventTitle { get; set; }

		[StringLength(2000)]
		public string EventDescription { get; set; }

		[Required]
		public OrganizationEnum OrganizationName { get; set; }

		[Required(ErrorMessage = "Participant num is required")]
		public int ParticipantNum { get; set; }

		public bool IsPrivate { get; set; }

		[StringLength(255)]
		public string ImageUrl { get; set; }

		public bool Active { get; set; }

		public string Location { get; set; }

		public DateTime StartDate { get; set; }

		public DateTime EndDate { get; set; }

		public DateTime RegistrationDeadline { get; set; }

		[JsonIgnore]
		public List<Reservation>? Reservations { get; set; }

		[JsonIgnore]
		public List<Comment>? Comments { get; set; }
	}
}
