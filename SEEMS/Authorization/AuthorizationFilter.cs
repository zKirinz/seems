using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace SEEMS.Authorization
{
    public class AuthorizationFilter : ActionFilterAttribute
    {
        private readonly string[] _permissions;

        public AuthorizationFilter(params string[] permissions)
        {
            _permissions = permissions;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var role = (string)context.HttpContext.Items["role"];

            if (role != null)
            {
                foreach (var permissions in _permissions)
                {
                    if (role.Contains(permissions))
                    {
                        base.OnActionExecuting(context);
                    }
                }
            }
            else
                context.Result = new ForbidResult();

        }
    }
}
