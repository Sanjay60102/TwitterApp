using Microsoft.EntityFrameworkCore;
using TwitterAPI.Entities;

namespace TwitterAPI.Repositories
{
    public class TweetRepository : ITweetRepository
    {
        private readonly TwitterContext _context; // Database context for accessing Twitter data
        private readonly IConfiguration _configuration; // Configuration for accessing app settings

        // Constructor to initialize context and configuration
        public TweetRepository(TwitterContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // Add a new tweet to the database
        public async Task Add(Tweet tweet)
        {
            try
            {
                await _context.Tweets.AddAsync(tweet);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Log exception here
                throw new Exception("An error occurred while adding the tweet.", ex);
            }
        }

        // Delete a tweet by its ID
        public async Task Delete(int id)
        {
            try
            {
                var tweet = await _context.Tweets.FindAsync(id);
                if (tweet == null)
                    throw new Exception("Tweet not found.");

                _context.Tweets.Remove(tweet);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Log exception here
                throw new Exception("An error occurred while deleting the tweet.", ex);
            }
        }

        public async Task<Tweet> GetById(int id)
        {
            try
            {
                var tweet = await _context.Tweets.FirstOrDefaultAsync(t => t.TweetId == id);
                return tweet;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while retrieving the tweets by UserId.", ex);
            }
        }

        // Get tweets by a specific user ID
        public async Task<List<Tweet>> GetByUserIdAsync(string userId)
        {
            try
            {
                var tweets = await _context.Tweets
                                           .Where(t => t.UserId == userId)
                                           .ToListAsync();
                return tweets;
            }
            catch (Exception ex)
            {
                // Log exception here
                throw new Exception("An error occurred while retrieving the tweets by UserId.", ex);
            }
        }

        // Get all tweets from the database
        public async Task<List<Tweet>> GetAll()
        {
            try
            {
                return await _context.Tweets.ToListAsync();
            }
            catch (Exception ex)
            {
                // Log exception here
                throw new Exception("An error occurred while retrieving the tweets.", ex);
            }
        }

        // Update an existing tweet
        public async Task Update(Tweet tweet)
        {
            try
            {
                _context.Tweets.Update(tweet);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Log exception here
                throw new Exception("An error occurred while updating the tweet.", ex);
            }
        }

        // Get tweets by the users that a specific user is following
        public async Task<List<Tweet>> GetTweetsByFollowingIdAsync(string userId)
        {
            try
            {
                // Get the users that the given user is following
                var followingIds = await _context.Follows
                    .Where(f => f.UserId == userId)
                    .Select(f => f.FollowingId)
                    .ToListAsync();

                // Get tweets from those users
                var tweets = await _context.Tweets
                    .Where(t => followingIds.Contains(t.UserId))
                    .ToListAsync();

                return tweets;
            }
            catch (Exception ex)
            {
                // Log exception here
                throw new Exception("An error occurred while retrieving the tweets by FollowingId.", ex);
            }
        }
    }
}
