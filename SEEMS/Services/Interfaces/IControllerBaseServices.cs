namespace SEEMS.Services.Interfaces;

public interface IControllerBaseServices<T>
{
    public void AddPaginationHeaders(HttpResponse response, PaginatedList<T> data);
}