using AutoMapper;
using Quartz;
using SEEMS.Services.Interfaces;

namespace SEEMS.Services.Jobs;

public class UpdateEventActiveness : IJob
{
    private readonly ILogger<UpdateEventActiveness> _logger;
    private readonly IMapper _mapper;
    private readonly IRepositoryManager _repoManager;

    public UpdateEventActiveness(ILogger<UpdateEventActiveness> logger, IRepositoryManager repoManager, IMapper mapper)
    {
        _logger = logger;
        _repoManager = repoManager;
        _mapper = mapper;
    }

    public Task Execute(IJobExecutionContext context)
    {
        _logger.LogInformation($"Update Activeness for Events: {context.JobDetail.JobType}");

        var result = _repoManager.Event.GetAllEventsAboutToStartIn30Min(DateTime.UtcNow, false).Result;
        if (!result.Any()) _logger.LogInformation("No event is about going to start in 30 minutes");
        foreach (var @event in result)
        {
            var diff = @event.StartDate.Subtract(DateTime.Now).Minutes;
            _logger.LogInformation($"Event: {@event.EventTitle} about to start in {diff} minutes");
            if (!@event.Active)
            {
                @event.Active = true;
                var temp = _repoManager.Event.GetEventAsync(@event.Id, true).Result;
                _mapper.Map(@event, temp);
                _repoManager.SaveAsync();

                _logger.LogInformation($"Update activeness into => {@event}");
            }
        }

        return Task.CompletedTask;
    }
}