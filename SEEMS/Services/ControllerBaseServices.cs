using Newtonsoft.Json;
using SEEMS.Services.Interfaces;

namespace SEEMS.Services;

public class ControllerBaseServices<T> : IControllerBaseServices<T>
{
    private readonly IConfiguration _config;

    public ControllerBaseServices(IConfiguration config)
    {
        _config = config;
    }

    public string GetUiDomain()
    {
        return _config.GetSection("Domain").GetSection("BaseUiDomain").Value;
    }

    public void AddPaginationHeaders(HttpResponse response, PaginatedList<T> data)
    {
        response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(data.Meta));
    }
}