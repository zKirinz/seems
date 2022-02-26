namespace SEEMS.Data.Entities.RequestFeatures;

public class UserParams : PaginationParams
{
    public string? Role { get; set; }
    public string? Organization { get; set; }
}