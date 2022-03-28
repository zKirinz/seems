using System.ComponentModel.DataAnnotations;

namespace SEEMS.Infrastructures.Attributes;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter)]
public class DeadlineAttribute : ValidationAttribute
{
}