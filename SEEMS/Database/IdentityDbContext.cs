﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SEEMS.Models;
using SEEMS.Models.Identities;

namespace SEEMS.Database
{
    public class IdentityDbContext : IdentityDbContext<
        ApplicationUser,
        ApplicationRole,
        Guid,
        ApplicationUserClaim,
        ApplicationUserRole,
        ApplictionUserLogin,
        ApplicationRoleClaim,
        ApplicationUserToken>
    {
        public DbSet<ApplicationUserDevice> ApplicationUserDevices { get; set; }

        public IdentityDbContext(DbContextOptions<IdentityDbContext> options) : base(options)
        {
        }

        //IPersistedGrantDbContext Interface

        public static readonly ILoggerFactory PropertyAppLoggerFactory =
            LoggerFactory.Create(builder =>
                builder.AddFilter((category, level) =>
                category == DbLoggerCategory.Database.Command.Name && (level == LogLevel.Warning))
                .AddConsole());

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.UseIdentityColumns();

            //Reservation's Seed Data
            builder.Entity<Reservation>().HasData(
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
            builder.Entity<ChainOfEvent>().HasData(
                new ChainOfEvent
                {
                    Id = 1,
                    CategoryName = "Telescope",
                    ImageUrl = "https://cdn.britannica.com/60/190760-050-61999AEC/space-background-telescope-silhouette-NASA-image-elements.jpg"
                });

            //Comment's Seed Data
            builder.Entity<Comment>().HasData(
                new Comment
                {
                    Id = 1,
                    CommentContent = "Ad cho mình hỏi đăng ký thế nào vậy ạ",
                    CreateAt = DateTime.Now,
                    EventId = 2,
                    LastUpDateAt = DateTime.Now,
                },
                new Comment
                {
                    Id = 2,
                    CommentContent = "Bạn đọc đi kìa, hỏi hỏi gì ?",
                    CreateAt = DateTime.Now,
                    EventId = 2,
                    LastUpDateAt = DateTime.Now,
                    ParentCommentId = 1,
                },
                new Comment
                {
                    Id = 3,
                    CommentContent = "Đọc chưa hết thôi, làm gì căng ?",
                    CreateAt = DateTime.Now,
                    EventId = 2,
                    LastUpDateAt = DateTime.Now,
                    ParentCommentId = 1,
                },
                new Comment
                {
                    Id = 4,
                    CommentContent = "Sự kiện này hay quá, tớ phải rủ Xuka tham gia thôi",
                    CreateAt = DateTime.Now,
                    EventId = 3,
                    LastUpDateAt = DateTime.Now,
                }
            );


            //Event's Seed Data
            builder.Entity<Event>().HasData(
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
