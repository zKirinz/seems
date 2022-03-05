namespace SEEMS.Data.ValidationInfo
{
    public class FeedBackValidationInfo
    {
        private const int MinimumContent = 1;
        private const int MaximumContent = 100;
        private const int MinimumRating = 1;
        private const int MaximumRating = 5;
        public string Content { get; set; }
        public string Reservation { get; set; }
        public string Rating { get; set; }
        public string Permission { get; set; }
    }
}
