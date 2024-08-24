using TwitterAPI.Entities;

namespace TwitterAPI.Repositories
{
    public interface IUserRepository
    {
        // Registers a new user
        Task Register(User user);
        // Validates user's email and password
        Task<User> ValidUser(string email, string password);
        // Get User details by email
        Task<List<User>> GetByEmail(string email);
        //Get All Users
        Task<IEnumerable<User>> GetAllUsersAsync();
        // Updates user details
        Task Update(User user);
        // Deletes a user by ID
        Task Delete(string id);
        
    }
}
