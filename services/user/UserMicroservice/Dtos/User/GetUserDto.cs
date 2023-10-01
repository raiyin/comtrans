﻿using UserMicroservice.Model;

namespace UserMicroservice.Dtos.User
{
    public class GetUserDto
    {
        public string? Email { get; set; }
        public string? Username { get; set; }
        public bool IsActivated { get; set; }
    }
}
