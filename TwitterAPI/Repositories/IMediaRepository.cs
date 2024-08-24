using TwitterAPI.Entities;

namespace TwitterAPI.Repositories
{
    public interface IMediaRepository
    {
        Task AddMediaAsync (Media media);
        Task<IEnumerable<Media>> GetMediaByTweetIdAsync(int tweetId);
        Task DeleteMediaAsync(int MediaId);
    }
}
