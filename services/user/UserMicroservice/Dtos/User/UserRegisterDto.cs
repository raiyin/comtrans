﻿namespace UserMicroservice.Dtos.User
{
    public class UserRegisterDto
    {
        public string Username { get; set; }=string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Email { get; set; }
    }
}
