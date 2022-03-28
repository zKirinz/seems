using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SEEMS.Models;

namespace SEEMS.Database.Configurations;

public class UserMetaConfiguration : IEntityTypeConfiguration<UserMeta>
{
    public void Configure(EntityTypeBuilder<UserMeta> builder)
    {
        var userMetas = new List<UserMeta>();
        for (var i = -1; i >= -5; i--)
            userMetas.Add(new UserMeta
            {
                Id = i,
                MetaKey = "role",
                MetaValue = "Admin",
                UserId = i
            });

        //5 admin fptu
        for (var i = 6; i <= 10; i++)
            userMetas.Add(new UserMeta
            {
                Id = -i,
                MetaKey = "role",
                MetaValue = "Admin",
                UserId = -i
            });

        // 5 user fpter
        for (var i = 11; i <= 15; i++)
            userMetas.Add(new UserMeta
            {
                Id = -i,
                MetaKey = "role",
                MetaValue = "User",
                UserId = -i
            });

        //5 org dsc
        for (var i = 16; i <= 20; i++)
            userMetas.Add(new UserMeta
            {
                Id = -i,
                MetaKey = "role",
                MetaValue = "Organizer",
                UserId = -i
            });

        //5 org fcode
        for (var i = 21; i <= 25; i++)
            userMetas.Add(new UserMeta
            {
                Id = -i,
                MetaKey = "role",
                MetaValue = "Organizer",
                UserId = -i
            });
        builder.HasData(userMetas);
    }
}