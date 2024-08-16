using Microsoft.EntityFrameworkCore;

namespace TwitterAPI.Entities
{
    // This class represents the database context for the Twitter API application, inheriting from DbContext.
    // It manages the entities and their relationships and provides methods to query and save data.
    public class TwitterContext : DbContext
    {
        private readonly IConfiguration _configuration;

        // Constructor that takes an IConfiguration object, used for accessing the application's configuration settings.
        // It allows the context to access the connection string or other configuration data.
        public TwitterContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // Represents the tables in the database.
        // DbSet allows CRUD operations on the User entities.
        public DbSet<User> Users { get; set; }
        public DbSet<Tweet> Tweets { get; set; }
        public DbSet<Follow> Follows { get; set; }

        // Method to configure the model and its relationships using Fluent API.
        // This is where you can define database schema details such as table relationships and indexes.
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // Ensures the base implementation of OnModelCreating is called.

            // Ensures that the Email property in the User entity is unique.
            // This creates a unique index on the Email column in the Users table.
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
        }

        // Method to configure the database connection.
        // It sets up the database provider (SQL Server in this case) and specifies the connection string.
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // UseSqlServer is an extension method provided by Microsoft.EntityFrameworkCore.SqlServer
            // It configures the context to connect to a SQL Server database.
            // The connection string name "TwitterConnection" should be defined in the application's configuration file.
            optionsBuilder.UseSqlServer(_configuration.GetConnectionString("TwitterConnection"));
        }
    }
}
