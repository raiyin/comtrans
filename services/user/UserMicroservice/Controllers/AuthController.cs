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

        [HttpPost("login")]
        public async Task<ActionResult<ServiceResponse<UserLogginResult>>> Login(UserLoginDto request)
        {
            var response = await _authRepo.Login(request.Email, request.Password);
            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }

        [Authorize]
        [HttpGet("check")]
        public async Task<ActionResult<ServiceResponse<UserLogginResult>>> CheckAuth()
        {
            HttpContext.User.Identity.IsAuthenticated

            var response = await _authRepo.Login(request.Email, request.Password);
            if (!response.Success)
            {
                return BadRequest(response);
            }

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
