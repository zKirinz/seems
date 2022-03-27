using SEEMS.Contexts;
using SEEMS.Data.Models;
using SEEMS.Infrastructures.Commons;

namespace SEEMS.Data.Repositories.Extensions;

public static class UserRepositoryExtension
{
    public static IQueryable<User> FilterUsersByOrg(this IQueryable<User> users, ApplicationDbContext context,
        string? org)
    {
        return string.IsNullOrWhiteSpace(org)
            ? users
            : users.Where(u => u.OrganizationName == (OrganizationEnum) Enum.Parse(typeof(OrganizationEnum), org));
    }

    public static IQueryable<User> FilterUsersByRole(this IQueryable<User> users, ApplicationDbContext context,
        string? role)
    {
        return string.IsNullOrWhiteSpace(role)
            ? users
            : users.Join(context.UserMetas,
                    user => user.Id, meta => meta.UserId,
                    (user, meta) => new {User = user, UserMeta = meta})
                .Where(userAndRole => userAndRole.UserMeta.MetaValue.Equals(role)).Select(u => u.User);
    }
}