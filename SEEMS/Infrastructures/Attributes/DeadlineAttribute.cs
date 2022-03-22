using System.ComponentModel.DataAnnotations;

namespace SEEMS.Infrastructures.Attributes;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter,
    AllowMultiple = false)]
public class DeadlineAttribute : ValidationAttribute
{
    
}