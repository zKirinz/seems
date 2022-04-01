namespace SEEMS.Infrastructures.Commons;

public class Dictionaries
{
    public static readonly Dictionary<TrackingState, EmailTypes> MsgTemplates =
        new()
        {
            {TrackingState.Create, EmailTypes.InformRegistration},
            {TrackingState.Update, EmailTypes.InformUpdate},
            {TrackingState.Delete, EmailTypes.InformDelete}
        };

    public static readonly Dictionary<TrackingState, string> SubjectTemplates =
        new()
        {
            {TrackingState.Create, "QR code for upcoming {eventName} event"},
            {TrackingState.Update, "Update information of upcoming {eventName} event"},
            {TrackingState.Delete, "The event {eventName} you registered has been cancelled recently"}
        };

    public static string ParseArguments(string oldValue, string newValue, string termToReplace)
    {
        return termToReplace.Replace(oldValue, newValue);
    }
}
