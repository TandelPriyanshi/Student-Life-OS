using System.ComponentModel.DataAnnotations;

namespace Server.Entities
{
    public class Expense
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public decimal Amount { get; set; }

        [Required]
        [MaxLength(10)]
        public string Type { get; set; } = string.Empty; 

        [Required]
        [MaxLength(100)]
        public string Category { get; set; } = string.Empty;

        [MaxLength(500)]
        public string Description { get; set; } = string.Empty;

        // Expense Date which user will Select
        [Required]
        public DateTime Date { get; set; }

        [Required]
        public Guid UserId { get; set; }

        // System Date when expense was created
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public User User { get; set; } = null!;
    }
}
