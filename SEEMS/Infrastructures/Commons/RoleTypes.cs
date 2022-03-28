namespace SEEMS.Infrastructures.Commons;

public class RoleTypes
{
    public const string User = "User";
    public const string Admin = "Admin";
    public const string Organizer = "Organizer";
    public const string AdminOrOrganizer = $"{Admin},{Organizer}";
}