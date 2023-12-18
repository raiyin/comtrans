using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using UserMicroservice.Dtos.User;
using UserMicroservice.Model;

namespace dotnet_rpg
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<UserRegisterDto, User>();
            CreateMap<User, UserLoginDto>();
            CreateMap<User, UserDto>();
            CreateMap<UpdateUserDto, User>();
            CreateMap<User, UserLogginResult>();
        }
    }
}