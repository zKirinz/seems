using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using SEEMS.Infrastructures.Commons;
using SEEMS.Models;
using SEEMS.Services.Utils;

using System.Diagnostics;

namespace SEEMS.Database.Configurations
{
	public class EventConfiguration : IEntityTypeConfiguration<Event>
	{
		public void Configure(EntityTypeBuilder<Event> builder)
		{
			List<Event> events = new List<Event>();
			var chainOfEventTechTalkId = -1;
			var orgId = -3;
			//tech talk
			events.Add(new Event() { EventTitle = "Tech Talk with Harry Potter", EventDescription = "If Harry Potter is a developer", Active = true, Organization = OrganizationEnum.FPTU, EndDate = new DateTime(2022, 5, 12), ImageUrl = "http://media.vietq.vn/files/dinhthuy/phuongkhanh/harry-potter-cau-be-phu-thuy-tro-lai.jpg", IsPrivate = false, Location = "Hogwarts", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "Tech Talk with Cristiano Ronaldo", EventDescription = "If Ronaldo's passion is coding, not playing soccer", Active = true, Organization = OrganizationEnum.FPTU, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://cdn.justjared.com/wp-content/uploads/2013/12/ronaldo-toy/cristiano-ronaldo-one-toy-one-hope-charity-event-13.jpg", IsPrivate = false, Location = "Room 202 FPT", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "Tech Talk with Doctor Strange", EventDescription = "If Doctor Strange is a wizard and hacker at the same time ", Active = true, Organization = OrganizationEnum.FPTU, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b2/Doctor_Strange_MoM_Profile.jpeg/revision/latest?cb=20211229010907", IsPrivate = false, Location = "Wakanda", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "Tech Talk with Charlie Puth", EventDescription = "If Charlie Puth write song just for developers", Active = true, Organization = OrganizationEnum.FPTU, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://cuoifly.tuoitre.vn/820/0/ttc/r/2022/01/22/charlie-puth1-1642866050.jpeg", IsPrivate = false, Location = "Australia", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "Tech Talk with Monkey D. Luffy", EventDescription = "If Luffy become data scienctist after got One Piece", Active = true, Organization = OrganizationEnum.FPTU, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://gamek.mediacdn.vn/133514250583805952/2021/1/31/luffy-ace-merrry-16120917700922018336714.jpg", IsPrivate = false, Location = "Grand Line", StartDate = new DateTime(2022, 1, 1) });

			//other events
			events.Add(new Event() { EventTitle = "Datanova", EventDescription = "Datanova is a virtual conference dedicated to helping data professionals quickly unlock the value in their data and accelerate analytics.", Active = true, Organization = OrganizationEnum.FPTU, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://logos.flamingtext.com/Word-Logos/seems-design-fluffy-name.png", IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "MWC 2022", EventDescription = "The world's largest mobile technology will take place in Barcelona once again this year, despite a surge in Omicron cases.", Active = true, Organization = OrganizationEnum.FPTU, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://logos.flamingtext.com/Word-Logos/seems-design-fluffy-name.png", IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "Bett 2022", EventDescription = "Last year, due to a steep rise in coronavirus cases in the UK, particularly in the capital, organizers took the decision to call off Bett2021. But this year, Bett returns to the ExCeL!", Active = true, Organization = OrganizationEnum.FPTU, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://logos.flamingtext.com/Word-Logos/seems-design-fluffy-name.png", IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "Datacloud Global Congress", EventDescription = "Datacloud Global Congress attracts circa 2,000 executives from the data centre and cloud industries, and not just because of the location.", Active = true, Organization = OrganizationEnum.FPTU, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://logos.flamingtext.com/Word-Logos/seems-design-fluffy-name.png", IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "Technology & Services World", EventDescription = "Technology & Services World (TSW) is an immersive virtual and in-person learning and networking experience, held by The Technology & Services Industry Association (TSIA).", Active = true, Organization = OrganizationEnum.FPTU, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://logos.flamingtext.com/Word-Logos/seems-design-fluffy-name.png", IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "Running Remote 2022", EventDescription = "Running Remote is one of few tech conferences dedicated to optimizing the world of remote work - and it's more relevant now than ever.", Active = true, Organization = OrganizationEnum.FPTU, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://logos.flamingtext.com/Word-Logos/seems-design-fluffy-name.png", IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "Computex 2022", EventDescription = "Why attend? The focus of Computex 2022 will be on innovative computing, accelerating intelligence, digital resilience, connected X-Experience, innovations and startups, and sustainability. Expect big announcement from Intel, AMD, Nvidia and the other semiconductor giants.", Active = true, Organization = OrganizationEnum.FPTU, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://logos.flamingtext.com/Word-Logos/seems-design-fluffy-name.png", IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "RSA Conference 2022", EventDescription = "Why attend? Hear from industry leaders on how to place resilience at the forefront of your cyber strategy and prepare for security challenges of the new normal.", Active = true, Organization = OrganizationEnum.FPTU, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://logos.flamingtext.com/Word-Logos/seems-design-fluffy-name.png", IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "London Tech Week", EventDescription = "London Tech Week is a week-long celebration of technology innovation, housing various different technology-specific shows.", Active = true, Organization = OrganizationEnum.FPTU, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://logos.flamingtext.com/Word-Logos/seems-design-fluffy-name.png", IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });
			events.Add(new Event() { EventTitle = "Dublin Tech Summit", EventDescription = "Why attend? Hear from 200+ speakers and connect with 8,000 fellow attendees from 60+ countries. There will be more than 80 conference sessions across four stages, covering topics such as space tech, emerging tech, growth and much more!", Active = true, Organization = OrganizationEnum.FPTU, EndDate = new DateTime(2022, 5, 12), ImageUrl = "https://logos.flamingtext.com/Word-Logos/seems-design-fluffy-name.png", IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });

			//just seed 
			for(int i = 1; i <= 30; i++)
			{
				events.Add(new Event() { EventTitle = $"Seed Event {i}", EventDescription = "Just for seeding purpose", Active = true, Organization = OrganizationEnum.FPTer, EndDate = new DateTime(2022, 5, i), ImageUrl = "https://fontesk.com/wp-content/uploads/2020/07/seeds.jpg", IsPrivate = true, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1) });
			}
			int idSeed = -1;
			var enums = Enum.GetValues(typeof(OrganizationEnum));
			foreach(var item in events)
			{
				item.Organization = (OrganizationEnum) enums.GetValue(new Random().Next(enums.Length));
				item.StartDate = new DateTime(2022, new Random().Next(2, 8), new Random().Next(1, 28));
				item.EndDate = item.StartDate.AddDays(new Random().Next(2, 31));
				item.Id = idSeed--;
			}
			builder.HasData(events);
		}
	}
}
