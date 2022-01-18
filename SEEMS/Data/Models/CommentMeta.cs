using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SEEMS.Models
{
    public class CommentMeta
    {

        [Key]
        [Required]
        public int Id { get; set; }

        [ForeignKey("Comment")]
        public int CommentsId { get; set; }

        public String MetaKey { get; set; }

        public String MetaValue { get; set; }

        public Comment Comments { get; set; }

    }
}