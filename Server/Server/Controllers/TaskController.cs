using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.Services;
using System.Security.Claims;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;
        private readonly ILogger<TaskController> _logger;

        public TaskController(ITaskService taskService, ILogger<TaskController> logger)
        {
            _taskService = taskService;
            _logger = logger;
        }

        private Guid GetUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
            {
                throw new UnauthorizedAccessException("Invalid user identifier");
            }
            return userId;
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] CreateTaskRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var userId = GetUserId();
                var result = await _taskService.CreateTaskAsync(userId, request);

                _logger.LogInformation("Task created successfully: {TaskId} for user: {UserId}", result.Id, userId);
                return CreatedAtAction(nameof(GetTasks), new { }, result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating task");
                return StatusCode(500, new { message = "An error occurred while creating the task" });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            try
            {
                var userId = GetUserId();
                var tasks = await _taskService.GetUserTasksAsync(userId);

                return Ok(tasks);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving tasks");
                return StatusCode(500, new { message = "An error occurred while retrieving tasks" });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(Guid id, [FromBody] UpdateTaskRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var userId = GetUserId();
                var result = await _taskService.UpdateTaskAsync(id, userId, request);

                if (result == null)
                {
                    return NotFound(new { message = "Task not found or you don't have permission to modify it" });
                }

                _logger.LogInformation("Task updated: {TaskId} for user: {UserId}", id, userId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating task");
                return StatusCode(500, new { message = "An error occurred while updating the task" });
            }
        }

        [HttpPut("{id}/toggle")]
        public async Task<IActionResult> ToggleTaskStatus(Guid id)
        {
            try
            {
                var userId = GetUserId();
                var result = await _taskService.ToggleTaskStatusAsync(id, userId);

                if (result == null)
                {
                    return NotFound(new { message = "Task not found or you don't have permission to modify it" });
                }

                _logger.LogInformation("Task status toggled: {TaskId} for user: {UserId}", id, userId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error toggling task status");
                return StatusCode(500, new { message = "An error occurred while updating the task" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(Guid id)
        {
            try
            {
                var userId = GetUserId();
                var result = await _taskService.DeleteTaskAsync(id, userId);

                if (!result)
                {
                    return NotFound(new { message = "Task not found or you don't have permission to delete it" });
                }

                _logger.LogInformation("Task deleted: {TaskId} for user: {UserId}", id, userId);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting task");
                return StatusCode(500, new { message = "An error occurred while deleting the task" });
            }
        }
    }
}
