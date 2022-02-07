using SEEMS.Data.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SEEMS.Models
{
    [Table("CommentMeta")]
    public class CommentMeta : AbstractEntity<int>
    {
        [ForeignKey("Comment")]
        public int CommentsId { get; set; }

        public String MetaKey { get; set; }

        public String MetaValue { get; set; }

        [JsonIgnore]
        public Comment Comments { get; set; }

    }
}