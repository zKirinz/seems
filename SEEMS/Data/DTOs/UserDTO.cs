using SEEMS.Data.Models;

namespace SEEMS.Data.DTOs;

public class UserDTO
{
    public User? User { get; set; }
    public string? Organization { get; set; }
    public string? Role { get; set; }
}