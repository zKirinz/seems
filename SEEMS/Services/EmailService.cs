using System.Net;
using System.Net.Mail;
using SEEMS.Data.Entities.RequestFeatures;
using SEEMS.Infrastructures.Commons;
using SEEMS.Models;
using SEEMS.Services.Interfaces;

namespace SEEMS.Services;

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public void SendEmail(EmailMeta model)
    {
        var client = new SmtpClient
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

        var message = new MailMessage
        {
            From = fromEmail,
            Subject = model.Subject,
            Body = model.Message.ToString()
        };
        message.To.Add(toEmail);
        message.IsBodyHtml = true;
        if (model.Attachment != null) message.Attachments.Add(model.Attachment);
        client.SendMailAsync(message);
    }

    public string GetEmailTemplate(EmailTypes types, Dictionary<EmailTypes, string> templates)
    {
        return templates[types];
    }

    public Dictionary<EmailTypes, string> InitTemplates(Reservation reservation)
    {
        var templates = new Dictionary<EmailTypes, string>();

        templates.Add(EmailTypes.InformRegistration, InformRegistrationTemplate(reservation));
        templates.Add(EmailTypes.InformUpdate, InformUpdateEventTemplates(reservation));
        templates.Add(EmailTypes.InformDelete, InformDeleteEventTemplates(reservation));

        return templates;
    }

    private string GetConfigValue(string domain, string key)
    {
        return _configuration[$"{domain}:{key}"];
    }

    private string InformUpdateEventTemplates(Reservation reservation)
    {
        return @"<html>"
               + "<body>"
               + $"<p>Hi {reservation.User.UserName},</p>"
               + "<p>"
               + "This is a friendly reminder that the event you registered has been updated recently"
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

    private string InformDeleteEventTemplates(Reservation reservation)
    {
        return @"<html>"
               + "<body>"
               + $"<p>Hi {reservation.User.UserName},</p>"
               + "<p>"
               + $"Sorry to inform you that the event ${reservation.Event.EventTitle} you registered has been cancelled recently"
               + "</p>"
               + "<p>Best regards,<p>"
               + "<p>SEEM </p>"
               + "</body>"
               + "</html>";
    }

    private string InformRegistrationTemplate(Reservation reservation)
    {
        return @"<html>"
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
               + "<p>Best regards,</p>"
               + "<p>SEEM</p>"
               + "</body>"
               + "</html>";
    }
}