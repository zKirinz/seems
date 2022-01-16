using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using SEEMS.Models;

namespace SEEMS.Database
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //User's Seed Data
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    FullName = "Lê Tiến Thịnh",
                    EmailAddress = "thinhltse151082@fpt.edu.vn",
                    CreateAt = DateTime.Now,
                    LastUpDateAt = DateTime.Now,
                },
                new User
                {
                    Id = 2,
                    FullName = "Trần Trung Kiên",
                    EmailAddress = "kienttse151340@fptu.edu.vn",
                    CreateAt = DateTime.Now,
                    LastUpDateAt = DateTime.Now,
                },
                new User
                {
                    Id = 3,
                    FullName = "Dương Gia Phát",
                    EmailAddress = "phatdgse140409@fpt.edu.vn",
                    CreateAt = DateTime.Now,

                    LastUpDateAt = DateTime.Now,
                },
                new User
                {
                    Id = 4,
                    FullName = "Nguyễn Khôi Nguyên",
                    EmailAddress = "nguyennkse140132@fpt.edu.vn",
                    CreateAt = DateTime.Now,
                    LastUpDateAt = DateTime.Now,
                },
                new User
                {
                    Id = 5,
                    FullName = "Bùi Thế Hiển",
                    EmailAddress = "hienbtse150763@fpt.edu.vn",
                    CreateAt = DateTime.Now,
                    LastUpDateAt = DateTime.Now,
                }
            );


            //UserMeta's Seed Data
            modelBuilder.Entity<UserMeta>().HasData(
                new UserMeta { Id = 1, UserId = 1, MetaKey = "role", MetaValue = "Admin" },
                new UserMeta { Id = 2, UserId = 2, MetaKey = "role", MetaValue = "Admin" },
                new UserMeta { Id = 3, UserId = 3, MetaKey = "role", MetaValue = "Admin" },
                new UserMeta { Id = 4, UserId = 4, MetaKey = "role", MetaValue = "Admin" },
                new UserMeta { Id = 5, UserId = 5, MetaKey = "role", MetaValue = "Admin" }
            );

            //Reservation's Seed Data
            modelBuilder.Entity<Reservation>().HasData(
                new Reservation
                {
                    Id = 1,
                    Attend = true,
                    CreateAt = DateTime.Now,
                    LastUpdateAt = DateTime.Now,
                    DiscountPercent = 0,
                    TotalPrice = 0,
                    EventId = 2
                }
            );

            //ChainOfEvent's Seed Data
            modelBuilder.Entity<ChainOfEvent>().HasData(
                new ChainOfEvent
                {
                    Id = 1,
                    CategoryName = "Telescope",
                    ImageUrl = "https://cdn.britannica.com/60/190760-050-61999AEC/space-background-telescope-silhouette-NASA-image-elements.jpg"
                });

            //Comment's Seed Data
            modelBuilder.Entity<Comment>().HasData(
                new Comment
                {
                    Id = 1,
                    CommentContent = "Ad cho mình hỏi đăng ký thế nào vậy ạ",
                    CreateAt = DateTime.Now,
                    EventId = 2,
                    LastUpDateAt = DateTime.Now,
                    UserId = 1,
                },
                new Comment
                {
                    Id = 2,
                    CommentContent = "Bạn đọc đi kìa, hỏi hỏi gì ?",
                    CreateAt = DateTime.Now,
                    EventId = 2,
                    LastUpDateAt = DateTime.Now,
                    UserId = 2,
                    ParentCommentId = 1,
                },
                new Comment
                {
                    Id = 3,
                    CommentContent = "Đọc chưa hết thôi, làm gì căng ?",
                    CreateAt = DateTime.Now,
                    EventId = 2,
                    LastUpDateAt = DateTime.Now,
                    UserId = 1,
                    ParentCommentId = 1,
                },
                new Comment
                {
                    Id = 4,
                    CommentContent = "Sự kiện này hay quá, tớ phải rủ Xuka tham gia thôi",
                    CreateAt = DateTime.Now,
                    EventId = 3,
                    LastUpDateAt = DateTime.Now,
                    UserId = 5,
                }
            );


            //Event's Seed Data
            modelBuilder.Entity<Event>().HasData(
                new Event
                {
                    Id = 1,
                    EventTitle = "Zoo Hackathon",
                    EventDescription = "Cuộc thi công nghệ tìm kiếm giải pháp bảo vệ động vật hoang dã",
                    IsPrivate = true,
                    ImageUrl = "https://zoohackathonvietnam.org/wp-content/uploads/2021/10/zoohackathon.jpg",
                    ExpectPrice = 0,
                    Active = false,
                    Location = "FPTU Campus",
                    StartDate = new DateTime(2021, 10, 10),
                    EndDate = new DateTime(2021, 10, 20),
                    CreateAt = DateTime.Now,
                    LastUpdateAt = DateTime.Now
                },

                new Event
                {
                    Id = 2,
                    EventTitle = "Tech Peek",
                    EventDescription = "Kiến thức và kỹ năng cần thiết cho buổi luận án tốt nghiệp Capstone",
                    IsPrivate = true,
                    ImageUrl = "https://d3f1iyfxxz8i1e.cloudfront.net/courses/course_image/20585aab9bd0.png",
                    ExpectPrice = 0,
                    Active = false,
                    Location = "FPTU Campus",
                    StartDate = new DateTime(2021, 11, 10),
                    EndDate = new DateTime(2021, 11, 20),
                    CreateAt = DateTime.Now,
                    LastUpdateAt = DateTime.Now,
                },
                new Event
                {
                    Id = 3,
                    EventTitle = "TeleScope #1",
                    EventDescription = "Kiến thức cần có cho kỳ OJT",
                    IsPrivate = true,
                    ImageUrl = "https://unica.vn/media/imagesck/1618561373_on-job-the-training.jpg?v=1618561373",
                    ExpectPrice = 0,
                    Active = false,
                    Location = "FPTU Campus",
                    StartDate = new DateTime(2021, 12, 10),
                    EndDate = new DateTime(2021, 12, 20),
                    CreateAt = DateTime.Now,
                    LastUpdateAt = DateTime.Now,
                    ChainOfEventId = 1,
                }
            );
        }

        public DbSet<User> User { get; set; }

        public DbSet<UserMeta> UserMeta { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<CommentMeta> CommentMeta { get; set; }

        public DbSet<ChainOfEvent> ChainOfEvent { get; set; }

        public DbSet<Event> Event { get; set; }

        public DbSet<EventMeta> EventMeta { get; set; }

        public DbSet<Reservation> Reservation { get; set; }

        public DbSet<FeedBack> FeedBack { get; set; }

        public DbSet<InvoiceUser> InvoiceUser { get; set; }
    }
}
