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

    public string InitEmailContext(Reservation reservation) =>
        @"<html>"
           + "<body>"
                + $"<p>Hi {reservation.User.UserName},</p>"
                + "<p>"
                    + $"This is a friendly reminder that you have a reservation to attend an upcoming event at {reservation.Event.Location}."
                + "</p>"
                + "<ul>"
                    + $"<li>WHAT: {reservation.Event.EventTitle}</li>"
                    + $"<li>WHEN: {reservation.Event.StartDate} - {reservation.Event.EndDate}</li>"
                    + $"<li>WHERE: {reservation.Event.Location}</li>" 
                    + $"<li>DESCRIPTION: {reservation.Event.EventDescription}</li>"
                + "</ul>"
                + $"<p>Don't forget to get your attached QR code at {reservation.Event.StartDate} for taking attendance!!!</p>"
                + "<p>Best,</p>"
                + "<p>SEEM</p>"
           + "</body>"
        + "</html>";
   
}