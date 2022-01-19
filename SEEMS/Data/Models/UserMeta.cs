using SEEMS.Models.Identities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SEEMS.Models
{
    public class UserMeta
    {

        [Key]
        public int Id { get; set; }
        public String MetaKey { get; set; }

        public String MetaValue { get; set; }

        [JsonIgnore]
        public ApplicationUser? User { get; set; }
    }
}
