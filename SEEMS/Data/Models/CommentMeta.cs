using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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

        [JsonIgnore]
        public Comment Comments { get; set; }

    }
}