using Microsoft.EntityFrameworkCore;

namespace Carts.Models
{
    public class ApplicationDB : DbContext
    {
        public ApplicationDB() { }
        public ApplicationDB(DbContextOptions<ApplicationDB> options)
        : base(options)
        {
        }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartBug> CartBugs { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer(
                ""
                );
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

    }
}
