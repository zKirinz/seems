using SEEMS.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SEEMS.Data.Repositories.Implements;

namespace SEEMS.Services.Interfaces
{
    public interface IRepositoryManager
    {
        IUserRepository User { get; }
        IUserMetaRepository UserMeta { get; }
        
        IChainOfEventsRepository ChainOfEvent { get; }
        
        IOrganizationRepository Organization { get; }

        Task SaveAsync();
    }
}
