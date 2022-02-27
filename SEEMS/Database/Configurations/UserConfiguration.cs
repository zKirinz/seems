using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using SEEMS.Data.Models;

using System.Security.Cryptography;

namespace SEEMS.Database.Configurations
{
	public class UserConfiguration : IEntityTypeConfiguration<User>
	{
		public void Configure( EntityTypeBuilder<User> builder )
		{
			const int FPTUOrgId = -3;
			const int FPTErOrgId = -4;
			List<User> listUsers = new();
			listUsers.Add(new User() { Id = -1, Email = "thinhltse151082@fpt.edu.vn", OrganizationId = FPTUOrgId, UserName = "Le Tien Thinh (K15 HCM)", ImageUrl = "https://lh3.googleusercontent.com/a/AATXAJyyQqWunLakO_S0SuQXM-BFY9gBLJUZEkUML-Wy=s96-c", Active = true });
			listUsers.Add(new User() { Id = -2, Email = "phatdgse140409@fpt.edu.vn", OrganizationId = FPTUOrgId, UserName = "Duong Gia Phat (K14 HCM)", ImageUrl = "https://lh3.googleusercontent.com/a/AATXAJyyQqWunLakO_S0SuQXM-BFY9gBLJUZEkUML-Wy=s96-c", Active = true });
			listUsers.Add(new User() { Id = -3, Email = "kienttse151340@fpt.edu.vn", OrganizationId = FPTUOrgId, UserName = "Tran Trung Kien (K15 HCM)", ImageUrl = "https://lh3.googleusercontent.com/a/AATXAJyyQqWunLakO_S0SuQXM-BFY9gBLJUZEkUML-Wy=s96-c", Active = true });
			listUsers.Add(new User() { Id = -4, Email = "nguyennkse140132@fpt.edu.vn", OrganizationId = FPTUOrgId, UserName = "Nguyen Khoi Nguyen (K13 HCM)", ImageUrl = "https://lh3.googleusercontent.com/a/AATXAJyyQqWunLakO_S0SuQXM-BFY9gBLJUZEkUML-Wy=s96-c", Active = true });
			listUsers.Add(new User() { Id = -5, Email = "hienbtse150763@fpt.edu.vn", OrganizationId = FPTUOrgId, UserName = "Bui The Hien (K15 HCM)", ImageUrl = "https://lh3.googleusercontent.com/a/AATXAJyyQqWunLakO_S0SuQXM-BFY9gBLJUZEkUML-Wy=s96-c", Active = true });
			for (int i = 6; i <= 21; i++)
			{
				listUsers.Add(new User()
				{
					Id = -i,
					Email = $"fpter{i}@fpt.edu.vn",
					Active = true,
					OrganizationId = FPTErOrgId,
					ImageUrl = "https://lh3.googleusercontent.com/a/AATXAJyyQqWunLakO_S0SuQXM-BFY9gBLJUZEkUML-Wy=s96-c",
					UserName = $"Anonymous {i}"
				});
			}

			builder.HasData(listUsers);
		}
	}
}
