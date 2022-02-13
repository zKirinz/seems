using SEEMS.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SEEMS.Services.Interfaces
{
    public interface IRepositoryManager
    {
        IUserRepository User { get; }
        IUserMetaRepository UserMeta { get; }

        Task SaveAsync();
    }
}
