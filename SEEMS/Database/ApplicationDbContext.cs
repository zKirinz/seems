using Microsoft.EntityFrameworkCore;
using SEEMS.Models;

namespace SEEMS.Database
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }

        public DbSet<UserMeta> UserMetas { get; set; }

        public DbSet<Comments> Comments { get; set; }

        public DbSet<CommentMeta> CommentMetas { get; set; }

        public DbSet<ChainOfEvent> ChainOfEvents { get; set; }

        public DbSet<Event> Events { get; set; }

        public DbSet<EventMeta> EventMetas { get; set; }

        public DbSet<Reservation> Reservations { get; set; }

        public DbSet<FeedBack> FeedBacks { get; set; }
    }
}
