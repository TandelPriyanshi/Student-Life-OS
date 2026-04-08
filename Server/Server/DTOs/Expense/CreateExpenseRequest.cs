using System.ComponentModel.DataAnnotations;

namespace Server.DTOs.Expense
{
    public class CreateExpenseRequest
    {
        [Required]
        public decimal Amount { get; set; }

        [Required]
        [MaxLength(10)]
        public string Type { get; set; } = string.Empty; // "credit" or "debit"

        [Required]
        [MaxLength(100)]
        public string Category { get; set; } = string.Empty;

        [MaxLength(500)]
        public string Description { get; set; } = string.Empty;

        [Required]
        public DateTime Date { get; set; }
    }
}
