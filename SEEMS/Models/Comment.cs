using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SEEMS.Models
{
    public class Comment
    {

        [Key]
        public int Id { get; set; }

        [StringLength(500)]
        public String CommentContent { get; set; }

        public int CommentRating { get; set; }

        [ForeignKey("Comment")]
        public int? ParentCommentId { get; set; }

        [ForeignKey("Event")]
        public int EventId { get; set; }

        public DateTime CreateAt { get; set; }

        public DateTime LastUpDateAt { get; set; }

        public Event Event { get; set; }

        public Comment? ParentComment { get; set; }
    }
}
