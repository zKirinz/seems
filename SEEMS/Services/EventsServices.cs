using AutoMapper;

using SEEMS.Contexts;

namespace SEEMS.Services
{
	public class EventsServices
	{
		private readonly ApplicationDbContext _context;
		private readonly IMapper _mapper;

		public EventsServices(ApplicationDbContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

	}
}
