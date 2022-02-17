using SEEMS.Data.DTO;
using SEEMS.Data.ValidationInfo;

namespace SEEMS.Services
{
	public class ValidationMessageGenerator
	{
		public static string? GetIntRangeValidateMsg(String field, int checkValue, int min, int max)
		{
			if (checkValue < min ||
				checkValue > max)
			{
				return $"{field} must be from {min} to {max} length";
			}
			return null;
		}
	}
}
