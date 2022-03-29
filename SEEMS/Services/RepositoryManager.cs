using SEEMS.Contexts;
using SEEMS.Data.Repositories;
using SEEMS.Data.Repositories.Implements;
using SEEMS.Services.Interfaces;

namespace SEEMS.Services;

public class RepositoryManager : IRepositoryManager
{
    private ICommentRepository _commentRepository;

    private readonly ApplicationDbContext _context;
    private IEventRepository _eventRepository;
    private IFeedBackRepository _feedBackRepository;
    private IReservationRepository _reservationRepository;
    private IUserMetaRepository _userMetaRepository;
    private IUserRepository _userRepository;
    private ILikeCommentRepository _likeCommentRepository;

    public RepositoryManager(ApplicationDbContext context)
    {
        _context = context;
    }

    public IUserRepository User
    {
        get
        {
            if (_userRepository == null) _userRepository = new UserRepository(_context);

            return _userRepository;
        }
    }

    public IUserMetaRepository UserMeta
    {
        get
        {
            if (_userMetaRepository == null) _userMetaRepository = new UserMetaRepository(_context);

            return _userMetaRepository;
        }
    }

    public IEventRepository Event
    {
        get
        {
            if (_eventRepository == null) _eventRepository = new EventRepository(_context);
            return _eventRepository;
        }
    }

    public ICommentRepository Comment
    {
        get
        {
            if (_commentRepository == null) _commentRepository = new CommentRepository(_context);
            return _commentRepository;
        }
    }

    public IReservationRepository Reservation
    {
        get
        {
            if (_reservationRepository == null) _reservationRepository = new ReservationRepository(_context);
            return _reservationRepository;
        }
    }

    public IFeedBackRepository FeedBack
    {
        get
        {
            if (_feedBackRepository == null) _feedBackRepository = new FeedbackRepository(_context);
            return _feedBackRepository;
        }
    }

    public ILikeCommentRepository LikeComment
    {
        get
        {
            if (_likeCommentRepository == null) _likeCommentRepository = new LikeCommentRepository(_context);
            return _likeCommentRepository;
        }
    }

    public Task SaveAsync()
    {
        return _context.SaveChangesAsync();
    }

    private void RegisterRepositories()
    {
    }
}