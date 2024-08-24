using TwitterAPI.Entities;

namespace TwitterAPI.Repositories
{
    public interface ICommentRepository
    {
        // Adds a new comment asynchronously
        Task AddCommentAsync(Comment comment);

        // Retrieves all comments for a specific tweet
        Task<IEnumerable<Comment>> GetCommentByTweetIdAsync(int tweetId);

        // Retrieves all comments made by a specific user
        Task<IEnumerable<Comment>> GetCommentByUserIdAsync(string userId);

        // Updates an existing comment 
        Task UpdateCommentAsync(Comment comment);

        // Deletes a comment by its ID
        Task DeleteCommentAsync(int commentId);
    }
}
