using SEEMS.Data.Models;
using SEEMS.Models;

namespace SEEMS.Data.DTOs;

public class UserDTO
{
    public User? User { get; set; }
    public string? Organization { get; set; }
    public string? Role { get; set; }
}