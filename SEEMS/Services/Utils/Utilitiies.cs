namespace SEEMS.Services;

public class Utilitiies
{
    public static bool IsAfterMinutes(DateTime src, DateTime des, int minutes)
    {
        return src.Subtract(des).TotalMinutes >= minutes;
    }
}