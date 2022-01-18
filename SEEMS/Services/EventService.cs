using AutoMapper;
using SEEMS.Data.DTO;
using SEEMS.Database;
using SEEMS.Models;

namespace SEEMS.Services
{
    public class EventService
    {
        private ApplicationDbContext _context;
        private Mapper _autoMapper;

        public EventService(ApplicationDbContext context, Mapper mapper)
        {
            _context = context;
            _autoMapper = mapper;
        }

        public void AddEvent(EventDTO eventDTO)
        {
            var _event = _autoMapper.Map<EventDTO, Event>(eventDTO);
            _context.Events.Add(_event);
            _context.SaveChanges();
        }
    }
}
