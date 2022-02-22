using SEEMS.Data.Models;
using SEEMS.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SEEMS.Data.Entities
{
    public class LikeComment : AbstractEntity<int>
    {
        [ForeignKey("User")]
        public int? UserId { get; set; }
        [ForeignKey("Comment")]
        public int CommentId { get; set; }
        public User? User { get; set; }
        public Comment MyProperty { get; set; }
    }
}
