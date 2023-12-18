using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Asn1.Ocsp;
using UserMicroservice.Data;
using UserMicroservice.Dtos.User;
using UserMicroservice.Model;

namespace UserMicroservice.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
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
        [AllowAnonymous]
        public async Task<ActionResult<ServiceResponse<int>>> Register(UserRegisterDto request)
        {
            if (string.IsNullOrEmpty(request.Username) ||
                string.IsNullOrEmpty(request.Password) ||
                string.IsNullOrEmpty(request.Email))
            {
                return BadRequest("Insufficient data in the request");
            }

            var response = await _authRepo.Register(
                new User { Username = request.Username },
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

        [HttpGet("activate/{activationString}")]
        public async Task<ActionResult<ServiceResponse<int>>> Activate(string activationString)
        {
            if (string.IsNullOrEmpty(activationString))
            {
                return BadRequest("Empty activation string");
            }

            var response = await _authRepo.Activate(activationString);
            if (!response.Success)
            {
                //return BadRequest(response);

                return Redirect(_configuration.GetSection("AppSettings:ClientUrl").Value + "/activation/failure");
            }

            return Redirect(_configuration.GetSection("AppSettings:ClientUrl").Value + "/activation/success");
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<ServiceResponse<UserLogginResult>>> Login(UserLoginDto request)
        {
            if (string.IsNullOrEmpty(request.Password) ||
                string.IsNullOrEmpty(request.Email))
            {
                return BadRequest("Insufficient data in the request");
            }

            var response = await _authRepo.Login(request.Email, request.Password);
            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpGet("check")]
        public async Task<ActionResult<ServiceResponse<UserDto>>> CheckAuth()
        {
            var response = await _authRepo.CheckAuth();
            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }
    }
}
