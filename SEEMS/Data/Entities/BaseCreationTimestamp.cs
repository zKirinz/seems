using SEEMS.Infrastructures.Attributes;

namespace SEEMS.Data.Entities;

public class BaseCreationTimestamp
{
    [IsUtc(true)]
    public DateTime CreatedAt { get; set; }

    [IsUtc(true)]
    public DateTime? ModifiedAt { get; set; }
}