namespace SEEMS.Services
{
    public class JsendResponse
    {
        public String Status { get; internal set; }
        public String Data { get; set; }

        public JsendResponse()
        {
            Status = "error";
            Data = "null";
        }

        public JsendResponse(String status, String data)
        {
            Status = status;
            Data = data;
        }
    }

    public class SuccessResponse : JsendResponse
    {
        public SuccessResponse(String data)
        {
            Status = "success";
            Data = data;
        }
    }

}
