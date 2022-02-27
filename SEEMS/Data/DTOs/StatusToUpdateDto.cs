using System.ComponentModel.DataAnnotations;

namespace SEEMS.Data.DTOs;

public class StatusToUpdateDto
{
    [Required(ErrorMessage = "Active field is a required field")]
    public bool Active { get; set; }
}