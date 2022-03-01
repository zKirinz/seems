namespace SEEMS.Data.Entities.RequestFeatures;

public abstract class PaginationParams
{
    const int maxPageSize = 50;
    private const int minPageNumber = 1;

    private int _pageNumber;
    
    public int PageNumber
    {
        get => _pageNumber;
        set => _pageNumber = value < minPageNumber ? minPageNumber : value;
    }

    private int _pageSize = maxPageSize;

    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = value > maxPageSize ? maxPageSize : value;
    }
}