using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace SEEMS.Infrastructures.Commons
{
	public enum OrganizationEnum
	{
		FPTU = 0,
		FCode = 1,
		DSC = 2,
		FPTer = 3,
	}


	public class OrganizationEnumHelper
	{
		public static string ToString(OrganizationEnum o)
		{
			switch(o)
			{
				case OrganizationEnum.FPTU:
					return "FPTU";
				case OrganizationEnum.FCode:
					return "F-Code";
				case OrganizationEnum.DSC:
					return "DSC";
				case OrganizationEnum.FPTer:
					return "FPT-er";
				default:
					return "Invalid";
			}
		}

		public static OrganizationEnum ToEnum(string s)
		{
			switch(s)
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
}