using System.Diagnostics.CodeAnalysis;
using SEEMS.Data.Models;
using SEEMS.Models;

namespace SEEMS.Services.Utils;

public class UserEqualityComparer : EqualityComparer<User>
{
    public override bool Equals(User? x, User? y)
    {
        return x.Email.Equals(y.Email, StringComparison.CurrentCultureIgnoreCase);
    }

    public override int GetHashCode([DisallowNull] User obj)
    {
        throw new NotImplementedException();
    }
}

public class UserMetaEqualityComparer : EqualityComparer<UserMeta>
{
    public override bool Equals(UserMeta? x, UserMeta? y)
    {
        return x.UserId == y.UserId &&
               x.MetaKey.Equals(y.MetaKey, StringComparison.CurrentCultureIgnoreCase);
    }

    public override int GetHashCode([DisallowNull] UserMeta obj)
    {
        throw new NotImplementedException();
    }
}

public class EventEqualityComparer : EqualityComparer<Event>
{
    public override bool Equals(Event? x, Event? y)
    {
        return x.EventTitle.Equals(y.EventTitle, StringComparison.CurrentCultureIgnoreCase)
               && x.StartDate.Equals(y.StartDate);
    }

    public override int GetHashCode([DisallowNull] Event obj)
    {
        throw new NotImplementedException();
    }
}