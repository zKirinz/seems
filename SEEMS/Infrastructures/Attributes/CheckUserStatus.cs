using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SEEMS.Data.Models;
using SEEMS.Services;
using SEEMS.Services.Interfaces;

namespace SEEMS.Infrastructures.Attributes;

public class CheckUserStatus : ActionFilterAttribute
{
    private IAuthManager? _authManager;
    private IRepositoryManager? _repoManager;

    public override void OnActionExecuting(ActionExecutingContext context)
    {
        _authManager = context.HttpContext.RequestServices.GetService<IAuthManager>();
        _repoManager = context.HttpContext.RequestServices.GetService<IRepositoryManager>();
        var email = _authManager.GetCurrentEmail(context.HttpContext.Request);
        var user = GetUserFromEmailAsync(email).Result;
        if (user == null)
        {
            DisplayResponse(context, "", 400, "User is not authorized yet!");
        }
        else
        {
            if (!user.Active) DisplayResponse(context, new {ErrorCode = "BANNED_USER"}, 200, "User is banned!");
        }
    }

    private async Task<User> GetUserFromEmailAsync(string email)
    {
        return await _repoManager.User.GetUserAsync(email, false);
    }

    private void DisplayResponse(ActionExecutingContext context, object data, int statusCode, string message)
    {
        context.HttpContext.Response.StatusCode = statusCode;
        var currentHttpStatusCode = statusCode != 200 ? ResponseStatusEnum.Fail : ResponseStatusEnum.Success;
        context.Result = new JsonResult(new Response(currentHttpStatusCode, data, message, statusCode));
    }
}