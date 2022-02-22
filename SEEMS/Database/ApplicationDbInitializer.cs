using Microsoft.EntityFrameworkCore;

using SEEMS.Contexts;
using SEEMS.Data.Models;
using SEEMS.Models;

namespace SEEMS.Database
{
	public static class ApplicationDbInitializer
	{
		public static void Initialize(IServiceProvider serviceProvider)
		{
			using (var context = new ApplicationDbContext(
				serviceProvider.GetRequiredService<
					DbContextOptions<ApplicationDbContext>>()))
			{
				context.Database.EnsureCreated();
				SeedUser(context);
				SeedUserMeta(context);
				SeedChainOfEvent(context);
				SeedEvent(context);

				context.SaveChanges();
			}
		}

		public static async void SeedUser(ApplicationDbContext ctx)
		{
			if (ctx.Users.Any())
			{
				return;   // DB has been seeded
			}
			List<User> users = new List<User>();
			users.Add(new User() { Email = "thinhltse151082@fpt.edu.vn", UserName = "Le Tien Thinh (K15 HCM)", ImageUrl = "https://lh3.googleusercontent.com/a/AATXAJyyQqWunLakO_S0SuQXM-BFY9gBLJUZEkUML-Wy=s96-c", Active = true });
			users.Add(new User() { Email = "phatdgse140409@fpt.edu.vn", UserName = "Duong Gia Phat (K14 HCM)", ImageUrl = "https://lh3.googleusercontent.com/a/AATXAJyyQqWunLakO_S0SuQXM-BFY9gBLJUZEkUML-Wy=s96-c", Active = true });
			users.Add(new User() { Email = "kienttse151340@fptu.edu.vn", UserName = "Tran Trung Kien (K15 HCM)", ImageUrl = "https://lh3.googleusercontent.com/a/AATXAJyyQqWunLakO_S0SuQXM-BFY9gBLJUZEkUML-Wy=s96-c", Active = true });
			users.Add(new User() { Email = "nguyennkse140132@fpt.edu.vn", UserName = "Nguyen Khoi Nguyen (K13 HCM)", ImageUrl = "https://lh3.googleusercontent.com/a/AATXAJyyQqWunLakO_S0SuQXM-BFY9gBLJUZEkUML-Wy=s96-c", Active = true });
			users.Add(new User() { Email = "hienbtse150763@fpt.edu.vn", UserName = "Bui The Hien (K15 HCM)", ImageUrl = "https://lh3.googleusercontent.com/a/AATXAJyyQqWunLakO_S0SuQXM-BFY9gBLJUZEkUML-Wy=s96-c", Active = true });
			foreach (var item in users)
			{
				ctx.Users.Add(item);
			}
			ctx.SaveChanges();
		}

		public static void SeedUserMeta(ApplicationDbContext ctx)
		{
			if (ctx.UserMetas.Any())
			{
				return;   // DB has been seeded
			}
			List<UserMeta> userMetas = new List<UserMeta>();
			List<int> userIds = ctx.Users.Select(x => x.Id).ToList();
			foreach (int id in userIds)
			{
				userMetas.Add(new UserMeta() { MetaKey = "role", MetaValue = "Organizer", UserId = id });
			}
			foreach (var i in userMetas)
			{
				ctx.UserMetas.Add(i);
			}
		}

		public static async void SeedChainOfEvent(ApplicationDbContext ctx)
		{
			if (ctx.ChainOfEvents.Any())
			{
				return;
			}
			List<ChainOfEvent> chainOfEvents = new List<ChainOfEvent>();
			chainOfEvents.Add(new ChainOfEvent() { CategoryName = "Tech Talk", CreatedBy = 1, ImageUrl = "https://www.sunymaritime.edu/sites/default/files/styles/medium_625px_by_410px_scale/public/2018-02/tech_talks_logo_color_preview.jpeg?itok=bEG5QRwk" });
			chainOfEvents.Add(new ChainOfEvent() { CategoryName = "Geek Up", CreatedBy = 1, ImageUrl = "https://cdn1.vieclam24h.vn/upload/files_cua_nguoi_dung/logo/2015/09/09/1441773091_%5E079515115030007874230BE89E3605979527B615B34530EE5B%5Epimgpsh_fullsize_distr.jpg" });
			chainOfEvents.Add(new ChainOfEvent() { CategoryName = "Duong len dinh Olympia", CreatedBy = 1, ImageUrl = "https://upload.wikimedia.org/wikipedia/vi/2/26/H%C3%ACnh_hi%E1%BB%87u_%C4%90%C6%B0%E1%BB%9Dng_L%C3%AAn_%C4%90%E1%BB%89nh_Olympia_VTV.png" });

			foreach (var i in chainOfEvents)
			{
				ctx.ChainOfEvents.Add(i);
			}
			ctx.SaveChanges();
		}

