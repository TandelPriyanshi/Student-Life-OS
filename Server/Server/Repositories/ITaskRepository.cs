using Server.Entities;

namespace Server.Repositories
{
    public interface ITaskRepository
    {
        Task<Entities.Task?> GetByIdAsync(Guid id);
        Task<IEnumerable<Entities.Task>> GetByUserIdAsync(Guid userId);
        Task<Entities.Task> AddAsync(Entities.Task task);
        Task<Entities.Task> UpdateAsync(Entities.Task task);
        Task<bool> DeleteAsync(Guid id, Guid userId);
        Task<int> SaveChangesAsync();
    }
}
