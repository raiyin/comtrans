using UserMicroservice.Model;

namespace UserMicroservice.Dtos.User
{
    public class UserDto
    {
        public string? Email { get; set; }
        public string? Username { get; set; }
        public bool IsActivated { get; set; }
    }
}
