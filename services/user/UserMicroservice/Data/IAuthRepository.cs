﻿using UserMicroservice.Model;

namespace UserMicroservice.Data
{
    public interface IAuthRepository
    {
        Task<ServiceResponse<int>> Register(User user, string password, string email, string hostValue);
        Task<ServiceResponse<string>> Login(string email, string password);
        Task<ServiceResponse<string>> Activate(string activationString);
        Task<bool> UserExists(string username);
    }
}
