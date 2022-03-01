using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using SEEMS.Models;

namespace SEEMS.Database.Configurations
{
	public class ChainOfEventsConfiguration : IEntityTypeConfiguration<ChainOfEvent>
	{
		public void Configure(EntityTypeBuilder<ChainOfEvent> builder)
		{
			int FPTOrgId = -3;
			List<ChainOfEvent> chainOfEvents = new List<ChainOfEvent>();
			chainOfEvents.Add(new ChainOfEvent() { Id = -1, CategoryName = "Tech Talk", CreatedBy = FPTOrgId, ImageUrl = "https://www.sunymaritime.edu/sites/default/files/styles/medium_625px_by_410px_scale/public/2018-02/tech_talks_logo_color_preview.jpeg?itok=bEG5QRwk" });
			chainOfEvents.Add(new ChainOfEvent() { Id = -2, CategoryName = "Geek Up", CreatedBy = FPTOrgId, ImageUrl = "https://cdn1.vieclam24h.vn/upload/files_cua_nguoi_dung/logo/2015/09/09/1441773091_%5E079515115030007874230BE89E3605979527B615B34530EE5B%5Epimgpsh_fullsize_distr.jpg" });
			chainOfEvents.Add(new ChainOfEvent() { Id = -3, CategoryName = "Duong len dinh Olympia", CreatedBy = FPTOrgId, ImageUrl = "https://upload.wikimedia.org/wikipedia/vi/2/26/H%C3%ACnh_hi%E1%BB%87u_%C4%90%C6%B0%E1%BB%9Dng_L%C3%AAn_%C4%90%E1%BB%89nh_Olympia_VTV.png" });
			builder.HasData(chainOfEvents);
		}
	}
}
