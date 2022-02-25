using SEEMS.Models;

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SEEMS.Data.Entities
{
	public class Organization : AbstractEntity<int>
	{
		[StringLength(50)]
		public string Name { get; set; }

		[StringLength(2000)]
		public string Description { get; set; }
		[JsonIgnore()]
		public List<Event>? Events { get; set; }
	}
}
