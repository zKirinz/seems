namespace SEEMS.Services
{
	public class Utilitiies
	{
		public static bool isAfterMinutes(DateTime src, DateTime des, int minutes)
		{
			return src.Subtract(des).TotalMinutes >= minutes;
		}
	}
}
