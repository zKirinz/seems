namespace SEEMS.Infrastructures.Commons;

public enum OrganizationEnum
{
    FPTU = 0,
    FCode = 1,
    DSC = 2,
    FPTer = 3
}

public class OrganizationEnumHelper
{
    public static OrganizationEnum ToEnum(string s)
    {
        switch (s)
        {
            case "FPTU":
                return OrganizationEnum.FPTU;
            case "F-Code":
            case "FCode":
                return OrganizationEnum.FCode;
            case "DSC":
                return OrganizationEnum.DSC;
            case "FPTEr":
            case "FPT-er":
            case "FPT-Er":
                return OrganizationEnum.FPTer;
            default:
                return OrganizationEnum.FPTer;
        }
    }
}