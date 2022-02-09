using Microsoft.AspNetCore.Mvc;

namespace SEEMS.Services
{
	public class JsendResponse
	{
		public String Status { get; protected set; }
		public Object Data { get; protected set; }

	}

	public class SuccessResponse : JsendResponse
	{
		public SuccessResponse(Object data)
		{
			Status = "success";
			Data = data;
		}
	}

	public class FailResponse : JsendResponse
	{
		public FailResponse(Object failDetailObject)
		{
			Status = "fail";
			Data = failDetailObject;
		}
	}

	public class ErrorResponse : JsendResponse
	{
		public int? Code { get; private set; }
		public String? Message { get; private set; }

		public ErrorResponse(String message)
		{
			Message = message;
		}
		public ErrorResponse(String msg, int code)
		{
			Code = code;
			Message = msg;
		}
		public ErrorResponse(String msg, int code, Object data)
		{
			Message = msg;
			Code = code;
			Data = data;
		}
	}

}
