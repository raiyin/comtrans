namespace UserMicroservice.Dtos.User
{
    public class UserRegisterDto
    {
        public string Login { get; set; }=string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Email { get; set; }
    }
}
