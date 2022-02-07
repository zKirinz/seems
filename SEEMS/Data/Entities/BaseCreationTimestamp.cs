using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SEEMS.Data.Entities
{
    public class BaseCreationTimestamp
    {
        public BaseCreationTimestamp()
        {

        }

        public DateTime CreatedAt { get; set; }

        public DateTime? ModifiedAt { get; set; }
    }
}
