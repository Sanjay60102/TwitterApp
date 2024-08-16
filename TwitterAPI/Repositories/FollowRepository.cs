using Microsoft.EntityFrameworkCore;
using TwitterAPI.Entities;

namespace TwitterAPI.Repositories
{
    public class FollowRepository : IFollowRepository
    {
        private readonly TwitterContext _context; // Database context for accessing Twitter data
        private readonly IConfiguration _configuration; // Configuration for accessing app settings
        // Constructor to initialize the database context and configuration
        public FollowRepository(TwitterContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // Method to add a new follow relationship
        public async Task AddFollowing(Follow follow)
        {
            try
            {
                await _context.Follows.AddAsync(follow); // Add follow relationship to the database
                await _context.SaveChangesAsync(); // Save changes to the database
            }
            catch (Exception ex)
            {
                // Log the exception (ex) here
                throw new Exception("An error occurred while adding the following relationship.", ex);
            }
        }

        // Method to retrieve followers of a specific user
        public async Task<IEnumerable<User>> GetFollowers(string followingId)
        {
            try
            {
                var followers = await _context.Follows
                                              .Where(f => f.FollowingId == followingId) // Find follow relationships where the user is being followed
                                              .Select(f => f.Follower) // Select the follower users
                                              .ToListAsync(); // Convert the result to a list
                return followers;
            }
            catch (Exception ex)
            {
                // Log the exception (ex) here
                throw new Exception("An error occurred while retrieving the followers.", ex);
            }
        }

        // Method to retrieve users that a specific user is following
        public async Task<IEnumerable<User>> GetFollowings(string userId)
        {
            try
            {
                var followingIds = await _context.Follows
                                                 .Where(f => f.UserId == userId) // Find follow relationships where the user is following others
                                                 .Select(f => f.FollowingId) // Select the followed user IDs
                                                 .ToListAsync();

                var followings = await _context.Users
                                               .Where(u => followingIds.Contains(u.UserId)) // Find users by their IDs
                                               .ToListAsync(); // Convert the result to a list
                return followings;
            }
            catch (Exception ex)
            {
                // Log the exception (ex) here
                throw new Exception("An error occurred while retrieving the followings.", ex);
            }
        }

        // Method to remove a follow relationship
        public async Task RemoveFollowing(string userId, string followingId)
        {
            try
            {
                var follow = await _context.Follows.FirstOrDefaultAsync(f => f.UserId == userId && f.FollowingId == followingId); // Find the follow relationship
                if (follow != null)
                {
                    _context.Follows.Remove(follow); // Remove the follow relationship
                    await _context.SaveChangesAsync(); // Save changes to the database
                }
                else
                {
                    throw new Exception("Follow relationship not found.");
                }
            }
            catch (Exception ex)
            {
                // Log the exception (ex) here
                throw new Exception("An error occurred while removing the following relationship.", ex);
            }
        }
    }
}
