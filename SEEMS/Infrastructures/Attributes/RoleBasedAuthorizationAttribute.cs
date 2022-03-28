using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Net.Http.Headers;
using SEEMS.Data.Models;
using SEEMS.Services;
using SEEMS.Services.Interfaces;

namespace SEEMS.Infrastructures.Attributes;

public class RoleBasedAuthorizationAttribute : Attribute, IAuthorizationFilter
{
    private IAuthManager? _authManager;
    private IRepositoryManager? _repoManager;

    public string? RoleBased { get; set; }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        _authManager = context.HttpContext.RequestServices.GetService<IAuthManager>();
        _repoManager = context.HttpContext.RequestServices.GetService<IRepositoryManager>();

        if (context.HttpContext.Request.Headers.TryGetValue(HeaderNames.Authorization, out var headers))
        {
            var token = headers.First();
            var currentEmail = _authManager?.DecodeToken(token).Claims.FirstOrDefault(x => x.Type == "email")?.Value;

            var role = _repoManager?.UserMeta.GetRolesAsync(currentEmail, false).Result.MetaValue;

            if (!IsValidTokenByEmail(currentEmail, role)) DisplayResponse(context, 401, "Your token is invalid");

            if (!ValidRoles(RoleBased, role))
            {
                DisplayResponse(context, 403, $"{role} is not allowed to operate this process");
            }
            else
            {
                context.HttpContext.Response.Headers.Add(HeaderNames.Authorization, $"{token}");
            }
        }
        else
        {
            DisplayResponse(context, 401, "You are not authorized");
        }
    }

    private bool ValidRoles(string complexRole, string valueToCompare)
    {
        return complexRole.Split(',').Contains(valueToCompare);
    }

    private async Task<User> GetUserFromEmailAsync(string email)
    {
        return await _repoManager.User.GetActiveUserAsync(email, false);
    }

    private bool IsValidTokenByEmail(string email, string role)
    {
        var userFromEmail = GetUserFromEmailAsync(email).Result;

        return userFromEmail != null && ValidRoles(RoleBased, role);
    }

    private void DisplayResponse(AuthorizationFilterContext context, int statusCode, string message)
    {
        context.HttpContext.Response.StatusCode = statusCode;
        var currentHttpStatusCode = statusCode != 200 ? ResponseStatusEnum.Fail : ResponseStatusEnum.Success;

        context.Result = new JsonResult(new Response(currentHttpStatusCode, "", message, statusCode));
    }
}