﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserMicroservice.Data;
using UserMicroservice.Dtos.User;
using UserMicroservice.Model;

namespace UserMicroservice.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IAuthRepository _authRepo;
        private readonly IConfiguration _configuration;

        public AuthController(
            IAuthRepository authRepo,
            IConfiguration configuration)
        {
            _authRepo = authRepo;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<ActionResult<ServiceResponse<int>>> Register(UserRegisterDto request)
        {
            var response = await _authRepo.Register(
                new User { Login = request.Login },
                request.Password,
                request.Email,
                Request.Host.Value
                );

            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPost("login")]
        public async Task<ActionResult<ServiceResponse<int>>> Login(UserLoginDto request)
        {
            var response = await _authRepo.Login(request.Login, request.Password);
            if (response.Success)
            {
                return BadRequest(response);
            }

            CookieOptions options = new CookieOptions();
            options.HttpOnly = true;
            options.Expires = DateTime.Now.AddDays(30);
            Response.Cookies.Append("refreshToken", response.Data, options);

            return Ok(response);
        }

        [HttpGet("activate/{activationString}")]
        public async Task<ActionResult<ServiceResponse<int>>> Activate(string activationString)
        {
            var response = await _authRepo.Activate(activationString);
            if (!response.Success)
            {
                //return BadRequest(response);

                return Redirect(_configuration.GetSection("AppSettings:ClientUrl").Value + "/activation/failure");
            }

            return Redirect(_configuration.GetSection("AppSettings:ClientUrl").Value + "/activation/success");
        }
    }
}
