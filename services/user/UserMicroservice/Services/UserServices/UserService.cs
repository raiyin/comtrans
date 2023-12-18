using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using UserMicroservice.Data;
using UserMicroservice.Dtos.User;
using UserMicroservice.Model;

namespace UserMicroservice.Services.UserServices
{
    public class UserService : IUserService
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper _mapper;

        public UserService(IMapper mapper, DataContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _httpContextAccessor = httpContextAccessor;
            _mapper = mapper;
        }

        public async Task<ServiceResponse<string>> DeleteUser(int id)
        {
            ServiceResponse<string> response = new ServiceResponse<string>();
            try
            {
                var user = await _dbContext.Users
                    .FirstOrDefaultAsync(u => u.Id == id);

                if (user != null)
                {
                    _dbContext.Users.Remove(user);
                    await _dbContext.SaveChangesAsync();
                    response.Success = true;
                    response.Message = "User deleted";
                    response.Data = string.Empty;
                }
                else
                {
                    response.Success = false;
                    response.Message = "User not found";
                }
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<ServiceResponse<UserDto>> GetUserById(int id)
        {
            var response = new ServiceResponse<UserDto>();

            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
            response.Data = _mapper.Map<UserDto>(user);
            response.Success = true;
            return response;
        }

        public async Task<ServiceResponse<List<UserDto>>> GetUserList()
        {
            var response = new ServiceResponse<List<UserDto>>();
            var users = await _dbContext.Users.ToListAsync();
            response.Data = users.Select(u => _mapper.Map<UserDto>(u)).ToList();
            return response;
        }

        public async Task<ServiceResponse<UserDto>> UpdateUser(UpdateUserDto updatedUser)
        {
            ServiceResponse<UserDto> response = new ServiceResponse<UserDto>();

            try
            {
                var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == updatedUser.Id);

                _mapper.Map(updatedUser, user);
                user.Username = updatedUser.Username;
                user.Role = updatedUser.Role;
                user.Email = updatedUser.Email;
                user.Name = updatedUser.Name;
                user.LastName = updatedUser.LastName;
                user.Enabled = updatedUser.Enabled;

                await _dbContext.SaveChangesAsync();
                response.Data = _mapper.Map<UserDto>(user);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }

            return response;
        }

    }
}
