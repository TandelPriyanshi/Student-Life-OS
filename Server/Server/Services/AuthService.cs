using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Server.DTOs;
using Server.Entities;
using Server.Repositories;
using BCrypt.Net;

namespace Server.Services
{
    public interface IAuthService
    {
        System.Threading.Tasks.Task<AuthResponse?> RegisterAsync(RegisterRequest request);
        System.Threading.Tasks.Task<AuthResponse?> LoginAsync(LoginRequest request);
        string GenerateJwtToken(User user);
        System.Threading.Tasks.Task<User?> GetUserByIdAsync(Guid userId);
        System.Threading.Tasks.Task<User?> UpdateUserAsync(Guid userId, UpdateUserRequest request);
        System.Threading.Tasks.Task<RefreshTokenResponse?> RefreshTokenAsync(string refreshToken);
        System.Threading.Tasks.Task RevokeAllRefreshTokensAsync(Guid userId);
    }

    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public AuthService(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        public async System.Threading.Tasks.Task<AuthResponse?> RegisterAsync(RegisterRequest request)
        {
            // Check if email already exists
            if (await _userRepository.EmailExistsAsync(request.Email))
            {
                return null;
            }

            // Create new user
            var user = new User
            {
                Name = request.Name,
                Email = request.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                CreatedAt = DateTime.UtcNow
            };

            var createdUser = await _userRepository.CreateAsync(user);

            // Generate JWT token
            var token = GenerateJwtToken(createdUser);

            return new AuthResponse
            {
                Token = token,
                Email = createdUser.Email,
                Name = createdUser.Name,
                UserId = createdUser.Id
            };
        }

        public async System.Threading.Tasks.Task<AuthResponse?> LoginAsync(LoginRequest request)
        {
            // Find user by email
            var user = await _userRepository.GetByEmailAsync(request.Email);
            if (user == null)
            {
                return null;
            }

            // Verify password
            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return null;
            }

            // Generate JWT token
            var token = GenerateJwtToken(user);

            return new AuthResponse
            {
                Token = token,
                Email = user.Email,
                Name = user.Name,
                UserId = user.Id
            };
        }

        public string GenerateJwtToken(User user)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var secretKey = jwtSettings["SecretKey"] ?? throw new InvalidOperationException("JWT SecretKey not configured");
            var issuer = jwtSettings["Issuer"] ?? "StudentLifeOS";
            var audience = jwtSettings["Audience"] ?? "StudentLifeOS";
            var expiryMinutes = Convert.ToDouble(jwtSettings["ExpiryMinutes"] ?? "60");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.Name)
            };

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expiryMinutes),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async System.Threading.Tasks.Task<User?> GetUserByIdAsync(Guid userId)
        {
            return await _userRepository.GetByIdAsync(userId);
        }

        public async System.Threading.Tasks.Task<User?> UpdateUserAsync(Guid userId, UpdateUserRequest request)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                return null;
            }

            // Only update fields that are provided
            if (!string.IsNullOrEmpty(request.Name))
            {
                user.Name = request.Name;
            }

            if (!string.IsNullOrEmpty(request.Email))
            {
                // Check if new email already exists (and belongs to different user)
                var existingUser = await _userRepository.GetByEmailAsync(request.Email);
                if (existingUser != null && existingUser.Id != userId)
                {
                    throw new InvalidOperationException("Email already exists");
                }
                user.Email = request.Email;
            }

            return await _userRepository.UpdateAsync(user);
        }

        public async System.Threading.Tasks.Task<RefreshTokenResponse?> RefreshTokenAsync(string refreshToken)
        {
            // This would require a refresh token repository
            // For simplicity, we'll implement a basic version
            // In production, you'd store refresh tokens in database with expiration
            
            // For now, return null - this is a placeholder
            // You would need to implement RefreshTokenRepository first
            return null;
        }

        public async System.Threading.Tasks.Task RevokeAllRefreshTokensAsync(Guid userId)
        {
            // This would require a refresh token repository
            // For simplicity, we'll implement a basic version
            // In production, you'd mark all refresh tokens for this user as revoked
            
            // Placeholder implementation
            await System.Threading.Tasks.Task.CompletedTask;
        }
    }
}
