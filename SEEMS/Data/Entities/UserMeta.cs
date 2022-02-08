
using SEEMS.Data.Entities;
using SEEMS.Data.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SEEMS.Models
{
    public class UserMeta : AbstractEntity<int>
    {
        public String MetaKey { get; set; }

        public String MetaValue { get; set; }

        [JsonIgnore]
        public User? User { get; set; }
    }
}
