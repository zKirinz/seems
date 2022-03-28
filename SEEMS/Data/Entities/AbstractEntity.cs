using System.ComponentModel.DataAnnotations;

namespace SEEMS.Data.Entities;

public class AbstractEntity<TKey> : BaseCreationTimestamp where TKey : IEquatable<TKey>
{
    protected AbstractEntity()
    {
    }

    [Key] [Required] public virtual TKey Id { get; set; }
}