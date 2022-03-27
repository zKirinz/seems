namespace SEEMS.Services.Interfaces;

public interface IControllerBaseServices<T>
{
    public string GetUiDomain();

    public void AddPaginationHeaders(HttpResponse response, PaginatedList<T> data);
}