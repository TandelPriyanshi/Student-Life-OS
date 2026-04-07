using Server.DTOs;

namespace Server.Services
{
    public interface ITaskService
    {
        Task<TaskResponse> CreateTaskAsync(Guid userId, CreateTaskRequest request);
        Task<IEnumerable<TaskResponse>> GetUserTasksAsync(Guid userId);
        Task<TaskResponse?> ToggleTaskStatusAsync(Guid taskId, Guid userId);
        Task<TaskResponse?> UpdateTaskAsync(Guid taskId, Guid userId, UpdateTaskRequest request);
        Task<bool> DeleteTaskAsync(Guid taskId, Guid userId);
    }
}
