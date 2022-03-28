using System.ComponentModel.DataAnnotations;
using System.Net.Mail;

namespace SEEMS.Data.Entities.RequestFeatures;

public class EmailMeta
{
    [Required] public string FromName { get; set; }

    [Required] [EmailAddress] public string FromEmail { get; set; }

    [Required] [EmailAddress] public string ToEmail { get; set; }

    [Required] public string Subject { get; set; }

    [Required] public object Message { get; set; }

    public Attachment? Attachment { get; set; }
}