		public static void SeedEvent(ApplicationDbContext ctx)
		{
			if (ctx.Events.Any())
			{
				return;
			}
			List<Event> events = new List<Event>();
			var chainOfEventTechTalkId = ctx.ChainOfEvents.FirstOrDefault(e => e.CategoryName.Contains("Tech Talk")).Id;

			//tech talk
			events.Add(new Event() { EventTitle = "Tech Talk with Harry Potter", EventDescription = "If Harry Potter is a developer", Active = true, ChainOfEventId = chainOfEventTechTalkId, ClientId = 1, EndDate = new DateTime(2022, 5, 12), ImageUrl = "http://media.vietq.vn/files/dinhthuy/phuongkhanh/harry-potter-cau-be-phu-thuy-tro-lai.jpg", IsPrivate = false, Location = "Hogwarts", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "Tech Talk with Cristiano Ronaldo", EventDescription = "If Ronaldo's passion is coding, not playing soccer", Active = true, ChainOfEventId = chainOfEventTechTalkId, ClientId = 1, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://cdn.justjared.com/wp-content/uploads/2013/12/ronaldo-toy/cristiano-ronaldo-one-toy-one-hope-charity-event-13.jpg", IsPrivate = false, Location = "Room 202 FPT", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "Tech Talk with Doctor Strange", EventDescription = "If Doctor Strange is a wizard and hacker at the same time ", Active = true, ChainOfEventId = chainOfEventTechTalkId, ClientId = 1, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b2/Doctor_Strange_MoM_Profile.jpeg/revision/latest?cb=20211229010907", IsPrivate = false, Location = "Wakanda", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "Tech Talk with Charlie Puth", EventDescription = "If Charlie Puth write song just for developers", Active = true, ChainOfEventId = chainOfEventTechTalkId, ClientId = 5, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://cuoifly.tuoitre.vn/820/0/ttc/r/2022/01/22/charlie-puth1-1642866050.jpeg", IsPrivate = false, Location = "Australia", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "Tech Talk with Monkey D. Luffy", EventDescription = "If Luffy become data scienctist after got One Piece", Active = true, ChainOfEventId = chainOfEventTechTalkId, ClientId = 4, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://gamek.mediacdn.vn/133514250583805952/2021/1/31/luffy-ace-merrry-16120917700922018336714.jpg", IsPrivate = false, Location = "Grand Line", StartDate = new DateTime(2022, 1, 1) });

			//other events
			events.Add(new Event() { EventTitle = "Datanova", EventDescription = "Datanova is a virtual conference dedicated to helping data professionals quickly unlock the value in their data and accelerate analytics.", Active = true, ClientId = 3, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://logos.flamingtext.com/Word-Logos/seems-design-fluffy-name.png", IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "MWC 2022", EventDescription = "The world's largest mobile technology will take place in Barcelona once again this year, despite a surge in Omicron cases.", Active = true, ClientId = 1, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://logos.flamingtext.com/Word-Logos/seems-design-fluffy-name.png", IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "Bett 2022", EventDescription = "Last year, due to a steep rise in coronavirus cases in the UK, particularly in the capital, organizers took the decision to call off Bett2021. But this year, Bett returns to the ExCeL!", Active = true, ClientId = 1, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://logos.flamingtext.com/Word-Logos/seems-design-fluffy-name.png", IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "Datacloud Global Congress", EventDescription = "Datacloud Global Congress attracts circa 2,000 executives from the data centre and cloud industries, and not just because of the location.", Active = true, ClientId = 3, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://logos.flamingtext.com/Word-Logos/seems-design-fluffy-name.png", IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "Technology & Services World", EventDescription = "Technology & Services World (TSW) is an immersive virtual and in-person learning and networking experience, held by The Technology & Services Industry Association (TSIA).", Active = true, ClientId = 3, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://logos.flamingtext.com/Word-Logos/seems-design-fluffy-name.png", IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "Running Remote 2022", EventDescription = "Running Remote is one of few tech conferences dedicated to optimizing the world of remote work - and it's more relevant now than ever.", Active = true, ClientId = 3, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://logos.flamingtext.com/Word-Logos/seems-design-fluffy-name.png", IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "Computex 2022", EventDescription = "Why attend? The focus of Computex 2022 will be on innovative computing, accelerating intelligence, digital resilience, connected X-Experience, innovations and startups, and sustainability. Expect big announcement from Intel, AMD, Nvidia and the other semiconductor giants.", Active = true, ClientId = 2, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://logos.flamingtext.com/Word-Logos/seems-design-fluffy-name.png", IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "RSA Conference 2022", EventDescription = "Why attend? Hear from industry leaders on how to place resilience at the forefront of your cyber strategy and prepare for security challenges of the new normal.", Active = true, ClientId = 1, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://logos.flamingtext.com/Word-Logos/seems-design-fluffy-name.png", IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "London Tech Week", EventDescription = "London Tech Week is a week-long celebration of technology innovation, housing various different technology-specific shows.", Active = true, ClientId = 2, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://logos.flamingtext.com/Word-Logos/seems-design-fluffy-name.png", IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "Dublin Tech Summit", EventDescription = "Why attend? Hear from 200+ speakers and connect with 8,000 fellow attendees from 60+ countries. There will be more than 80 conference sessions across four stages, covering topics such as space tech, emerging tech, growth and much more!", Active = true, ClientId = 2, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://logos.flamingtext.com/Word-Logos/seems-design-fluffy-name.png", IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });

			//just seed 
			for (int i = 1; i <= 30; i++)
			{
				events.Add(new Event() { EventTitle = $"Seed Event {i}", EventDescription = "Just for seeding purpose", Active = true, ClientId = 1, EndDate = new DateTime(2022, 5, i), ImageUrl = "https://fontesk.com/wp-content/uploads/2020/07/seeds.jpg", IsPrivate = true, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });
			}
			foreach (var item in events)
			{
				item.StartDate = new DateTime(2022, 2, 25);
				ctx.Events.Add(item);
			}
		}
	}
}
