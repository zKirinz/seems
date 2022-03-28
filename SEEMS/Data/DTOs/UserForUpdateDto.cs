using Newtonsoft.Json;

namespace SEEMS.Data.DTOs;

public class UserForUpdateDto
{
    public bool? Active { get; set; }

    [JsonIgnore] public string? Organization { get; set; }
}