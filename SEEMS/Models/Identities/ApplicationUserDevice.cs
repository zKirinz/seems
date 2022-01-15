using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SEEMS.Models.Identities
{
    public class ApplicationUserDevice
    {
        [Key]
        [Required]
        public Guid Id { get; set; }

        [Required]
        public Guid UserId { get; set; }

        [Required]
        [Column(TypeName = ("nvarchar(500)"))]
        public string PushNotificationProvider { get; set; }

        [Required]
        [Column(TypeName = ("nvarchar(500)"))]
        public string DeviceId { get; set; }

        [Required]
        [Column(TypeName = ("nvarchar(1000)"))]
        public string PushNotificationToken { get; set; }

        public bool Active { get; set; }

        [ForeignKey("UserId")]
        public virtual ApplicationUser User { get; set; }
    }
}