using SEEMS.Data.Entities;
using SEEMS.Data.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SEEMS.Models
{
    public class Comment : AbstractEntity<int>
    {
        [StringLength(500)]
        [Column(TypeName = ("nvarchar(200)"))]
        public String CommentContent { get; set; }

        public int? CommentRating { get; set; }

        [ForeignKey("Comment")]
        public int? ParentCommentId { get; set; }

        [ForeignKey("Event")]
        public int EventId { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        [JsonIgnore]
        public Event? Event { get; set; }

        [JsonIgnore]
        public User User { get; set; }

        [JsonIgnore]
        public Comment? ParentComment { get; set; }
    }
}
