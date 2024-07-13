namespace Carts.Models
{
    public class CartBug
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string? Descrition { get; set; }
        public int CartId { get; set; }
        public Cart Cart { get; set; }
        public Guid Security { get; set; }
    }
}
