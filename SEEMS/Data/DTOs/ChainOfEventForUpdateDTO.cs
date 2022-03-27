using System.ComponentModel.DataAnnotations;

namespace SEEMS.Data.DTOs;

public class ChainOfEventForUpdateDTO
{
    [Required(ErrorMessage = "CategoryName is a required field.")]
    [MaxLength(100, ErrorMessage = "Maximum length for the name is 100 characters.")]
    public string CategoryName { get; set; }


    [MaxLength(255, ErrorMessage = "Maximum length for the url is 255 characters.")]
    public string? ImageUrl { get; set; }
}