using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SEEMS.Models.Identities
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        [StringLength(50)]
        public String FullName { get; set; }

        [StringLength(30)]
        public String EmailAddress { get; set; }

        [StringLength(40)]
        public String? AvatarUrl { get; set; }

        public ApplicationUser() { }

        public ApplicationUser(string userName) : base(userName) { }

        public virtual ICollection<ApplicationUserDevice> Devices { get; set; }

    }
}
