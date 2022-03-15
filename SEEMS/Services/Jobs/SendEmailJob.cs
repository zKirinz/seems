using System.ComponentModel;
using System.Drawing;
using System.Net;
using System.Net.Mail;
using AutoMapper;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Quartz;
using SEEMS.Data.Entities.RequestFeatures;
using SEEMS.Models;
using SEEMS.Services.Interfaces;
using static System.Drawing.Imaging.ImageFormat;
using Attachment = System.Net.Mail.Attachment;

namespace SEEMS.Services.Jobs;

public class SendEmailJob : IJob
{
    
    private readonly IRepositoryManager _repoManager;
    private readonly IMapper _mapper; 
    private readonly ILogger<SendEmailJob> _logger;
    private readonly IEmailService _emailService;
    private readonly IQRGeneratorService _qrGenerator;
    private readonly IConfiguration _configuration;

    public SendEmailJob(IRepositoryManager repoManager, IMapper mapper, ILogger<SendEmailJob> logger,
        IEmailService emailService, IQRGeneratorService qrGenerator, IConfiguration configuration)
    {
        _logger = logger;
        _repoManager = repoManager;
        _mapper = mapper;
        _emailService = emailService;
        _qrGenerator = qrGenerator;
        _configuration = configuration;
    }
    
    public Task Execute(IJobExecutionContext context)
    {
        try
        {
            _logger.LogInformation($"Send email: {context.JobDetail.JobType}");

            var list = _repoManager.Reservation.GetReservationsByEventId(DateTime.Now, false).Result;

            foreach (var @reservation in list)
            {
                
                var  mailToUser = new EmailMeta();
                @reservation.Event = _repoManager.Event.GetEventAsync(@reservation.EventId, false).Result;
                @reservation.User = _repoManager.User.GetUserAsync((int) @reservation.UserId, false).Result;

                if (@reservation.Event == null || @reservation.User == null || @reservation.IsEmailed == true)
                {
                    _logger.LogError("hehe");
                }
                mailToUser.ToEmail = @reservation.User.Email;
                mailToUser.Subject = $"Mã QR cho sự {@reservation.Event.EventTitle} yeah sắp tới";
                           
                var payload = new EmailPayload
                {
                   Email = @reservation.User.Email,
                   UserName = @reservation.User.UserName,
                   EventName = @reservation.Event.EventTitle 
                };
                   
                var qr = _qrGenerator.GenerateQRCode(JsonConvert.SerializeObject(payload));
                           
                mailToUser.Attachment = new Attachment(new MemoryStream(qr), "image/png");
                var stream = new MemoryStream(qr);
                           
                mailToUser.Message = _emailService.InitEmailContext(reservation);
                IsEmailedReservation(_repoManager, reservation);
                _emailService.SendEmail(mailToUser);
                _logger.LogInformation($"{mailToUser.Message}");
            }
        } 
        catch (Exception e)
        {
            _logger.LogError(e.Message); 
        }
        
        return Task.CompletedTask;
    }

    private async void IsEmailedReservation(IRepositoryManager repoManager, Reservation reservation)
    {
        reservation.IsEmailed = true;
        var entity = await repoManager.Reservation.GetReservationAsync(reservation.Id, true);
        _mapper.Map(reservation, entity);
        repoManager.SaveAsync();
    }
    
}