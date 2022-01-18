using SEEMS.Models.Identities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SEEMS.Models
{
    public class UserMeta
    {

        [Key]
        public int Id { get; set; }
        public String MetaKey { get; set; }

        public String MetaValue { get; set; }
        
        public ApplicationUser? User { get; set; }
    }
}
