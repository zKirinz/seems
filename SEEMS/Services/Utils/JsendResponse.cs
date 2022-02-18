using Microsoft.AspNetCore.Mvc;

using Newtonsoft.Json;

using System.Runtime.InteropServices;
using System.Text.Json.Serialization;

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
		[JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
		public String Status { get; protected set; }
		[JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
		public Object Data { get; protected set; }
		[JsonProperty("message", NullValueHandling = NullValueHandling.Ignore)]
		public String? Message { get; protected set; }
		[JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
		public int? Code { get; protected set; }
	}

	public class Response : JsendResponse
	{
		public Response(ResponseStatusEnum status, [Optional] Object data, [Optional] String msg, [Optional] int? code)
		{
			Status = Enum.GetName(status).ToLower();
			Data = data;
			Message = msg;
			if (code == null)
			{
				switch (status)
				{
					case ResponseStatusEnum.Success:
						Code = 200;
						break;
					case ResponseStatusEnum.Fail:
						Code = 400;
						break;
					case ResponseStatusEnum.Error:
						Code = 500;
						break;
				}
			}
			else
				Code = code;
		}
	}
}
