using System.ComponentModel.DataAnnotations;

namespace Server.DTOs
{
    public class UpdateUserRequest
    {
        [MaxLength(100)]
        public string? Name { get; set; }

        [EmailAddress]
        [MaxLength(255)]
        public string? Email { get; set; }
    }
}
