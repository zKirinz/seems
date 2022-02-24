using System.Diagnostics;
using Quartz;
using Quartz.Spi;
using SEEMS.Data.Entities.RequestFeatures;
using SEEMS.Services.Interfaces;

namespace SEEMS.Services;

public class JobSchedular : IHostedService
{
    public IScheduler Scheduler { get; set; }
    private readonly IJobFactory jobFactory;
    private readonly List<JobMeta> jobMetadatas;
    private readonly ISchedulerFactory schedulerFactory;

    public JobSchedular(ISchedulerFactory schedulerFactory, List<JobMeta> jobMetadatas, IJobFactory jobFactory)
    {
        this.jobFactory = jobFactory;
        this.schedulerFactory = schedulerFactory;
        this.jobMetadatas = jobMetadatas;
    }
    public async Task StartAsync(CancellationToken cancellationToken)
    {
        Scheduler = await schedulerFactory.GetScheduler();
        var serviceCollection = new ServiceCollection();
        serviceCollection.AddScoped<IRepositoryManager, RepositoryManager>();
        var serviceProvider = serviceCollection.BuildServiceProvider();
        
        Scheduler.JobFactory = jobFactory;

        jobMetadatas.ForEach(jobMetadata =>
        {
            IJobDetail jobDetail = CreateJob(jobMetadata);
            ITrigger trigger = CreateTrigger(jobMetadata);
            Scheduler.ScheduleJob(jobDetail, trigger, cancellationToken).GetAwaiter();
        });
        await Scheduler.Start(cancellationToken);
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

    public async Task StopAsync(CancellationToken cancellationToken)
    {
        Debug.Assert(Scheduler != null, nameof(Scheduler) + " != null");
        await Scheduler.Shutdown();
    } 
}