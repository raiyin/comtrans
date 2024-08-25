using UserMicroservice.Dtos.User;
using UserMicroservice.Model;

namespace UserMicroservice.Services.UserServices
{
    public interface IUserService
    {
        Task<ServiceResponse<List<UserDto>>> GetUserList();

        Task<ServiceResponse<UserDto>> GetUserById(int id);

        Task<ServiceResponse<UserDto>> UpdateUser(UpdateUserDto updatedUser);

        Task<ServiceResponse<string>> DeleteUser(int Id);
    }
}
