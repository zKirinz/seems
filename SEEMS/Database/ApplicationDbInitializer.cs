using Microsoft.EntityFrameworkCore;

using SEEMS.Contexts;
using SEEMS.Data.Entities;
using SEEMS.Data.Models;
using SEEMS.Models;
using SEEMS.Services.Utils;

namespace SEEMS.Database
{
	public static class ApplicationDbInitializer
	{
		public static void Initialize( IServiceProvider serviceProvider )
		{
			using (var context = new ApplicationDbContext(
				serviceProvider.GetRequiredService<
					DbContextOptions<ApplicationDbContext>>()))
			{
				context.Database.EnsureCreated();
				SeedOrganization(context);
				SeedUser(context);
				SeedUserMeta(context);
				SeedChainOfEvent(context);
				SeedEvent(context);

				context.SaveChanges();
			}
		}

		public static void SeedOrganization( ApplicationDbContext ctx )
		{
			if (ctx.Organizations.Any())
			{
				return;
			}
			List<Organization> organizations = new List<Organization>();
			organizations.Add(new Organization() { Id = -1, Name = "F-Code", Description = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)." });
			organizations.Add(new Organization() { Id = -2, Name = "DSC", Description = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)." });
			organizations.Add(new Organization() { Id = -3, Name = "FPTU", Description = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)." });
			organizations.Add(new Organization() { Id = -4, Name = "FPTer", Description = "Other user in our system" });
			foreach (var item in organizations)
			{
				ctx.Organizations.Add(item);
			}
			ctx.SaveChanges();
		}

		public static void SeedUser( ApplicationDbContext ctx )
		{
			List<User> users = new List<User>();
			var orgId = ctx.Organizations.FirstOrDefault(o => o.Name.Equals("FPTU")).Id;
			users.Add(new User() { Email = "thinhltse151082@fpt.edu.vn", OrganizationId = orgId, UserName = "Le Tien Thinh (K15 HCM)", ImageUrl = "https://lh3.googleusercontent.com/a/AATXAJyyQqWunLakO_S0SuQXM-BFY9gBLJUZEkUML-Wy=s96-c", Active = true });
			users.Add(new User() { Email = "phatdgse140409@fpt.edu.vn", OrganizationId = orgId, UserName = "Duong Gia Phat (K14 HCM)", ImageUrl = "https://lh3.googleusercontent.com/a/AATXAJyyQqWunLakO_S0SuQXM-BFY9gBLJUZEkUML-Wy=s96-c", Active = true });
			users.Add(new User() { Email = "kienttse151340@fpt.edu.vn", OrganizationId = orgId, UserName = "Tran Trung Kien (K15 HCM)", ImageUrl = "https://lh3.googleusercontent.com/a/AATXAJyyQqWunLakO_S0SuQXM-BFY9gBLJUZEkUML-Wy=s96-c", Active = true });
			users.Add(new User() { Email = "nguyennkse140132@fpt.edu.vn", OrganizationId = orgId, UserName = "Nguyen Khoi Nguyen (K13 HCM)", ImageUrl = "https://lh3.googleusercontent.com/a/AATXAJyyQqWunLakO_S0SuQXM-BFY9gBLJUZEkUML-Wy=s96-c", Active = true });
			users.Add(new User() { Email = "hienbtse150763@fpt.edu.vn", OrganizationId = orgId, UserName = "Bui The Hien (K15 HCM)", ImageUrl = "https://lh3.googleusercontent.com/a/AATXAJyyQqWunLakO_S0SuQXM-BFY9gBLJUZEkUML-Wy=s96-c", Active = true });

			//Add 5 FPTU Admin
			for (int i = 1; i <= 5; i++)
			{
				users.Add(new User() { Email = $"fptu{-i}@fpt.edu.vn", OrganizationId = -3, UserName = $"Anonymous {-i}", ImageUrl = "https://lh3.googleusercontent.com/a/AATXAJyyQqWunLakO_S0SuQXM-BFY9gBLJUZEkUML-Wy=s96-c", Active = true });
			}

			var tmpUserList = ctx.Users.ToList();
			foreach (var item in users)
			{
				if (!tmpUserList.Contains(item, new UserEqualityComparer()))
				{
					ctx.Users.Add(item);
				}
			}
			ctx.SaveChanges();
		}

		public static void SeedUserMeta( ApplicationDbContext ctx )
		{
			List<UserMeta> userMetas = new List<UserMeta>();
			List<int> userIds = ctx.Users.Select(x => x.Id).ToList();
			var tmpUserMetaList = ctx.UserMetas.ToList();
			foreach (int id in userIds)
			{
				userMetas.Add(new UserMeta() { MetaKey = "role", MetaValue = "Organizer", UserId = id });
			}
			int kienId = ctx.Users.FirstOrDefault(u => u.Email.Contains("kientt")).Id;

			//Add 5 FPTU Admin
			for (int i = 1; i <= 5; i++)
			{
				userMetas.Add(new UserMeta() { MetaKey = "role", MetaValue = "Admin", UserId = -i });
			}

			tmpUserMetaList.FirstOrDefault(um => um.UserId == kienId).MetaValue = "Admin";
			foreach (var i in userMetas)
			{
				if (!tmpUserMetaList.Contains(i, new UserMetaEqualityComparer()))
					ctx.UserMetas.Add(i);
			}
		}

		public static void SeedChainOfEvent( ApplicationDbContext ctx )
		{
			List<ChainOfEvent> chainOfEvents = new List<ChainOfEvent>();
			chainOfEvents.Add(new ChainOfEvent() { CategoryName = "Tech Talk", CreatedBy = 1, ImageUrl = "https://www.sunymaritime.edu/sites/default/files/styles/medium_625px_by_410px_scale/public/2018-02/tech_talks_logo_color_preview.jpeg?itok=bEG5QRwk" });
			chainOfEvents.Add(new ChainOfEvent() { CategoryName = "Geek Up", CreatedBy = 1, ImageUrl = "https://cdn1.vieclam24h.vn/upload/files_cua_nguoi_dung/logo/2015/09/09/1441773091_%5E079515115030007874230BE89E3605979527B615B34530EE5B%5Epimgpsh_fullsize_distr.jpg" });
			chainOfEvents.Add(new ChainOfEvent() { CategoryName = "Duong len dinh Olympia", CreatedBy = 1, ImageUrl = "https://upload.wikimedia.org/wikipedia/vi/2/26/H%C3%ACnh_hi%E1%BB%87u_%C4%90%C6%B0%E1%BB%9Dng_L%C3%AAn_%C4%90%E1%BB%89nh_Olympia_VTV.png" });
			var tmpList = ctx.ChainOfEvents.ToList();
			foreach (var i in chainOfEvents)
			{
				if (!tmpList.Contains(i, new ChainOfEventEqualityComparer()))
					ctx.ChainOfEvents.Add(i);
			}
			ctx.SaveChanges();
		}

		public static void SeedEvent( ApplicationDbContext ctx )
		{
			List<Event> events = new List<Event>();
			var chainOfEventTechTalkId = ctx.ChainOfEvents.FirstOrDefault(e => e.CategoryName.Contains("Tech Talk")).Id;

			//tech talk
			events.Add(new Event() { EventTitle = "Tech Talk with Harry Potter", EventDescription = "If Harry Potter is a developer", Active = true, ChainOfEventId = chainOfEventTechTalkId, OrganizationId = 1, EndDate = new DateTime(2022, 5, 12), ImageUrl = "http://media.vietq.vn/files/dinhthuy/phuongkhanh/harry-potter-cau-be-phu-thuy-tro-lai.jpg", IsPrivate = false, Location = "Hogwarts", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "Tech Talk with Cristiano Ronaldo", EventDescription = "If Ronaldo's passion is coding, not playing soccer", Active = true, ChainOfEventId = chainOfEventTechTalkId, OrganizationId = 1, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://cdn.justjared.com/wp-content/uploads/2013/12/ronaldo-toy/cristiano-ronaldo-one-toy-one-hope-charity-event-13.jpg", IsPrivate = false, Location = "Room 202 FPT", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "Tech Talk with Doctor Strange", EventDescription = "If Doctor Strange is a wizard and hacker at the same time ", Active = true, ChainOfEventId = chainOfEventTechTalkId, OrganizationId = 1, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b2/Doctor_Strange_MoM_Profile.jpeg/revision/latest?cb=20211229010907", IsPrivate = false, Location = "Wakanda", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "Tech Talk with Charlie Puth", EventDescription = "If Charlie Puth write song just for developers", Active = true, ChainOfEventId = chainOfEventTechTalkId, OrganizationId = 5, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://cuoifly.tuoitre.vn/820/0/ttc/r/2022/01/22/charlie-puth1-1642866050.jpeg", IsPrivate = false, Location = "Australia", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "Tech Talk with Monkey D. Luffy", EventDescription = "If Luffy become data scienctist after got One Piece", Active = true, ChainOfEventId = chainOfEventTechTalkId, OrganizationId = 4, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://gamek.mediacdn.vn/133514250583805952/2021/1/31/luffy-ace-merrry-16120917700922018336714.jpg", IsPrivate = false, Location = "Grand Line", StartDate = new DateTime(2022, 1, 1) });

			//other events
			events.Add(new Event() { EventTitle = "Datanova", EventDescription = "Datanova is a virtual conference dedicated to helping data professionals quickly unlock the value in their data and accelerate analytics.", Active = true, OrganizationId = 3, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://logos.flamingtext.com/Word-Logos/seems-design-fluffy-name.png", IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "MWC 2022", EventDescription = "The world's largest mobile technology will take place in Barcelona once again this year, despite a surge in Omicron cases.", Active = true, OrganizationId = 1, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://logos.flamingtext.com/Word-Logos/seems-design-fluffy-name.png", IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "Bett 2022", EventDescription = "Last year, due to a steep rise in coronavirus cases in the UK, particularly in the capital, organizers took the decision to call off Bett2021. But this year, Bett returns to the ExCeL!", Active = true, OrganizationId = 1, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://logos.flamingtext.com/Word-Logos/seems-design-fluffy-name.png", IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "Datacloud Global Congress", EventDescription = "Datacloud Global Congress attracts circa 2,000 executives from the data centre and cloud industries, and not just because of the location.", Active = true, OrganizationId = 3, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://logos.flamingtext.com/Word-Logos/seems-design-fluffy-name.png", IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "Technology & Services World", EventDescription = "Technology & Services World (TSW) is an immersive virtual and in-person learning and networking experience, held by The Technology & Services Industry Association (TSIA).", Active = true, OrganizationId = 3, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://logos.flamingtext.com/Word-Logos/seems-design-fluffy-name.png", IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "Running Remote 2022", EventDescription = "Running Remote is one of few tech conferences dedicated to optimizing the world of remote work - and it's more relevant now than ever.", Active = true, OrganizationId = 3, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://logos.flamingtext.com/Word-Logos/seems-design-fluffy-name.png", IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "Computex 2022", EventDescription = "Why attend? The focus of Computex 2022 will be on innovative computing, accelerating intelligence, digital resilience, connected X-Experience, innovations and startups, and sustainability. Expect big announcement from Intel, AMD, Nvidia and the other semiconductor giants.", Active = true, OrganizationId = 2, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://logos.flamingtext.com/Word-Logos/seems-design-fluffy-name.png", IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "RSA Conference 2022", EventDescription = "Why attend? Hear from industry leaders on how to place resilience at the forefront of your cyber strategy and prepare for security challenges of the new normal.", Active = true, OrganizationId = 1, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://logos.flamingtext.com/Word-Logos/seems-design-fluffy-name.png", IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "London Tech Week", EventDescription = "London Tech Week is a week-long celebration of technology innovation, housing various different technology-specific shows.", Active = true, OrganizationId = 2, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://logos.flamingtext.com/Word-Logos/seems-design-fluffy-name.png", IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "Dublin Tech Summit", EventDescription = "Why attend? Hear from 200+ speakers and connect with 8,000 fellow attendees from 60+ countries. There will be more than 80 conference sessions across four stages, covering topics such as space tech, emerging tech, growth and much more!", Active = true, OrganizationId = 2, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://logos.flamingtext.com/Word-Logos/seems-design-fluffy-name.png", IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });

			//just seed 
			for (int i = 1; i <= 30; i++)
			{
				events.Add(new Event() { EventTitle = $"Seed Event {i}", EventDescription = "Just for seeding purpose", Active = true, OrganizationId = 1, EndDate = new DateTime(2022, 5, i), ImageUrl = "https://fontesk.com/wp-content/uploads/2020/07/seeds.jpg", IsPrivate = true, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });
			}
			var tmpList = ctx.Events.ToList();
			foreach (var item in events)
			{
				if (!tmpList.Contains(item, new EventEqualityComparer()))
				{
					item.OrganizationId = new Random().Next(1, 4);
					item.StartDate = new DateTime(2022, new Random().Next(2, 7), new Random().Next(1, 28));
					ctx.Events.Add(item);
				}
			}
		}
	}
}
