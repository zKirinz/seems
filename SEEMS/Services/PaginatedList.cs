using SEEMS.Data.Entities.RequestFeatures;
using SEEMS.Data.Models;

namespace SEEMS.Services
{
	public class PaginatedList<T> : List<T>
	{
		
		public PagingData PagingData { get; set; }

		public PaginatedList(List<T> items, int count, int pageIndex, int pageSize)
		{
			PagingData = new PagingData
			{
				TotalCount = count,
				PageSize = pageSize,
				CurrentPage = pageIndex,
				TotalPages = (int) Math.Ceiling(count / (double) pageSize)
			};
			
			AddRange(items);
		}

		public static PaginatedList<T> Create(List<T> source, int pageIndex, int pageSize)
		{
			var count = source.Count();
			var items = source.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
			return new PaginatedList<T>(items, count, pageIndex, pageSize);
		}
	}
}
