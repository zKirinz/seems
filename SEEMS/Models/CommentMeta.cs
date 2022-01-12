using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SEEMS.Models
{
    public class CommentMeta
    {

        [Key]
        public int Id { get; set; }

        [ForeignKey("Comment")]
        public int CommentsId { get; set; }

        public String MetaKey { get; set; }

        public String MetaValue { get; set; }

        public Comments Comments { get; set; }

    }
}