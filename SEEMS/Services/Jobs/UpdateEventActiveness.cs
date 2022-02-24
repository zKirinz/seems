using System.ComponentModel;
using AutoMapper;
using Quartz;
using SEEMS.Services.Interfaces;

namespace SEEMS.Services.Jobs;

public class UpdateEventActiveness : IJob
{

    private readonly IRepositoryManager _repoManager;
    private readonly IMapper _mapper;
    private readonly ILogger<UpdateEventActiveness> _logger;

    public UpdateEventActiveness(ILogger<UpdateEventActiveness> logger, IRepositoryManager repoManager, IMapper mapper)
    {
        _logger = logger;
        _repoManager = repoManager;
        _mapper = mapper;
    } 
    
    public Task Execute(IJobExecutionContext context)
    {

        _logger.LogInformation($"Update Activeness for Events: {context.JobDetail.JobType}");
        var x = _repoManager.Event.GetEventsAboutToStartAsync().Result;
        
        foreach (var @event in x)
        {
            @event.Active = true;
            var id = @event.Id;
            var newEvent = _repoManager.Event.GetEventAsync(@event.Id, true).Result;
            
            _mapper.Map(@event, newEvent);
        }

        _repoManager.SaveAsync();
        
        return Task.CompletedTask;
    }
}