using Microsoft.EntityFrameworkCore;
using TwitterAPI.Entities;

namespace TwitterAPI.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly TwitterContext _context;
        private readonly IConfiguration _configuration;
        // Constructor to initialize the context and configuration
        public CommentRepository(TwitterContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // Adds a new comment asynchronously
        public async Task AddCommentAsync(Comment comment)
        {
            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();
        }


        // Retrieves all comments for a specific tweet
        public async Task<IEnumerable<Comment>> GetCommentByTweetIdAsync(int tweetId)
        {
            return await _context.Comments
                .Where(c => c.TweetId == tweetId)
                .Include(c => c.User)
                .ToListAsync();
        }

        // Retrieves all comments made by a specific user
        public async Task<IEnumerable<Comment>> GetCommentByUserIdAsync(string userId)
        {
            return await _context.Comments
                .Where(c => c.UserId == userId)
                .Include(c => c.Tweet)
                .ToListAsync();
        }

        // Updates an existing comment
        public async Task UpdateCommentAsync(Comment comment)
        {
            _context.Comments.Update(comment);
            await _context.SaveChangesAsync();
        }

        // Deletes a comment by its ID
        public async Task DeleteCommentAsync(int commentId)
        {
            var comment = await _context.Comments.FindAsync(commentId);
            if (comment != null)
            {
                _context.Comments.Remove(comment);
                await _context.SaveChangesAsync();
            }
        }
    }
}
