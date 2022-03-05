using System.ComponentModel.DataAnnotations;

namespace SEEMS.Data.DTOs;

public class RoleToUpdateDto
{
    [Required(ErrorMessage = "Role to set can not be empty")]
    public string Role { get; set; }
}