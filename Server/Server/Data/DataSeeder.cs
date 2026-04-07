using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Entities;
using BCrypt.Net;

namespace Server.Data
{
    public static class DataSeeder
    {
        public static async System.Threading.Tasks.Task SeedData(ApplicationDbContext context)
        {
            // Check if database has any users
            if (await context.Users.AnyAsync())
            {
                return; // Database has been seeded
            }

            // Create test user
            var testUser = new User
            {
                Id = Guid.NewGuid(),
                Name = "Test User",
                Email = "test@studentlifeos.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("TestPassword123!"),
                CreatedAt = DateTime.UtcNow
            };

            await context.Users.AddAsync(testUser);
            await context.SaveChangesAsync();

            Console.WriteLine("Database seeded with test user:");
            Console.WriteLine("Email: test@studentlifeos.com");
            Console.WriteLine("Password: TestPassword123!");
        }
    }
}
