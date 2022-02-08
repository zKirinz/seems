using Microsoft.EntityFrameworkCore;
using SEEMS.Data.Entities;
using SEEMS.Data.Models;
using SEEMS.Models;
using System;

namespace SEEMS.Contexts
{
    public class ApplicationDbContext : DbContext
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<CommentMeta> CommentMetas { get; set; }

        public DbSet<ChainOfEvent> ChainOfEvents { get; set; }

        public DbSet<Event> Events { get; set; }

        public DbSet<EventMeta> EventMetas { get; set; }

        public DbSet<Reservation> Reservations { get; set; }

        public DbSet<FeedBack> FeedBacks { get; set; }

        public DbSet<InvoiceUser> InvoiceUsers { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<UserMeta> UserMetas { get; set; }

        public override int SaveChanges()
        {
            var entries = ChangeTracker
                .Entries()
                .Where(e => e.Entity is BaseCreationTimestamp && (
                    e.State == EntityState.Added
                    || e.State == EntityState.Modified));

            foreach (var entityEntry in entries)
            {
                ((BaseCreationTimestamp) entityEntry.Entity).ModifiedAt = DateTime.Now;

                if (entityEntry.State == EntityState.Added)
                {
                    ((BaseCreationTimestamp) entityEntry.Entity).CreatedAt = DateTime.Now;
                }
            }

            return base.SaveChanges();
        }
    }
}
