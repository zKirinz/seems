using AutoMapper;
using Quartz;
using SEEMS.Services.Interfaces;

namespace SEEMS.Services.Jobs;

public class InactivateEventJob : IJob
{
    private readonly ILogger<InactivateEventJob> _logger;
    private readonly IMapper _mapper;
    private readonly IRepositoryManager _repoManager;

    public InactivateEventJob(ILogger<InactivateEventJob> logger, IRepositoryManager repoManager, IMapper mapper)
    {
        _logger = logger;
        _repoManager = repoManager;
        _mapper = mapper;
    }

    public Task Execute(IJobExecutionContext context)
    {
        _logger.LogInformation($"Inactivate events: {context.JobDetail.JobType}");

        var result = _repoManager.Event.GetAllEventsShouldBeChangedToInactive(DateTime.UtcNow, false).Result;
        if (!result.Any()) _logger.LogInformation("No event is about going to end");
        foreach (var @event in result)
        {
            var diff = @event.EndDate.Subtract(DateTime.Now).Minutes;
            _logger.LogInformation($"Event: {@event.EventTitle} about to end in {diff} minutes");
            if (@event.Active)
            {
                @event.Active = false;
                var temp = _repoManager.Event.GetEventAsync(@event.Id, true).Result;
                _mapper.Map(@event, temp);
                _repoManager.SaveAsync();
                _logger.LogInformation($"Update activeness into => {@event}");
            }
        }

        return Task.CompletedTask;
    }
}