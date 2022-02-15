using Newtonsoft.Json;
using SEEMS.Services.Interfaces;

namespace SEEMS.Services;

public class ControllerBaseServices<T> : IControllerBaseServices<T>
{
    public void AddPaginationHeaders(HttpResponse response, PaginatedList<T> data)
    {
        response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(data.Meta));
    }  
}