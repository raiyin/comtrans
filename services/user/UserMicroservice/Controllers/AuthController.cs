using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserMicroservice.Data;
using UserMicroservice.Dtos.User;
using UserMicroservice.Model;
using UserMicroservice.Services.Interface;

namespace UserMicroservice.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepo;

        public AuthController(IAuthRepository authRepo)
        {
            _authRepo = authRepo;
        }

        [HttpPost("register")]
        public async Task<ActionResult<ServiceResponse<int>>> Register(UserRegisterDto request)
        {
            var response = await _authRepo.Register(
                new User { UserName = request.Username },
                request.Password
                );

            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPost("login")]
        public async Task<ActionResult<ServiceResponse<int>>> Login(UserLoginDto request)
        {
            var response = await _authRepo.Login(request.UserName, request.Password);
            if (response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }



        [HttpGet]
        public IEnumerable<User> UserList()
        {
            var userList = userService.GetUserList();
            return userList;
        }

        [HttpGet("{id}")]
        public User GetUserById(int id)
        {
            return userService.GetUserById(id);
        }

        [HttpPost]
        public User AddUser(User user)
        {
            return userService.AddUser(user);
        }

        [HttpPut]
        public User UpdateUser(User user)
        {
            return userService.UpdateUser(user);
        }

        [HttpDelete("{id}")]
        public bool DeleteUser(int id)
        {
            return userService.DeleteUser(id);
        }
    }
}
