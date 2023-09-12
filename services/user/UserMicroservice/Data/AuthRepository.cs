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
using System.Text;
using SimpleBase;

namespace UserMicroservice.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;
        private readonly IEmailSender _emailSender;
        private readonly ILogger _logger;
        private readonly string separator = "**";

        public AuthRepository(
            DataContext context,
            IConfiguration configuration,
            IEmailSender emailSender,
            ILogger<AuthRepository> logger)
        {
            _context = context;
            _configuration = configuration;
            _emailSender = emailSender;
            _logger = logger;
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
                var randomString = CreatePRGActivationLink(email);
                string activationLink = $"https://{hostValue}/auth/activate/{randomString}";
                CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                user.CreatedAt = DateTime.UtcNow;
                user.Email = email;
                user.Activated = false;
                user.ActivationLinkSendData = DateTime.UtcNow;
                user.ActivationToken = randomString;

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
                _logger.LogInformation(ex.Message + Environment.NewLine + ex.StackTrace);
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

        public async Task<ServiceResponse<string>> Activate(string activationString)
        {
            var response = new ServiceResponse<string>();
            string email = string.Empty;
            User? user = null; 
            string token;

            try
            {
                string emailBase58String = activationString.Substring(0, activationString.IndexOf(separator));
                byte[] emailBytes = Base58.Bitcoin.Decode(emailBase58String);
                email = Encoding.UTF8.GetString(emailBytes);

                token = activationString.Substring(activationString.IndexOf(separator) + separator.Length);
                user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower().Equals(email.ToLower()));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message + Environment.NewLine + ex.StackTrace);
                response.Success = false;
                response.Message = "Incorrect activation link format";
                return response;
            }

            if (user == null)
            {
                response.Success = false;
                response.Message = "User not found";
            }
            else if (user.ActivationToken.Equals(token))
            {
                response.Success = false;
                response.Message = "Wrong activation token";
            }
            else if (user.ActivationLinkSendData.AddHours(24) < DateTime.UtcNow)
            {
                response.Success = false;
                response.Message = "Activation link has expired";
            }
            else
            {
                user.Activated = true;
                user.Enabled = true;
                await _context.SaveChangesAsync();
                response.Success = true;
            }
            return response;
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
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
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

        private string CreatePRGActivationLink(string email)
        {
            string emailBase58String = Base58.Bitcoin.Encode(Encoding.UTF8.GetBytes(email));
            var randomString = Base58.Bitcoin.Encode(RandomNumberGenerator.GetBytes(100));
            return emailBase58String + separator + randomString;
        }
    }
}
