using System.ComponentModel.DataAnnotations;

namespace SEEMS.Data.DTOs;

public class RoleToUpdateDTO
{
    [Required(ErrorMessage = "Role to set can not be empty")]
    public string Role { get; set; }
}