using System.ComponentModel.DataAnnotations;

namespace SEEMS.Data.DTOs;

public class ChainOfEventForCreationDto
{
    [Required(ErrorMessage = "CategoryName is a required field.")]
    [MaxLength(20, ErrorMessage = "Maximum length for the name is 20 characters.")]
    public string CategoryName { get; set; }
    
    [MaxLength(255, ErrorMessage = "Maximum length for url is 255 characters.")]
    public string? ImageUrl { get; set; }
}