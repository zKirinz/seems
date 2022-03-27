using System.Runtime.InteropServices;
using Newtonsoft.Json;
using SEEMS.Data.Entities.RequestFeatures;

namespace SEEMS.Services;

public enum ResponseStatusEnum
{
    Success,
    Fail,
    Error
}

public class JsendResponse
{
    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public string Status { get; protected set; }

    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public object Data { get; protected set; }

    [JsonProperty("message", NullValueHandling = NullValueHandling.Ignore)]
    public string? Message { get; protected set; }

    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public int? Code { get; protected set; }

    [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
    public PaginationMeta? Pagination { get; protected set; }
}

public class Response : JsendResponse
{
    public Response(ResponseStatusEnum status, [Optional] object data, [Optional] string msg,
        [Optional] int? code, [Optional] PaginationMeta? meta)
    {
        Status = Enum.GetName(status).ToLower();
        Data = data;
        Message = msg;
        if (code == null)
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
        else
            Code = code;

        Pagination = meta;
    }
}