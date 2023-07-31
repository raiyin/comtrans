using UserMicroservice.Model;

namespace UserMicroservice.Services.UserService.UserService
{
    public interface IUserService
    {
        Task<ServiceResponse<List<GetUserDto>>> GetUserList();

        Task<ServiceResponse<GetUserDto>> GetUserById(int id);

        Task<SerivceResponse<GetUserDto>> AddUser(AddUserDto newUser);

        Task<ServiceResponse<GetUserDto>> UpdateUser(UpdateUserDto updatedUser);

        Task<ServiceResponse<GetUserDto>> DeleteUser(int Id);
    }
}
