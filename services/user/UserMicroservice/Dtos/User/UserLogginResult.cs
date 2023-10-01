namespace UserMicroservice.Dtos.User
{
    public class UserLogginResult
    {
        public string? Email { get; set; }
        public string? Username { get; set; }
        public bool IsActivated { get; set; }
        public string? Token { get; set; }
    }
}
