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

        // Deletes a user by ID
        public async Task Delete(string id)
        {
            try
            {
                var user = await _context.Users.FindAsync(id); // Finds user by ID
                if (user == null)
                {
                    throw new Exception("User not found");
                }
                _context.Users.Remove(user); // Removes user from context
                await _context.SaveChangesAsync(); // Saves changes to database
            }
            catch (Exception ex)
            {
                // Log exception here
                throw new Exception("An error occurred while deleting the user.", ex);
            }
            
            
        }
    }
}
