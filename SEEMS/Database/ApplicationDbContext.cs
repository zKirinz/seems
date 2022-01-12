using Microsoft.EntityFrameworkCore;
using SEEMS.Models;

namespace SEEMS.Database
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<User> User { get; set; }

        public DbSet<UserMeta> UserMeta { get; set; }

        public DbSet<Comments> Comments { get; set; }

        public DbSet<CommentMeta> CommentMeta { get; set; }

        public DbSet<ChainOfEvent> ChainOfEvent { get; set; }

        public DbSet<Event> Event { get; set; }

        public DbSet<EventMeta> EventMeta { get; set; }

        public DbSet<Reservation> Reservation { get; set; }

        public DbSet<FeedBack> FeedBack { get; set; }
    }
}
