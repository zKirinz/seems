using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
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
            builder.UseIdentityColumns();
            base.OnModelCreating(builder);
        }


        public DbSet<Comment> Comments { get; set; }

        public DbSet<CommentMeta> CommentMetas { get; set; }

        public DbSet<ChainOfEvent> ChainOfEvents { get; set; }

        public DbSet<Event> Events { get; set; }

        public DbSet<EventMeta> EventMetas { get; set; }

        public DbSet<Reservation> Reservations { get; set; }

        public DbSet<FeedBack> FeedBacks { get; set; }

        public DbSet<InvoiceUser> InvoiceUsers { get; set; }
    }
}
