using Microsoft.AspNetCore.Mvc;

using System.Runtime.InteropServices;

namespace SEEMS.Services
{
	public enum ResponseStatusEnum
	{
		Success,
		Fail,
		Error
	}

	public class JsendResponse
	{
		public String Status { get; protected set; }
		public Object Data { get; protected set; }

		public String? Message { get; protected set; }

		public int? Code { get; protected set; }
	}

	public class Response : JsendResponse
	{
		public Response(ResponseStatusEnum status, Object data, [Optional] String msg, [Optional] int code)
		{
			Status = Enum.GetName(status).ToLower();
			Data = data;
			Message = msg;
			Code = code;
		}
	}

	/*public class SuccessResponse : JsendResponse
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
	}*/

}
