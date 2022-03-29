using SEEMS.Data.Repositories;
using SEEMS.Data.Repositories.Implements;

namespace SEEMS.Services.Interfaces;

public interface IRepositoryManager
{
    IUserRepository User { get; }
    IUserMetaRepository UserMeta { get; }

    IEventRepository Event { get; }

    ICommentRepository Comment { get; }

    IReservationRepository Reservation { get; }

    IFeedBackRepository FeedBack { get; }
    
    ILikeCommentRepository LikeComment { get; }

    Task SaveAsync();
}