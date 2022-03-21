using SEEMS.Data.Entities.RequestFeatures;
using SEEMS.Infrastructures.Commons;
using SEEMS.Models;

namespace SEEMS.Services.Interfaces;

public interface IEmailService
{
    void SendEmail(EmailMeta model);

    public string GetEmailTemplate(EmailTypes types, Dictionary<EmailTypes, string> templates);

    public Dictionary<EmailTypes, string> InitTemplates(Reservation reservation);
}