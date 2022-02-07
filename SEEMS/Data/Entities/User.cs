using Microsoft.EntityFrameworkCore;
using SEEMS.Data.Entities;

namespace SEEMS.Data.Models
{
    [Index(nameof(Email), IsUnique = true)]
    public class User : AbstractEntity<int>
    {
        public string Email { get; internal set; }
        public string UserName { get; internal set; }

        public string ImageUrl { get; set; }

        public bool Active { get; set; }

    }
}
