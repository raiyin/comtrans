using UserMicroservice.Model;

namespace UserMicroservice.Data
{
    public interface IAuthRepository
    {
        Task<ServiceResponse<int>> Register(User user, string password, string email);
        Task<ServiceResponse<string>> Login(string email, string password);
        Task<bool> UserExists(string username);
    }
}
