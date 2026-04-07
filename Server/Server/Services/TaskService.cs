using Server.DTOs;
using Server.Entities;
using Server.Repositories;

namespace Server.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;

        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public async Task<TaskResponse> CreateTaskAsync(Guid userId, CreateTaskRequest request)
        {
            var task = new Entities.Task
            {
                Title = request.Title,
                UserId = userId,
                IsCompleted = false,
                CreatedAt = DateTime.UtcNow
            };

            var createdTask = await _taskRepository.AddAsync(task);

            return new TaskResponse
            {
                Id = createdTask.Id,
                Title = createdTask.Title,
                IsCompleted = createdTask.IsCompleted,
                CreatedAt = createdTask.CreatedAt
            };
        }

        public async Task<IEnumerable<TaskResponse>> GetUserTasksAsync(Guid userId)
        {
            var tasks = await _taskRepository.GetByUserIdAsync(userId);

            return tasks.Select(task => new TaskResponse
            {
                Id = task.Id,
                Title = task.Title,
                IsCompleted = task.IsCompleted,
                CreatedAt = task.CreatedAt
            });
        }

        public async Task<TaskResponse?> ToggleTaskStatusAsync(Guid taskId, Guid userId)
        {
            var task = await _taskRepository.GetByIdAsync(taskId);

            if (task == null || task.UserId != userId)
                return null;

            task.IsCompleted = !task.IsCompleted;
            var updatedTask = await _taskRepository.UpdateAsync(task);

            return new TaskResponse
            {
                Id = updatedTask.Id,
                Title = updatedTask.Title,
                IsCompleted = updatedTask.IsCompleted,
                CreatedAt = updatedTask.CreatedAt
            };
        }

        public async Task<TaskResponse?> UpdateTaskAsync(Guid taskId, Guid userId, UpdateTaskRequest request)
        {
            var task = await _taskRepository.GetByIdAsync(taskId);

            if (task == null || task.UserId != userId)
                return null;

            task.Title = request.Title;
            var updatedTask = await _taskRepository.UpdateAsync(task);

            return new TaskResponse
            {
                Id = updatedTask.Id,
                Title = updatedTask.Title,
                IsCompleted = updatedTask.IsCompleted,
                CreatedAt = updatedTask.CreatedAt
            };
        }

        public async Task<bool> DeleteTaskAsync(Guid taskId, Guid userId)
        {
            return await _taskRepository.DeleteAsync(taskId, userId);
        }
    }
}
