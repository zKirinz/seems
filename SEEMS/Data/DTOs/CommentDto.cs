using System.ComponentModel.DataAnnotations;

namespace SEEMS.DTOs
{
    public class CommentDto
    {
        public int? UserId { get; set; }

        public int? EventId { get; set; }

        [StringLength(500)]
        public String CommentContent { get; set; }
        public int? ParentCommentId { get; set; }

    }
}
