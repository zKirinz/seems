using SEEMS.Data.Entities.RequestFeatures;
using SEEMS.Models;

namespace SEEMS.Services.Interfaces;

public interface IEmailService
{
    void SendEmail(EmailMeta model);

    public string InitEmailContext(Reservation reservation);
}