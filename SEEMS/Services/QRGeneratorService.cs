using System.Drawing;
using QRCoder;

namespace SEEMS.Services;

public class QRGeneratorService
{
    public Bitmap GenerateQRCode(string context)
    {
        var qrGenerator = new QRCodeGenerator();
        var qrCodeData = qrGenerator.CreateQrCode(context, QRCodeGenerator.ECCLevel.Q);
        var qrCode = new BitmapByteQRCode(qrCodeData);
        var qrCodeAsBitmapByteArr = qrCode.GetGraphic(20);

        Bitmap qrCodeImage = null;
        using (var ms = new MemoryStream(qrCodeAsBitmapByteArr))
        {
            qrCodeImage = new Bitmap(ms);
        }
        return qrCodeImage;
    }
}