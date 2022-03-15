using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Text;
using Microsoft.AspNetCore.Identity.UI.V4.Pages.Account.Manage.Internal;
using SEEMS.Data.Entities.RequestFeatures;
using SEEMS.Models;
using SEEMS.Services.Interfaces;

namespace SEEMS.Services;

public class EmailService : IEmailService
{

    private IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    
    public void SendEmail(EmailMeta model)
    {
        var client = new SmtpClient()
        {
            Host = "smtp.gmail.com",
            Port = 587,
            EnableSsl = true,
            DeliveryMethod = SmtpDeliveryMethod.Network,
            UseDefaultCredentials = false,
            Credentials = new NetworkCredential
            {
                UserName = "noreply.seem@gmail.com",
                Password = "123456789,Seem"
            }
        };
        
        var fromEmail = new MailAddress("noreply.seem@gmail.com", "noreply");
        var toEmail = new MailAddress(model.ToEmail);
        
        var message = new MailMessage()
        {
            From = fromEmail,
            Subject = model.Subject,
            Body = model.Message.ToString()
        };
        message.To.Add(toEmail);
        message.IsBodyHtml = true;
        message.Attachments.Add(model.Attachment);
        client.SendMailAsync(message);
    }

    private string GetConfigValue(string domain, string key)
    {
        return _configuration[$"{domain}:{key}"];
    }

    public string InitEmailContext(Reservation reservation)
    {
        var message = new StringBuilder();
        
        message.Append($"<html>Dear {reservation.User.UserName}, ");
        message.AppendLine($"Xin gửi tới bạn thông tin về sự kiện sắp tới:<br>");
        message.AppendLine($"Event: {reservation.Event.EventTitle}<br>");
        message.AppendLine($"Location: {reservation.Event.Location}<br>");
        message.AppendLine($"Start at: {reservation.Event.StartDate}<br>");
        message.AppendLine($"End at: {reservation.Event.EndDate}<br>");
        message.AppendLine($"Description: {reservation.Event.EventDescription}</html>");
        
        return message.ToString();
    }
}