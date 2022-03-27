using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using SEEMS.Data.Entities;

namespace SEEMS.Models;

public class EventMeta : AbstractEntity<int>
{
    [ForeignKey("Event")] public int EventId { get; set; }

    [StringLength(20)] public string MetaKey { get; set; }

    [StringLength(20)] public string MetaValue { get; set; }

    [JsonIgnore] public Event Event { get; set; }
}