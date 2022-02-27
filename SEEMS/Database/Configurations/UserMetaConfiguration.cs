using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using SEEMS.Models;

namespace SEEMS.Database.Configurations
{
	public class UserMetaConfiguration : IEntityTypeConfiguration<UserMeta>
	{
		public void Configure( EntityTypeBuilder<UserMeta> builder )
		{
			var userMetas = new List<UserMeta>();
			for (int i = -1; i > -5; i--)
			{
				userMetas.Add(new UserMeta()
				{
					Id = i,
					MetaKey = "role",
					MetaValue = "Organizer",
					UserId = i,
				});
			}
			builder.HasData(userMetas);
		}
	}
}
