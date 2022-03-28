using AutoMapper;
using Quartz;
using SEEMS.Services.Interfaces;

namespace SEEMS.Services.Jobs;

public class InactivateUserJob : IJob
{
    private readonly ILogger<InactivateUserJob> _logger;
    private readonly IMapper _mapper;
    private readonly IRepositoryManager _repoManager;

    public InactivateUserJob(ILogger<InactivateUserJob> logger, IRepositoryManager repoManager, IMapper mapper)
    {
        _logger = logger;
        _repoManager = repoManager;
        _mapper = mapper;
    }

    public Task Execute(IJobExecutionContext context)
    {
        _logger.LogInformation($"Inactivate user: {context.JobDetail.JobType}");

        var users = _repoManager.User.GetAllUsers();
        foreach (var us in users)
        {
            //var us = _repoManager.User.GetUser("thinhltse151082@fpt.edu.vn");
            var consecutiveAbsences = _repoManager.Reservation.GetConsecutiveAbsentNum(us.Id);

            _logger.LogInformation($"User: {us.Email} has {consecutiveAbsences} consecutive absence(s)");
            if (consecutiveAbsences == 3)
            {
                us.Active = false;
                _repoManager.User.UpdateUser(us);
                _repoManager.UserMeta.SaveConsecutiveAbsences(us.Id, 0); //to reset 
                _logger.LogInformation($"User {us.Email} was inactivated because of having 3 consecutive absences");
            }
            else
            {
                _repoManager.UserMeta.SaveConsecutiveAbsences(us.Id, consecutiveAbsences);
            }
        }

        return Task.CompletedTask;
    }
}