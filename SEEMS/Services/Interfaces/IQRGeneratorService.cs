using System.Drawing;

namespace SEEMS.Services.Interfaces;

public interface IQRGeneratorService
{
    public byte[] GenerateQRCode(string context);
    
    
}