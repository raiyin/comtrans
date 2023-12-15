using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UserMicroservice.Dtos.User;
using UserMicroservice.Model;
using UserMicroservice.Services;
using UserMicroservice.Services.UserServices;

namespace UserMicroservice.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route("getall")]
        public async Task<ActionResult<ServiceResponse<IEnumerable<UserDto>>>> UserList()
        {
            var userList = await _userService.GetUserList();
            return Ok(userList);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<UserDto>>> GetUserById(int id)
        {
            return Ok(await _userService.GetUserById(id));
        }


        [HttpPut]
        public async Task<ActionResult<ServiceResponse<UserDto>>> UpdateUser(UpdateUserDto user)
        {
            return Ok(await _userService.UpdateUser(user));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<bool>>> DeleteUser(int id)
        {
            return Ok(await _userService.DeleteUser(id));
        }
    }
}
