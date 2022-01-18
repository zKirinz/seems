using SEEMS.Models.Identities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SEEMS.Models
{
    public class Comment
    {

        [Key]
        [Required]
        public int Id { get; set; }

        [StringLength(500)]
        [Column(TypeName = ("nvarchar(200)"))]
        public String CommentContent { get; set; }

        public int? CommentRating { get; set; }

        [ForeignKey("Comment")]
        public int? ParentCommentId { get; set; }

        [ForeignKey("Event")]
        public int EventId { get; set; }

        public DateTime CreateAt { get; set; }

        public DateTime? LastUpDateAt { get; set; }

        [JsonIgnore]
        public Event? Event { get; set; }

        [JsonIgnore]
        public ApplicationUser? User { get; set; }

        [JsonIgnore]
        public Comment? ParentComment { get; set; }
    }
}
