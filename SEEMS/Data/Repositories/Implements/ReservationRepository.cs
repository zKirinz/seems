using Microsoft.EntityFrameworkCore;

using SEEMS.Contexts;
using SEEMS.Data.DTOs;
using SEEMS.Data.Models;
using SEEMS.Models;

namespace SEEMS.Data.Repositories.Implements
{
	public class ReservationRepository : RepositoryBase<Reservation>, IReservationRepository
	{
		private IReservationRepository _reservationRepositoryImplementation;

		public ReservationRepository(ApplicationDbContext context) : base(context)
		{
		}

		public int GetRegisteredNum(int eventId)
		{
			return _context.Reservations.Where(r => r.EventId == eventId).Count();
		}

		public async Task<List<Reservation>> GetReservationsByEventId(int eventId, bool trackChanges) =>
			await FindByCondition(r => r.EventId == eventId, trackChanges)
				.ToListAsync();

		public async Task<IEnumerable<Reservation>> GetReservationsByEventId(DateTime from, bool trackChanges) =>
			await FindByCondition(r => r.CreatedAt <= from.AddMinutes(30) && r.IsEmailed == false,
					trackChanges)
				.ToListAsync();

		public async Task<Reservation> GetReservationAsync(int id, bool trackChanges) =>
			await FindByCondition(r => r.Id == id, trackChanges)
				.SingleOrDefaultAsync();

		public string GetRegisterEventStatus(int reservationId)
		{
			var feedback = _context.FeedBacks.Any(f => f.ReservationId == reservationId);
			var reservation = _context.Reservations.FirstOrDefault(r => r.Id == reservationId);
			var attended = reservation.Attend;
			var registeredEvent = _context.Events.FirstOrDefault(e => e.Id == reservation.EventId);
			string result = null;
			if(DateTime.Now.CompareTo(registeredEvent.EndDate) < 0)
			{
				result = "Pending";
			}
			else
			if(!attended)
			{
				result = "Absent";
			}
			else
			if(feedback)
			{
				result = "Feedbacked";
			}
			else
			{
				result = "Attended";
			}
			return result;
		}

		public IEnumerable<RegisteredEventsDTO> GetListRegisteredEvents(int userId)
		{
			var listReservations = _context.Reservations.Where(x => x.UserId == userId);
			var listRegisteredEventsDTO = new List<RegisteredEventsDTO>();
			var registeredEvent = new RegisteredEventsDTO();
			listReservations.ToList().ForEach(x =>
			{
				var anEvent = _context.Events.FirstOrDefault(e => e.Id == x.EventId);
				registeredEvent = new RegisteredEventsDTO();
				if(anEvent != null)
				{
					registeredEvent.Id = anEvent.Id;
					registeredEvent.EventTitle = anEvent.EventTitle;
					registeredEvent.EventDescription = anEvent.EventDescription;
					registeredEvent.IsPrivate = anEvent.IsPrivate;
					registeredEvent.ImageUrl = anEvent.ImageUrl;
					registeredEvent.Active = anEvent.Active;
					registeredEvent.Location = anEvent.Location;
					registeredEvent.StartDate = anEvent.StartDate;
					registeredEvent.EndDate = anEvent.EndDate;
					registeredEvent.CommentsNum = _context.Comments.Where(c => c.EventId == x.EventId).Count();
					var registeredNum = _context.Reservations.Count(r => r.EventId == anEvent.Id);
					registeredEvent.CanRegister = anEvent.RegistrationDeadline.CompareTo(DateTime.Now) > 0 && (registeredNum == 0 || registeredNum < anEvent.ParticipantNum);
					registeredEvent.OrganizationName = anEvent.OrganizationName.ToString();
					registeredEvent.ReservationId = x.Id;
					registeredEvent.ReservationStatus = GetRegisterEventStatus(x.Id);
					registeredEvent.FeedBack = x.Attend;
					registeredEvent.Attend = x.Attend;
					listRegisteredEventsDTO.Add(registeredEvent);
				}
			});
			return listRegisteredEventsDTO;
		}

		public int GetRegisteredEventsNumOfUser(int userId)
		{
			return _context.Reservations.Where(r => r.UserId == userId).Count();
		}

		public int GetRegisteredEventsNumByStatus(int userId, string status)
		{
			var listReservations = _context.Reservations.Where(x => x.UserId == userId).ToList();
			var result = listReservations.Count(r => GetRegisterEventStatus(r.Id).Equals(status));
			return result;
		}
	}
}
