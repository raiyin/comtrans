using UserMicroservice.Dtos.User;
using UserMicroservice.Model;

namespace UserMicroservice.Services.UserServices
{
    public interface IUserService
    {
        async Task<ServiceResponse<List<GetUserDto>>> GetUserList();

        async Task<ServiceResponse<GetUserDto>> GetUserById(int id);

        async Task<ServiceResponse<GetUserDto>> UpdateUser(UpdateUserDto updatedUser);

        async Task<ServiceResponse<GetUserDto>> DeleteUser(int Id);
    }
}
