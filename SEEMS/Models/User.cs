using System.ComponentModel.DataAnnotations;

namespace SEEMS.Models
{
    public class User
    {

        [Key]
        public int Id { get; set; }

        [StringLength(50)]
        public String FullName { get; set; }

        [StringLength(30)]
        public String EmailAddress { get; set; }

        [StringLength(40)]
        public String? AvatarUrl { get; set; }

        public DateTime CreateAt { get; set; }

        public DateTime LastUpDateAt { get; set; }

    }
}
