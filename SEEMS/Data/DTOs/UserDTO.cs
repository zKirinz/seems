using SEEMS.Models;

namespace SEEMS.Data.DTOs;

public class UserDTO
{
    public int? Id { get; set; }
    public string? Email { get; set; } 
    public string? UserName { get; set; }
    public string? ImageUrl { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime? ModifiedAt { get; set; }
    public UserMeta? Metas { get; set; }
}