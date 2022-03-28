using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SEEMS.Infrastructures.Commons;
using SEEMS.Models;

namespace SEEMS.Database.Configurations;

public class EventConfiguration : IEntityTypeConfiguration<Event>
{
    public void Configure(EntityTypeBuilder<Event> builder)
    {
        var events = new List<Event>();
        //tech talk
        events.Add(new Event
        {
            EventTitle = "Tech Talk with Indian Web Developers",
            EventDescription =
                "India will have about half a billion Indian language users on the world wide web within the next three years. To give them the tools to publish content online in the language they want, Google announced the Webmaster Conference for some universities. This one-day events will have all the information you need for your career path in field of Web Developer",
            Active = true, OrganizationName = OrganizationEnum.FPTU, EndDate = new DateTime(2022, 5, 12),
            ImageUrl =
                "https://www.thebalancecareers.com/thmb/iz-aH3VGU_iXgmeNitwSjvyEnXo=/950x633/filters:fill(auto,1)/web-developer-job-description-salary-and-skills-2061841_final-01-1daf6d8219bd49a089189b4e8c6a7e4d-432214bf6dc64187b1866389f582b79d.jpg",
            IsPrivate = false, Location = "Hogwarts", StartDate = new DateTime(2022, 1, 1)
        });
        events.Add(new Event
        {
            EventTitle = "Tech Talk with a Network Administrator",
            EventDescription =
                "2 famous figures in the IT field will have a sharing about career path, characteristics of a Network Administrator",
            Active = true, OrganizationName = OrganizationEnum.FPTU, EndDate = new DateTime(2022, 5, 12),
            ImageUrl =
                "https://brands.vn/wp-content/uploads/2020/12/network-administrator-525818-final1-9f56133a32c945b797185211794afaa1.png",
            IsPrivate = false, Location = "Room 202 FPT", StartDate = new DateTime(2022, 1, 1)
        });
        events.Add(new Event
        {
            EventTitle = "Tech Talk with a Data Analyst",
            EventDescription =
                "2 famous figures in the IT field will have a sharing about career path, characteristics of a Data Analyst",
            Active = true, OrganizationName = OrganizationEnum.FPTU, EndDate = new DateTime(2022, 5, 12),
            ImageUrl =
                "https://inda.vn/wp-content/uploads/2020/08/How-To-Become-Data-Analyst-1170x630_db990027fe5f44bd66f9ec06f24f27c1.jpg",
            IsPrivate = false, Location = "Wakanda", StartDate = new DateTime(2022, 1, 1)
        });
        events.Add(new Event
        {
            EventTitle = "Tech Talk with IT Manager",
            EventDescription =
                "Take the fantastic opportunity to broaden your horizon outside the common hotel business and play your role in delivering high quality hospitality services embedded in one of the world’s most popular sports events. Benefit from this exceptional experience by advancing your skills, know-how and future career. 2 experts in IT Manager fields will give all of these information for you.",
            Active = true, OrganizationName = OrganizationEnum.FPTU, EndDate = new DateTime(2022, 5, 12),
            ImageUrl =
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWVKzBF8vdntWkrK-d8JfCWiCMQcduOiSpmQ&usqp=CAU",
            IsPrivate = false, Location = "Australia", StartDate = new DateTime(2022, 1, 1)
        });
        events.Add(new Event
        {
            EventTitle = "Tech Talk with Cloud Administration",
            EventDescription =
                "2 famous figures in the IT field will have a sharing about career path, characteristics of a Cloud Administration",
            Active = true, OrganizationName = OrganizationEnum.FPTU, EndDate = new DateTime(2022, 5, 12),
            ImageUrl =
                "https://assets-global.website-files.com/5b6df8bb681f89c158b48f6b/5d482257d5a5569eb686a3cd_cloud-systems-administrator.jpg",
            IsPrivate = false, Location = "Grand Line", StartDate = new DateTime(2022, 1, 1)
        });

        //other events
        events.Add(new Event
        {
            EventTitle = "TELESCOPE - TAKE THE TELESCOPE TO DISCOVER THE IT UNIVERSE",
            EventDescription =
                "Telescope là talkshow đầu tiên trong IT Universe Series. Đây sẽ là chiếc kính viễn vọng mở ra cái nhìn tổng quát nhất về ngành IT. Sự kiện hứa hẹn mang đến cho các bạn một cái nhìn thực tế trong công việc từ những chia sẻ của diễn giả, đồng thời tạo điều kiện để các bạn sinh viên tiếp xúc với văn hoá của công ty tiềm năng và môi trường làm việc thực tế.",
            Active = true, OrganizationName = OrganizationEnum.FCode, EndDate = new DateTime(2022, 5, 12),
            ImageUrl =
                "https://scontent.fsgn8-2.fna.fbcdn.net/v/t39.30808-6/245913871_2965332240350002_3474545073434521582_n.jpg?stp=dst-jpg_p843x403&_nc_cat=110&ccb=1-5&_nc_sid=730e14&_nc_ohc=sXyrXgTVRCwAX_JkXFi&_nc_ht=scontent.fsgn8-2.fna&oh=00_AT93FKkoDitNfoEH2oE22UH_pUe3IaQaL39rv0BGlYbAIw&oe=6233DC8F",
            IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1)
        });
        events.Add(new Event
        {
            EventTitle = "SEMINAR: IMPLEMENTING JAVA WEB WITH JPA",
            EventDescription =
                "✏️ Một năm mới lại đến, là một sinh viên ngành SE, bạn có mong muốn được biết thêm những kiến thức mới để nâng cao hiểu biết của bản thân hay đơn giản là để ôn luyện trong dịp nghỉ Tết?\n✏️ Bên cạnh JDBC là một kiến thức quan trọng ở trường, liệu bạn đã biết về công nghệ JPA - một công nghệ mạnh mẽ cho phép ánh xạ các đối tượng trong Java với cơ sở dữ liệu ? \n✏️  Bạn muốn tìm một sự kiện ngoại khóa giúp bạn ôn tập những kiến thức về JDBC cũng như tìm hiểu thêm về những công nghệ khác liên quan đến môn học Java Web",
            Active = true, OrganizationName = OrganizationEnum.FCode, EndDate = new DateTime(2022, 5, 12),
            ImageUrl =
                "https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.6435-9/81011453_2454273688122529_5095034864755802112_n.jpg?stp=dst-jpg_s2048x2048&_nc_cat=103&ccb=1-5&_nc_sid=730e14&_nc_ohc=zOGjWlDpC9IAX8Qvxrh&tn=9w3hOIgn5shOT8xl&_nc_ht=scontent.fsgn4-1.fna&oh=00_AT-doJy_IuWa9LN5CAGhDvpnr3qk0j27jGdR2NF_67S7kw&oe=625306B7",
            IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1)
        });
        events.Add(new Event
        {
            EventTitle = "Telescope 2",
            EventDescription =
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu odio ut sem nulla pharetra diam sit amet nisl. Sit amet commodo nulla facilisi. Vulputate eu scelerisque felis imperdiet proin fermentum leo. Aliquet enim tortor at auctor. Praesent tristique magna sit amet purus gravida. Neque sodales ut etiam sit amet nisl purus in mollis. Senectus et netus et malesuada. Sit amet mattis vulputate enim nulla aliquet porttitor lacus. Lacus sed viverra tellus in hac habitasse. Odio aenean sed adipiscing diam donec. Morbi tincidunt ornare massa eget egestas purus viverra accumsan.",
            Active = true, OrganizationName = OrganizationEnum.FCode, EndDate = new DateTime(2022, 5, 12),
            ImageUrl =
                "https://scontent.fsgn8-2.fna.fbcdn.net/v/t39.30808-6/245913871_2965332240350002_3474545073434521582_n.jpg?stp=dst-jpg_p843x403&_nc_cat=110&ccb=1-5&_nc_sid=730e14&_nc_ohc=sXyrXgTVRCwAX_JkXFi&_nc_ht=scontent.fsgn8-2.fna&oh=00_AT93FKkoDitNfoEH2oE22UH_pUe3IaQaL39rv0BGlYbAIw&oe=6233DC8F",
            IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1)
        });

        events.Add(new Event
        {
            EventTitle = "Geek UP",
            EventDescription =
                "🌟 Hiện tại GEEK Up đang triển khai kỳ thực tập cho mùa sắp tới, với một số thông tin về kỳ thực tập, tất cả thông tin sẽ được tiết lộ trong buổi chia sẻ này.",
            Active = true, OrganizationName = OrganizationEnum.FPTU, EndDate = new DateTime(2022, 5, 12),
            ImageUrl =
                "https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.30808-6/244620329_2958722971010929_6538874280960789674_n.png?_nc_cat=109&ccb=1-5&_nc_sid=730e14&_nc_ohc=v3Q8mdV1kkcAX9XpeqX&_nc_ht=scontent.fsgn13-2.fna&oh=00_AT_4-xcVKoS3ym2FUbYh5D_xdlDgcu7JBipI1n1yDkBgGg&oe=62337267",
            IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1)
        });
        events.Add(new Event
        {
            EventTitle = "TECHTALK: IT HỎI - HR TRẢ LỜI",
            EventDescription =
                "✨ Công nghệ thông tin luôn nằm trong top những ngành khát nhân lực nhất Việt Nam, khi các doanh nghiệp thường xuyên có nhu cầu tuyển dụng. Tuy nhiên, không phải vì khát nhân lực mà các nhà tuyển dụng sẽ dễ dãi trong việc tìm kiếm ứng viên. Vì thế, để có thể chinh phục được các nhà tuyển dụng, các bạn sinh viên cần có sự chuẩn bị thật tốt ngay từ khi còn ngồi trên ghế giảng đường.\n✨ Đến với buổi Workshop 2 “Techtalk: IT HỎI – HR TRẢ LỜI”, người tham dự sẽ có được cái nhìn tổng quan về thị trường và sự cần thiết của việc tìm hiểu những yêu cầu mà nhà tuyển dụng cần ở một bạn sinh viên.Ngoài ra, người tham dự sẽ có cơ hội quan sát và trải nghiệm trực tiếp một buổi phỏng vấn tuyển dụng IT sẽ như thế nào, có những yêu cầu nào khác biệt hay những câu hỏi mà HR thường đưa ra để đánh giá ứng viên, từ đó cảm nhận được tầm quan trọng của việc trau dồi các kỹ năng và kinh nghiệm thực chiến.",
            Active = true, OrganizationName = OrganizationEnum.FCode, EndDate = new DateTime(2022, 5, 12),
            ImageUrl =
                "https://scontent.fsgn3-1.fna.fbcdn.net/v/t39.30808-6/271314845_3030053367211222_9178958559231775796_n.png?stp=dst-png_p843x403&_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_ohc=l3H-n7vms0wAX9mVcJa&_nc_ht=scontent.fsgn3-1.fna&oh=00_AT_hFIqVwvaJbC-ACSEB_yAnYRg69uPIniXVBnG22_yXOQ&oe=623328B2",
            IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1)
        });

        events.Add(new Event
        {
            EventTitle = "GIẢI NGỐ 𝗝𝗔𝗩𝗔 𝗪𝗘𝗕",
            EventDescription =
                "💻 Đã từ lâu tại FPT, môn PRJ301 còn gọi là Java Web kỳ 4 luôn là một thử thách cam go dành cho các bạn khối ngành SE. Đây là môn học đòi hỏi sự thấu hiểu mô hình Servlet kèm theo các kiến thức nền từ các môn kỳ trước: Java OOP, Microsoft SQL và cả kỹ năng sử dụng thành thạo các gói thư viện để kết nối các thành phần trong mô hình Servlet. \n🔍 Nắm bắt được tâm tư, nguyện vọng của các thành viên F - Code, mong muốn \"phụ đạo\" môn Java Web, vào sáng thứ 7 tuần vừa rồi, mentor của câu lạc bộ, thầy Phạm Công Thành đã tổ chức ngay một buổi ôn tập cho các thành viên có nhu cầu.Sau tổng cộng 6 tiếng \"cày cuốc\" từ sáng đến chiều, nhờ những lời giảng cực chi tiết và dễ hiểu của thầy, các bạn đã nắm được những kiến thức nền tảng của Java Web, cũng như tạo ra được một trang web với vài tính năng đơn giản 🎉🎉🎉",
            Active = true, OrganizationName = OrganizationEnum.FCode, EndDate = new DateTime(2022, 5, 12),
            ImageUrl =
                "https://scontent.fsgn3-1.fna.fbcdn.net/v/t39.30808-6/245302112_2962973497252543_6887453293357602375_n.png?stp=dst-png_p843x403&_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_ohc=WmSHPaM-SVsAX_icSKJ&_nc_ht=scontent.fsgn3-1.fna&oh=00_AT9X0Xr7KNkUTKaeVK9jBiL3lhAV7NpLagvAu4oi3zRjFQ&oe=62331EA1",
            IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1)
        });

        events.Add(new Event
        {
            EventTitle = "𝗢𝗥𝗜𝗘𝗡𝗧𝗔𝗧𝗜𝗢𝗡 - HỎI NGANG ĐÁP DỌC CÙNG F-CODE",
            EventDescription =
                "Thời gian vừa qua, F-code cảm thấy rất vui khi nhận được rất nhiều sự quan tâm từ các bạn tân sinh viên k17.\nTại buổi Orientation, các bạn còn có cơ hội giao lưu, đặt câu hỏi trực tiếp với các anh chị “cốt cán” của clb và mang về những bí kíp “tuyệt mật” để trở thành thành viên F-Code 🥳😍",
            Active = true, OrganizationName = OrganizationEnum.FCode, EndDate = new DateTime(2022, 5, 12),
            ImageUrl =
                "https://scontent.fsgn8-2.fna.fbcdn.net/v/t39.30808-6/244723211_2957956197754273_4141763856813532301_n.jpg?stp=dst-jpg_p843x403&_nc_cat=105&ccb=1-5&_nc_sid=730e14&_nc_ohc=jetF4xQrsYEAX8GH-re&_nc_ht=scontent.fsgn8-2.fna&oh=00_AT_kXe1TqHtKeJrUtd2IQbhPPUNdSlBK2yDIBm8VivYUOw&oe=6232A489",
            IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1)
        });
        events.Add(new Event
        {
            EventTitle = "TECHTALK CÙNG VỚI NETCOMPANY - CHỦ ĐỀ DEPOPS",
            EventDescription =
                " Tiếp nối sự thành công của 𝐕𝐢𝐫𝐭𝐮𝐚𝐥 𝐓𝐞𝐜𝐡 𝐓𝐚𝐥𝐤 về Clean Code, 𝗧𝗵𝗲 𝗡𝗲𝘁𝗰𝗼𝗺𝗽𝗮𝗻𝘆 𝗩𝗶𝗿𝘁𝘂𝗮𝗹 𝗧𝗲𝗰𝗵 𝗧𝗮𝗹𝗸𝘀 đã trở lại với một trong các chủ đề hot nhất hiện nay trong lĩnh vực software development đó chính là 𝘿𝙚𝙫𝙊𝙥𝙨.",
            Active = true, OrganizationName = OrganizationEnum.FPTU, EndDate = new DateTime(2022, 5, 12),
            ImageUrl =
                "https://external.fsgn4-1.fna.fbcdn.net/safe_image.php?d=AQGK7aOMD4lkMKiJ&w=500&h=261&url=https%3A%2F%2Fapp.livestorm.co%2Fp%2F5e7a541e-a1f1-47a0-b5c4-4bac46260875%2Fog.png&cfs=1&ext=jpg&_nc_oe=6fbbd&_nc_sid=06c271&ccb=3-5&_nc_hash=AQGh7_wSdjNGW2SU",
            IsPrivate = false, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1)
        });

        //just seed 
        for (var i = 1; i <= 30; i++)
            events.Add(new Event
            {
                EventTitle = $"Tech talk {i}",
                EventDescription =
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu odio ut sem nulla pharetra diam sit amet nisl. Sit amet commodo nulla facilisi. Vulputate eu scelerisque felis imperdiet proin fermentum leo. Aliquet enim tortor at auctor. Praesent tristique magna sit amet purus gravida. Neque sodales ut etiam sit amet nisl purus in mollis. Senectus et netus et malesuada. Sit amet mattis vulputate enim nulla aliquet porttitor lacus. Lacus sed viverra tellus in hac habitasse. Odio aenean sed adipiscing diam donec. Morbi tincidunt ornare massa eget egestas purus viverra accumsan.",
                Active = true, OrganizationName = OrganizationEnum.FPTer, EndDate = new DateTime(2022, 5, i),
                ImageUrl = "https://technologycouncil.com/wp-content/uploads/2019/10/NTC_TECH_TALKS-e1570650157831.png",
                IsPrivate = true, Location = "Hall A FPT", StartDate = new DateTime(2022, 1, 1)
            });
        var idSeed = -1;
        var enums = Enum.GetValues(typeof(OrganizationEnum));
        foreach (var item in events)
        {
            item.OrganizationName = (OrganizationEnum) enums.GetValue(new Random().Next(enums.Length - 1));
            item.StartDate = new DateTime(2022, new Random().Next(1, 5), new Random().Next(1, 28));
            item.EndDate = item.StartDate.AddHours(new Random().Next(1, 5));
            item.Id = idSeed--;
            item.RegistrationDeadline = item.StartDate.Subtract(TimeSpan.FromHours(6));
            item.ParticipantNum = new Random().Next(0, 5) * 100;
        }

        builder.HasData(events);
    }
}