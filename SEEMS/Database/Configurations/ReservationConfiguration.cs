using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SEEMS.Models;

namespace SEEMS.Database.Configurations;

public class ReservationConfiguration : IEntityTypeConfiguration<Reservation>
{
    public void Configure(EntityTypeBuilder<Reservation> builder)
    {
        var reservations = new List<Reservation>();
        const int totalEvent = 43;
        const int totalUser = 25;
        int tmpEventId;
        int tmpUserId;
        for (var i = 1; i <= 100; i++)
            reservations.Add(new Reservation
                {
                    Id = -i,
                    Attend = new Random().Next(2) == 1,
                    EventId = new Random().Next(1, totalEvent + 1) * -1,
                    UserId = new Random().Next(1, totalUser + 1) * -1
                })
                ;
        builder.HasData(reservations);
    }
}