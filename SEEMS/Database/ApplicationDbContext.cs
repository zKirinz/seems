using Microsoft.EntityFrameworkCore;
using SEEMS.Models;

namespace SEEMS.Database
{
    public class ApplicationDbContext : DbContext
    {
        #pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        #pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

        public DbSet<User> User { get; set; }

        public DbSet<UserMeta> UserMeta { get; set; }

        public DbSet<Comments> Comments { get; set; }

        public DbSet<CommentMeta> CommentMeta { get; set; }

        public DbSet<ChainOfEvent> ChainOfEvent { get; set; }

        public DbSet<Event> Event { get; set; }

        public DbSet<EventMeta> EventMeta { get; set; }

        public DbSet<Reservation> Reservation { get; set; }

        public DbSet<FeedBack> FeedBack { get; set; }

        public DbSet<InvoiceUser> InvoiceUser { get; set; }
    }
}
