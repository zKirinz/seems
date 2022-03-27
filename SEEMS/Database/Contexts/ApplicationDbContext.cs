using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SEEMS.Data.Entities;
using SEEMS.Data.Models;
using SEEMS.Database.Configurations;
using SEEMS.Infrastructures.Commons;
using SEEMS.Infrastructures.Extensions;
using SEEMS.Models;

namespace SEEMS.Contexts;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Comment> Comments { get; set; }

    public DbSet<CommentMeta> CommentMetas { get; set; }

    public DbSet<Event> Events { get; set; }

    public DbSet<EventMeta> EventMetas { get; set; }

    public DbSet<Reservation> Reservations { get; set; }

    public DbSet<FeedBack> FeedBacks { get; set; }

    public DbSet<User> Users { get; set; }

    public DbSet<UserMeta> UserMetas { get; set; }
    public DbSet<LikeComment> LikeComments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        if (modelBuilder == null)
            throw new ArgumentNullException(nameof(modelBuilder));

        modelBuilder.AddRemovePluralizeConvention();
        modelBuilder.AddRemoveOneToManyCascadeConvention();
        modelBuilder.Entity<User>()
            .Property(u => u.OrganizationName)
            .HasConversion(new EnumToStringConverter<OrganizationEnum>());
        modelBuilder.Entity<Event>()
            .Property(u => u.OrganizationName)
            .HasConversion(new EnumToStringConverter<OrganizationEnum>());

        modelBuilder.ApplyConfiguration(new UserConfiguration());
        modelBuilder.ApplyConfiguration(new UserMetaConfiguration());
        modelBuilder.ApplyConfiguration(new EventConfiguration());
        modelBuilder.ApplyConfiguration(new ReservationConfiguration());
        modelBuilder.ApplyConventions();

        base.OnModelCreating(modelBuilder);
    }

    public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess,
        CancellationToken cancellationToken = new())
    {
        var entries = ChangeTracker
            .Entries()
            .Where(e => e.Entity is AbstractEntity<int> && (
                e.State == EntityState.Added
                || e.State == EntityState.Modified));

        foreach (var entityEntry in entries)
        {
            ((AbstractEntity<int>) entityEntry.Entity).ModifiedAt = DateTime.Now;

            if (entityEntry.State == EntityState.Added)
                ((AbstractEntity<int>) entityEntry.Entity).CreatedAt = DateTime.Now;
        }

        return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
    }

    public override int SaveChanges()
    {
        var entries = ChangeTracker
            .Entries()
            .Where(e => e.Entity is AbstractEntity<int> && (
                e.State == EntityState.Added
                || e.State == EntityState.Modified));

        foreach (var entityEntry in entries)
        {
            ((AbstractEntity<int>) entityEntry.Entity).ModifiedAt = DateTime.Now;

            if (entityEntry.State == EntityState.Added)
                ((AbstractEntity<int>) entityEntry.Entity).CreatedAt = DateTime.Now;
        }

        return base.SaveChanges();
    }
}