using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SEEMS.Models;
using SEEMS.Models.Identities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.UseIdentityColumns();
        }

        //IPersistedGrantDbContext Interface

        public static readonly ILoggerFactory PropertyAppLoggerFactory =
            LoggerFactory.Create(builder =>
                builder.AddFilter((category, level) =>
                category == DbLoggerCategory.Database.Command.Name && (level == LogLevel.Warning))
                .AddConsole());

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
