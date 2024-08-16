using TwitterAPI.Entities;

namespace TwitterAPI.Repositories
{
    public interface IFollowRepository
    {
        // Add a new following relationship
        Task AddFollowing(Follow follow);
        // Remove a following relationship
        Task RemoveFollowing(string userId, string followingId);
        //Users followed by a specific user
        Task<IEnumerable<User>> GetFollowings(string userId);
        //Users who follow a specific user
        Task<IEnumerable<User>> GetFollowers(string followingId); 
    }
}
