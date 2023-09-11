using Microsoft.EntityFrameworkCore.Query.Internal;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;
using UserMicroservice.Model;
using UserMicroservice.Services.MailService;
using Org.BouncyCastle.Asn1.Ocsp;
using System.Security.Cryptography;

namespace UserMicroservice.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;
        private readonly IEmailSender _emailSender;

        public AuthRepository(DataContext context, IConfiguration configuration, IEmailSender emailSender)
        {
            _context = context;
            _configuration = configuration;
            _emailSender = emailSender;
        }

        public async Task<ServiceResponse<int>> Register(User user, string password, string email, string hostValue)
        {
            ServiceResponse<int> response = new ServiceResponse<int>();
            if (await UserExists(user.Login))
            {
                response.Success = false;
                response.Message = "User already exists.";
                return response;
            }

            try
            {
                var randomString = CreatePRGActivationLink();
                string activationLink = $"https://{hostValue}/auth/activate/{randomString}";
                CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                user.CreatedAt = DateTime.UtcNow;
                user.Email = email;
                user.Activated = false;
                user.ActivationLinkSendData = DateTime.UtcNow;
                user.ActivationString = randomString;

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                var message = new Message(
                    user.Email,
                    "Verification email",
                    activationLink
                    );
                _emailSender.SendEmail(message);

                response.Data = user.Id;
            }
            catch (Exception ex)
            {
                // TODO delete user from db if user was added, but problem was with email
                response.Data = 0;
                response.Message = "The error has occured while user creating";
                response.Success = false;
            }

            return response;
        }

        public async Task<ServiceResponse<string>> Login(string email, string password)
        {
            var response = new ServiceResponse<string>();
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower().Equals(email.ToLower()));

            if (user == null)
            {
                response.Success = false;
                response.Message = "User not found";

            }
            else if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            {
                response.Success = false;
                response.Message = "Wrong password";
            }
            else
            {
                response.Data = CreateToken(user);
            }
            return response;
        }

        public async Task<ServiceResponse<int>> Activate(string link)
        {
            throw new NotImplementedException();
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA256(passwordSalt))
            {
                var computeHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computeHash.SequenceEqual(passwordHash);
            }
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name)
            };

            SymmetricSecurityKey key = new SymmetricSecurityKey(System.Text.Encoding.UTF8
                .GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string username)
        {
            if (await _context.Users.AnyAsync(user => user.Login.ToLower() == username.ToLower()))
            {
                return true;
            }
            return false;
        }

        private string CreatePRGActivationLink()
        {
            var randomString = Convert.ToBase64String(RandomNumberGenerator.GetBytes(100));
            return randomString;
        }
    }
}
