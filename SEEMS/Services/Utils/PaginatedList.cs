using SEEMS.Data.Entities.RequestFeatures;

namespace SEEMS.Services;

public class PaginatedList<T> : List<T>
{
    public PaginatedList(List<T> items, int count, int pageNumber, int pageSize)
    {
        Meta = new PaginationMeta
        {
            TotalCount = count,
            PageSize = pageSize,
            CurrentPage = pageNumber,
            TotalPages = (int) Math.Ceiling(count / (double) pageSize)
        };

        AddRange(items);
    }

    public PaginationMeta Meta { get; set; }

    public static PaginatedList<T> Create(List<T> source, int pageIndex, int pageSize)
    {
        var count = source.Count();
        var items = source.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
        return new PaginatedList<T>(items, count, pageIndex, pageSize);
    }

    public static PaginatedList<T> Except(List<T> source, List<T> listToExcept, int pageIndex, int pageSize)
    {
        if (listToExcept.Count == 0) return Create(source, pageIndex, pageSize);
        var items = source.Except(listToExcept).ToList();
        return Create(items, pageIndex, pageSize);
    }
}