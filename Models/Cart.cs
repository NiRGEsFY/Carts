using Microsoft.EntityFrameworkCore;

namespace Carts.Models
{
    [Index(nameof(Number), IsUnique = true)]
    public class Cart
    {
        public int Id { get; set; }
        public string Mark {  get; set; }
        public string Number { get; set; }
        public double Weight { get; set; }
        public int? BugId { get; set; }
        public List<CartBug>? CartBugs { get; set; }
        public Guid Security {  get; set; }
        public DateTime Changed {  get; set; }
    }
}
