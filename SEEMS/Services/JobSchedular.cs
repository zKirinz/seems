using System.Diagnostics;
using Quartz;
using Quartz.Spi;
using SEEMS.Data.Entities.RequestFeatures;
using SEEMS.Services.Interfaces;

namespace SEEMS.Services;

public class JobSchedular : IHostedService
{
    private readonly IJobFactory _jobFactory;
    private readonly List<JobMeta> _jobMeta;
    private readonly ISchedulerFactory _schedulerFactory;

    public JobSchedular(ISchedulerFactory schedulerFactory, List<JobMeta> jobMeta, IJobFactory jobFactory)
    {
        _jobFactory = jobFactory;
        _schedulerFactory = schedulerFactory;
        _jobMeta = jobMeta;
    }

    public IScheduler Scheduler { get; set; }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        Scheduler = await _schedulerFactory.GetScheduler();
        var serviceCollection = new ServiceCollection();
        serviceCollection.AddScoped<IRepositoryManager, RepositoryManager>();
        var serviceProvider = serviceCollection.BuildServiceProvider();

        Scheduler.JobFactory = _jobFactory;

        _jobMeta.ForEach(jobMetadata =>
        {
            var jobDetail = CreateJob(jobMetadata);
            var trigger = CreateTrigger(jobMetadata);
            Scheduler.ScheduleJob(jobDetail, trigger, cancellationToken).GetAwaiter();
        });
        await Scheduler.Start(cancellationToken);
    }

    public async Task StopAsync(CancellationToken cancellationToken)
    {
        Debug.Assert(Scheduler != null, nameof(Scheduler) + " != null");
        await Scheduler.Shutdown();
    }

    private ITrigger CreateTrigger(JobMeta jobMetadata)
    {
        return TriggerBuilder.Create()
            .WithIdentity(jobMetadata.JobId.ToString())
            .WithCronSchedule(jobMetadata.CronExpression)
            .WithDescription(jobMetadata.JobName)
            .Build();
    }

    private IJobDetail CreateJob(JobMeta jobMetadata)
    {
        return JobBuilder.Create(jobMetadata.JobType)
            .WithIdentity(jobMetadata.JobId.ToString())
            .WithDescription(jobMetadata.JobName)
            .Build();
    }
}