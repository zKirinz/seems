using System.ComponentModel.DataAnnotations;

namespace SEEMS.Infrastructures.Attributes;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter)]
public class StartDateAttribute : ValidationAttribute
{
    public StartDateAttribute(int minDate)
    {
        MinDateBeforeStart = minDate;
    }

    private int MinDateBeforeStart { get; }

    public override bool IsValid(object value)
    {
        var date = value is DateTime ? (DateTime) value : default;

        var result = false;
        if (MinDateBeforeStart != null) result = IsRightStartDate(date);

        return result;
    }

    internal bool IsRightStartDate(DateTime date)
    {
        return date.Subtract(DateTime.Now).Add(TimeSpan.FromHours(7)).TotalDays <= MinDateBeforeStart;
    }
}