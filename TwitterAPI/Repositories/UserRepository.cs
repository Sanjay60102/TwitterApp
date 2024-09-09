using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TwitterAPI.Entities;

namespace TwitterAPI.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly TwitterContext _context; // Database context for accessing Twitter data
        private readonly IConfiguration _configuration; // Configuration for accessing app settings

        // Constructor to initialize context and configuration
        public UserRepository(TwitterContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // Registers a new user
        public async Task Register(User user)
        {
            try
            {
                await _context.Users.AddAsync(user); // Adds user to context
                await _context.SaveChangesAsync(); // Saves changes to database
            }
            catch (Exception ex)
            {
                // Log exception here
                throw new Exception("An error occured while registering the user.", ex);
            }
            
        }

        // Validates user credentials
        public async Task<User> ValidUser(string email, string password)
        {
            try
            {
                return await _context.Users.SingleOrDefaultAsync(u => u.Email == email && u.Password == password); // Retrieves user by email and password
            }
            catch (Exception ex)
            {
                // Log exception here
                throw new Exception("An error occured while validating the user.",ex);
            }
            
        }

        public async Task<User> GetByUserId(string userId)
        {
            try
            {
                var user = await _context.Users.SingleOrDefaultAsync(u => u.UserId == userId);
                return user;
            }
            catch (Exception ex)
            {
                throw new Exception("Am error occurred while retrieving the tweets by UserId.", ex);
            }
        }

        // Get User details by email id
        public async Task<List<User>> GetByEmail(string email)
        {
            try
            {
                var user = await _context.Users
                    .Where(u => u.Email == email)
                    .ToListAsync();
                return user;

            }
            catch (Exception ex)
            {
                // Log exception here
                throw new Exception("Am error occurred while retrieving the tweets by UserId.", ex);
            }
        }
        

        // Retrieve all users
        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        // Updates user information
        public async Task Update(User user)
        {
            try
            {
                _context.Users.Update(user); //Updates Users
                await _context.SaveChangesAsync(); // Saves changes to database
            }
            catch (Exception ex)
            {
                // Log exception here
                throw new Exception("An error occurred while updating the user.",ex);
            }
            
        }

        public async Task Delete(string userId)
        {
            try
            {
                var user = await _context.Users.SingleOrDefaultAsync(u => u.UserId == userId); // Retrieve user by ID
                if (user != null)
                {
                    _context.Users.Remove(user); // Remove user from the context
                    await _context.SaveChangesAsync(); // Save changes to the database
                }
                else
                {
                    throw new Exception("User not found.");
                }
            }
            catch (Exception ex)
            {
                // Log exception here
                throw new Exception("An error occurred while deleting the user.", ex);
            }
        }






    }
}
