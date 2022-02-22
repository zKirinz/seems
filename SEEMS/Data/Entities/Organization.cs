using System.ComponentModel.DataAnnotations;

namespace SEEMS.Data.Entities
{
	public class Organization : AbstractEntity<int>
	{
		[StringLength(50)]
		public string Name { get; set; }

		[StringLength(5)]
		public string ShortName { get; set; }

		[StringLength(2000)]
		public string Description { get; set; }
	}
}
