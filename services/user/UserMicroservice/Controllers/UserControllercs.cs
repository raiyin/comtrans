using Microsoft.AspNetCore.Mvc;
using UserMicroservice.Model;
using UserMicroservice.Services;

namespace UserMicroservice.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserControllercs : ControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<IEnumerable<User>>>> UserList()
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
