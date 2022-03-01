using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using SEEMS.Data.Entities;

namespace SEEMS.Data.DTOs;

public class UserForUpdateDto 
{
    public bool? Active { get; set; }
    
    [JsonIgnore]
    public string? Organization { get; set; }
    [JsonIgnore] 
    public Organization? Org { get; set; }
}