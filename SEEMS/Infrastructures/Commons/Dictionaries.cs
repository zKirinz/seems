namespace SEEMS.Infrastructures.Commons;

public class Dictionaries
{
    public static readonly Dictionary<TrackingState, EmailTypes> MsgTemplates =
        new()
        {
            {TrackingState.Update, EmailTypes.InformUpdate},
            {TrackingState.Delete, EmailTypes.InformDelete}
        };

    public static readonly Dictionary<TrackingState, string> SubjectTemplates =
        new()
        {
            {TrackingState.Update, "Update information of upcoming {eventName} event"},
            {TrackingState.Delete, "The event {eventName} you registered has been cancelled recently"}
        };

    public static string ParseArguments(string oldValue, string newValue, string termToReplace)
    {
        return termToReplace.Replace(oldValue, newValue);
    }
}

public class ErrorDictionaries
{
    public static readonly Dictionary<string, string> ErrorConstraints = new()
    {
        {"EventTitleRange", "EventTitle must be from 5 to 100 characters"},
        {"c", "d"}
    };

    public ErrorDictionaries(string key)
    {
        Message = ErrorConstraints[key];
    }

    public string Message { get; set; }
}