using UserMicroservice.Model;

namespace UserMicroservice.Dtos.User
{
    public class UpdateUserDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Username { get; set; }
        public byte[]? PasswordHash { get; set; }
        public byte[]? PasswordSalt { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool Enabled { get; set; }
        public Role Role { get; set; } = Role.User;
    }
}
