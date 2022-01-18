namespace SEEMS.Data.DTO
{
    public class EventDTO
    {

        public String EventTitle { get; set; }

        public String EventDescription { get; set; }

        public int? ChainOfEventId { get; set; }

        public bool IsPrivate { get; set; }

        public String ImageUrl { get; set; }

        public decimal ExpectPrice { get; set; }

        public bool Active { get; set; }

        public String Location { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

    }
}
