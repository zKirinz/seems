using SEEMS.Data.Entities.RequestFeatures;

namespace SEEMS.Services.Interfaces;

public interface IEmailService
{
    void SendEmail(EmailMeta model);
}