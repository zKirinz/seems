namespace SEEMS.Services.Utils
{
	public class PagedList<T> : List<T>
	{
		public int ResultCount { get; set; }
	}
}
