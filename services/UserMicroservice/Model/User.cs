using System.Formats.Asn1;

namespace UserMicroservice.Model
{
    public class User
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? LastName { get; set; }
        public string Email { get; set; }
        public string? Username { get; set; }
        public byte[]? PasswordHash { get; set; }
        public byte[]? PasswordSalt { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool Enabled { get; set; }
        public Role Role { get; set; } = Role.User;
        public bool Activated { get; set; } = false;
        public string ActivationToken { get; set; } = string.Empty;
        public DateTime ActivationLinkSendData { get; set; }
    }
}
