using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SEEMS.Services;

namespace SEEMS.Infrastructures.Attributes;

public class ValidateModelAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        if (context.ModelState.IsValid) return;
        var errors = context.ModelState.Values.Where(v => v.Errors.Count > 0)
            .SelectMany(v => v.Errors)
            .Select(v => v.ErrorMessage)
            .ToList();
        context.HttpContext.Response.StatusCode = 422;
        context.Result = new JsonResult(new Response(ResponseStatusEnum.Fail, errors[0],
            "Some fields didn't match requirements", 422));
    }
}