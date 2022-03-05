using SEEMS.Data.Entities;
using SEEMS.Data.Models;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SEEMS.Models
{
	public class Event : AbstractEntity<int>
	{
		[StringLength(100)]
		public String EventTitle { get; set; }

		[StringLength(2000)]
		public String EventDescription { get; set; }

		[ForeignKey("Organization")]
		public int OrganizationId { get; set; }

		public bool IsPrivate { get; set; }

		[StringLength(255)]
		public String ImageUrl { get; set; }

		public bool Active { get; set; }

		public String Location { get; set; }

		public DateTime StartDate { get; set; }

		public DateTime EndDate { get; set; }


		[JsonIgnore]
		public List<Reservation>? Reservations { get; set; }

		[JsonIgnore]
		public List<Comment>? Comments { get; set; }
		public Organization? Organization { get; set; }

	}
}
