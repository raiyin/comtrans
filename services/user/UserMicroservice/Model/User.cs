using System.Formats.Asn1;

namespace UserMicroservice.Model
{
    public class User
    {
        public int UserId { get; set; }
        public string? Name { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? UserName { get; set; }
        public string? Hash { get; set; }
        public string? Salt { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool Enabled { get; set; }
        public Role Role { get; set; } = Role.User;
    }
}
