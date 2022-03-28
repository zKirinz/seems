using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace SEEMS.Infrastructures.Attributes;

public class IsUtcAttribute : Attribute
{
    public IsUtcAttribute(bool isUtc = true) => IsUtc = isUtc;
    public bool IsUtc { get; }
}

public static class UtcDateAnnotation
{
    private const string IsUtcAnnotation = "IsUtc";

    private static readonly ValueConverter<DateTime, DateTime> UtcConverter =
        new(v => v, v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

    public static PropertyBuilder<TProperty> IsUtc<TProperty>(this PropertyBuilder<TProperty> builder,
        bool isUtc = true)
    {
        return builder.HasAnnotation(IsUtcAnnotation, isUtc);
    }

    public static bool IsUtc(this IMutableProperty property)
    {
        var attribute = property.PropertyInfo.GetCustomAttribute<IsUtcAttribute>();
        if (attribute is not null && attribute.IsUtc) return true;

        return (bool?) property.FindAnnotation(IsUtcAnnotation)?.Value ?? true;
    }

    public static void ApplyUtcDateTimeConverter(this ModelBuilder builder)
    {
        foreach (var entityType in builder.Model.GetEntityTypes())
        foreach (var property in entityType.GetProperties())
        {
            if (!property.IsUtc()) continue;

            if (property.ClrType == typeof(DateTime) ||
                property.ClrType == typeof(DateTime?))
                property.SetValueConverter(UtcConverter);
        }
    }
}