namespace SEEMS.Services;

public class ValidationMessageGenerator
{
    public static string? GetIntRangeValidateMsg(string field, int checkValue, int min, int max)
    {
        if (checkValue < min ||
            checkValue > max)
            return $"{field} must be from {min} to {max} characters";
        return null;
    }
}