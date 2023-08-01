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

        public UserService(IMapper mapper, DataContext dbContext, , IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _httpContextAccessor = httpContextAccessor;
            _mapper = mapper;
        }

        private int GetUserId() => int.Parse(_httpContextAccessor.HttpContext.User
            .FindFirstValue(ClaimTypes.NameIdentifier));

        public User AddUser(User user)
        {
            var result = _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
            return result.Entity;
        }

        Task<ServiceResponse<GetUserDto>> DeleteUser(int Id)
        {
            var filteredData = _dbContext.Users.Where(x => x.Id == Id).FirstOrDefault();
            var result = _dbContext.Remove(filteredData);
            _dbContext.SaveChanges();
            return result != null ? true : false;
        }

        public Task<ServiceResponse<GetUserDto>> GetUserById(int id)
        {
            return _dbContext.Users.Where(x => x.Id == id).FirstOrDefault();
        }

        public Task<ServiceResponse<List<GetUserDto>>> GetUserList()
        {
            return _dbContext.Users.ToList();
        }

        async Task<ServiceResponse<GetUserDto>> UpdateUser(UpdateUserDto updatedUser)
        {
            ServiceResponse<GetUserDto> response = new ServiceResponse<GetUserDto>();

            try
            {
                var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == updatedUser.Id);

                if (user.Id == GetUserId())
                {
                    _mapper.Map(updatedUser, user);
                    user.Login = updatedUser.Login;
                    user.Role = updatedUser.Role;
                    user.Email = updatedUser.Email;
                    user.Name = updatedUser.Name;
                    user.LastName = updatedUser.LastName;
                    user.Enabled = updatedUser.Enabled;

                    await _dbContext.SaveChangesAsync();
                    response.Data = _mapper.Map<GetUserDto>(user);
                }
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
