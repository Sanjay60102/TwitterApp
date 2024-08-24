using Microsoft.EntityFrameworkCore;
using TwitterAPI.Entities;

namespace TwitterAPI.Repositories
{
    public class MediaRepository : IMediaRepository
    {
        private readonly TwitterContext _context;
        private readonly IConfiguration _configuration;
        public MediaRepository(TwitterContext context, IConfiguration configuration)
        {
            _configuration = configuration;
            _context = context;
        }

        // Add media to a tweet
        public async Task AddMediaAsync(Media media)
        {
            await _context.Media.AddAsync(media);
            await _context.SaveChangesAsync();
        }

        // Get media by Tweet ID
        public async Task<IEnumerable<Media>> GetMediaByTweetIdAsync(int tweetId)
        {
            return await _context.Media
                .Where(m=>m.TweetId == tweetId)
                .ToListAsync();
        }

        // Delete media
        public async Task DeleteMediaAsync(int MediaId)
        {
            var media = await _context.Media.FindAsync(MediaId);
            if (media != null)
            {
                _context.Media.Remove(media);
                await _context.SaveChangesAsync();
            }
        }
    }
}
