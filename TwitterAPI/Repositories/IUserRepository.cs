using TwitterAPI.Entities;

namespace TwitterAPI.Repositories
{
    public interface IUserRepository
    {
        // Registers a new user
        Task Register(User user);
        // Validates user's email and password
        Task<User> ValidUser(string email, string password);

        Task<User> GetByUserId(string userId);
        // Get User details by email
        Task<List<User>> GetByEmail(string email);
        //Get All Users
        Task<IEnumerable<User>> GetAllUsersAsync();
        // Updates user details
        Task Update(User user);

        Task Delete(string userId);


    }
}
