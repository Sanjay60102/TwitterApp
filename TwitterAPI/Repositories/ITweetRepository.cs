using TwitterAPI.Entities;

namespace TwitterAPI.Repositories
{
    public interface ITweetRepository
    {
        // Add a new tweet
        Task Add(Tweet tweet);
        // Retrieve all tweets
        Task<List<Tweet>> GetAll();

        // Get tweets by the users that a specific user is following
        public Task<List<Tweet>> GetTweetsByFollowingIdAsync(string userId);

        Task<Tweet> GetById(int id);
        // Retrieve tweets by a specific user ID
        Task<List<Tweet>> GetByUserIdAsync(string userId);
        // Update an existing tweet
        Task Update(Tweet tweet);
        // Delete a tweet by its ID
        Task Delete(int id);
    }
}
