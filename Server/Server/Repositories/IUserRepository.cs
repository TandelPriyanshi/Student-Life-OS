using Server.Entities;

namespace Server.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetByEmailAsync(string email);
        Task<User?> GetByIdAsync(Guid id);
        Task<User> CreateAsync(User user);
        Task<User?> UpdateAsync(User user);
        Task<bool> EmailExistsAsync(string email);
        Task<int> SaveChangesAsync();
    }
}
