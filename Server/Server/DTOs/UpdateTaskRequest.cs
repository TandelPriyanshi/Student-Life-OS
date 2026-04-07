using System.ComponentModel.DataAnnotations;

namespace Server.DTOs
{
    public class UpdateTaskRequest
    {
        [Required(ErrorMessage = "Title is required")]
        [MaxLength(200, ErrorMessage = "Title cannot exceed 200 characters")]
        public string Title { get; set; } = string.Empty;
    }
}
