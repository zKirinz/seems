using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SEEMS.Infrastructures.Extensions;

public static class ContextExtension
{
    private static readonly List<Action<IMutableEntityType>> Conventions = new();

    public static void AddRemovePluralizeConvention(this ModelBuilder builder)
    {
        Conventions.Add(et => et.SetTableName(et.DisplayName()));
    }

    public static void AddRemoveOneToManyCascadeConvention(this ModelBuilder builder)
    {
        Conventions.Add(et => et.GetForeignKeys()
            .Where(fk => !fk.IsOwnership && fk.DeleteBehavior == DeleteBehavior.Cascade)
            .ToList()
            .ForEach(fk => fk.DeleteBehavior = DeleteBehavior.Restrict));
    }

    public static void ApplyConventions(this ModelBuilder builder)
    {
        foreach (var entityType in builder.Model.GetEntityTypes())
        foreach (var action in Conventions)
            action(entityType);

        Conventions.Clear();
    }
}