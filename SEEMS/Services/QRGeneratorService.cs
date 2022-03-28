using System.Drawing;
using System.Drawing.Imaging;
using QRCoder;
using SEEMS.Services.Interfaces;

namespace SEEMS.Services;

public class QRGeneratorService : IQRGeneratorService
{
    public byte[] GenerateQRCode(string context)
    {
        var qrGenerator = new QRCodeGenerator();
        var qrCodeData = qrGenerator.CreateQrCode(context, QRCodeGenerator.ECCLevel.Q);
        var qrCode = new QRCode(qrCodeData);
        return BitmapToBytes(qrCode.GetGraphic(20));
        //return File(BitmapToBytes(qrCodeImage), "image/jpeg");	 
    }

    private static byte[] BitmapToBytes(Bitmap img)
    {
        using (var stream = new MemoryStream())
        {
            img.Save(stream, ImageFormat.Png);
            return stream.ToArray();
        }
    }
}