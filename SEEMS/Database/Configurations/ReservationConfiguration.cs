using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using SEEMS.Models;

namespace SEEMS.Database.Configurations
{
	public class ReservationConfiguration : IEntityTypeConfiguration<Reservation>
	{
		public void Configure(EntityTypeBuilder<Reservation> builder)
		{
			List<Reservation> reservations = new List<Reservation>();
			const int totalEvent = 43;
			const int totalUser = 25;
			int tmpEventId;
			int tmpUserId;
			for(int i = 1; i <= 200; i++)
			{
				reservations.Add(new Reservation()
				{
					Id = -i,
					Attend = new Random().Next(2) == 1,
					EventId = new Random().Next(1, totalEvent + 1) * -1,
					UserId = new Random().Next(1, totalUser + 1) * -1,
					IsAttendanceChecked = false,
				})
				;
			}
			reservations.ForEach(reservation =>
			{
				if(reservation.UserId >= -1 && reservation.UserId <= -10)
				{
					reservation.UserId -= 10; // -1 -> -10 is Admin user, can not register
				}
			});
			builder.HasData(reservations);
		}
	}
}
