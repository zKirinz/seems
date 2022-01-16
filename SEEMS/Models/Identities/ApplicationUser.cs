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
        public ApplicationUser() { }

        public ApplicationUser(string userName) : base(userName) { }

        public virtual ICollection<ApplicationUserDevice> Devices { get; set; }

    }
}
