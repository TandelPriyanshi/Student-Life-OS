using System.ComponentModel.DataAnnotations;

namespace Server.Entities
{
    public class Task
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        public bool IsCompleted { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public Guid UserId { get; set; }

        // Navigation property
        public User User { get; set; } = null!;
    }
}
