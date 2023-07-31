﻿using UserMicroservice.Dtos.User;
using UserMicroservice.Model;

namespace UserMicroservice.Services.UserService.UserService
{
    public interface IUserService
    {
        Task<ServiceResponse<List<GetUserDto>>> GetUserList();

        Task<ServiceResponse<GetUserDto>> GetUserById(int id);

        Task<ServiceResponse<GetUserDto>> UpdateUser(UpdateUserDto updatedUser);

        Task<ServiceResponse<GetUserDto>> DeleteUser(int Id);
    }
}
