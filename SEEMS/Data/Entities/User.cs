using System.ComponentModel;
using Microsoft.EntityFrameworkCore;

using SEEMS.Data.Entities;

using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using AutoMapper.Configuration.Annotations;

namespace SEEMS.Data.Models
{
	[Index(nameof(Email), IsUnique = true)]
	public class User : AbstractEntity<int>
	{
		[JsonIgnore]
		[ForeignKey("Organization"), DefaultValue(0)]
		public int OrganizationId { get; set; }
		public string Email { get; internal set; }
		public string UserName { get; internal set; }

		public string ImageUrl { get; set; }

		public bool Active { get; set; }
        public Organization Organization { get; set; }
    }
}
