using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using SEEMS.Data.Entities;

namespace SEEMS.Models;

[Table("CommentMeta")]
public class CommentMeta : AbstractEntity<int>
{
    [ForeignKey("Comment")] public int CommentsId { get; set; }

    public string MetaKey { get; set; }

    public string MetaValue { get; set; }

    [JsonIgnore] public Comment Comments { get; set; }
}