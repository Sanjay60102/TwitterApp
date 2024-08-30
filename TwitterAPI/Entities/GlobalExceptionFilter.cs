using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;

namespace TwitterAPI.Entities
{
    public class GlobalExceptionFilter
    {

        public void OnException(ExceptionContext context)
        {
            //var statusCode = context.Exception switch
            //{
            //    NotFoundException => StatusCodes.Status404NotFound,

            //    ValidationException => StatusCodes.Status400BadRequest,

            //    UnauthorizedAccessException => StatusCodes.Status401Unauthorized,

            //    _ => StatusCodes.Status500InternalServerError
            //};

            context.Result = new ObjectResult(new
            {
                error = context.Exception.Message,
                stackTrace = context.Exception.StackTrace
            })
            {
                StatusCode = 0
            };
        }
    }
}