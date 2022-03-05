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
        
        IOrganizationRepository Organization { get; }

		IEventRepository Event { get; }

		ICommentRepository Comment { get; }

		Task SaveAsync();
	}
}
