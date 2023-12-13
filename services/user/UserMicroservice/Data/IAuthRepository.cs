using UserMicroservice.Dtos.User;
using UserMicroservice.Model;

namespace UserMicroservice.Data
{
    public interface IAuthRepository
    {
        Task<ServiceResponse<int>> Register(User user, string password, string email, string hostValue);
        Task<ServiceResponse<UserLogginResult>> Login(string email, string password);
        Task<ServiceResponse<string>> Activate(string activationString);
        Task<bool> UserExists(string username);
        ServiceResponse<bool> CheckAuth();
        Task<ServiceResponse<string>> Refresh(string token);
    }
}
