
using SEEMS.Data.Entities;
using SEEMS.Data.Models;

using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SEEMS.Models
{
	public class UserMeta : AbstractEntity<int>
	{
		public string MetaKey { get; set; }

		public string MetaValue { get; set; }

		[ForeignKey("User")]
		public int UserId { get; set; }

		[JsonIgnore]
		public User? User { get; set; }
	}
}
