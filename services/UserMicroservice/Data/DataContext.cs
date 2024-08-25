using Microsoft.EntityFrameworkCore;
using UserMicroservice.Model;

namespace UserMicroservice.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        
        // TODO выцеплять конфигурацию из файла конфигурации
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
           => optionsBuilder.UseNpgsql("Host=localhost;Database=users;Username=postgres;Password=postgres;Port=5432");
        //optionsBuilder.UseNpgsql("Host=postgres;Database=users;Username=postgres;Password=postgres;Port=5432");
    }
}
