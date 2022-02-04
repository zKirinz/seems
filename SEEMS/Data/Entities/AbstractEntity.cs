using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SEEMS.Data.Entities
{
    public class AbstractEntity<TKey> : BaseCreationTimestamp where TKey : IEquatable<TKey>
    {
        protected AbstractEntity() { }

        [Key]
        [Required]
        public virtual TKey Id { get; set; }

    }
}
