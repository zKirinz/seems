using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SEEMS.Configs
{
    public class AppSettings
    {
        public GoogleSettings? GoogleSettings { get; set; }
       
    }

    public class GoogleSettings
    {
        public string ClientID { get; set; }
    }
}
