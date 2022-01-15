using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SEEMS.Models
{
    public class UserMeta
    {

        [Key]
        public int Id { get; set; }

/*        [ForeignKey("User")]
        public int UserId { get; set; }
*/
        public String MetaKey { get; set; }

        public String MetaValue { get; set; }
/*
        public User User { get; set; }*/
    }
}
