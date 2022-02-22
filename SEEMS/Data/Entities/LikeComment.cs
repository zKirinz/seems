using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SEEMS.Data.Entities
{
    public class LikeComment
    {
        [Key]
        [ForeignKey("User")]
        public int UserId { get; set; }
        [Key]
        [ForeignKey("Comment")]
        public int CommentId { get; set; }
    }
}
