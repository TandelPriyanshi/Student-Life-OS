using System.ComponentModel.DataAnnotations;

namespace Server.DTOs
{
    public class RefreshTokenRequest
    {
        [Required]
        public string Token { get; set; } = string.Empty;
    }
}
