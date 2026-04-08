using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.DTOs.Expense;
using Server.Data;
using Server.Entities;
using System.Security.Claims;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ExpenseController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ExpenseController> _logger;

        public ExpenseController(ApplicationDbContext context, ILogger<ExpenseController> logger)
        {
            _context = context;
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

        private async Task<Expense?> GetExpenseByIdAndUserIdAsync(Guid id, Guid userId)
        {
            return await _context.Expenses
                .FirstOrDefaultAsync(e => e.Id == id && e.UserId == userId);
        }

        private static ExpenseResponse MapToResponse(Expense expense)
        {
            return new ExpenseResponse
            {
                Id = expense.Id,
                Amount = expense.Amount,
                Type = expense.Type,
                Category = expense.Category,
                Description = expense.Description,
                Date = expense.Date
            };
        }

        [HttpPost]
        public async Task<IActionResult> CreateExpense([FromBody] CreateExpenseRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var userId = GetUserId();

                var expense = new Expense
                {
                    Amount = request.Amount,
                    Type = request.Type.ToLower(),
                    Category = request.Category,
                    Description = request.Description,
                    Date = request.Date,
                    UserId = userId,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Expenses.Add(expense);
                await _context.SaveChangesAsync();

                var response = MapToResponse(expense);

                _logger.LogInformation("Expense created successfully: {ExpenseId} for user: {UserId}", expense.Id, userId);
                return CreatedAtAction(nameof(GetExpenseById), new { id = expense.Id }, response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating expense");
                return StatusCode(500, new { message = "An error occurred while creating the expense" });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetExpenses()
        {
            try
            {
                var userId = GetUserId();

                var expenses = await _context.Expenses
                    .Where(e => e.UserId == userId)
                    .OrderByDescending(e => e.Date)
                    .ThenByDescending(e => e.CreatedAt)
                    .Select(e => MapToResponse(e))
                    .ToListAsync();

                return Ok(expenses);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving expenses");
                return StatusCode(500, new { message = "An error occurred while retrieving expenses" });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetExpenseById(Guid id)
        {
            try
            {
                var userId = GetUserId();

                var expense = await GetExpenseByIdAndUserIdAsync(id, userId);
                if (expense == null)
                {
                    return NotFound(new { message = "Expense not found or you don't have permission to access it" });
                }

                var response = MapToResponse(expense);
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving expense with ID: {ExpenseId}", id);
                return StatusCode(500, new { message = "An error occurred while retrieving the expense" });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExpense(Guid id, [FromBody] CreateExpenseRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var userId = GetUserId();

                var expense = await GetExpenseByIdAndUserIdAsync(id, userId);
                if (expense == null)
                {
                    return NotFound(new { message = "Expense not found or you don't have permission to modify it" });
                }

                // Update expense properties
                expense.Amount = request.Amount;
                expense.Type = request.Type.ToLower();
                expense.Category = request.Category;
                expense.Description = request.Description;
                expense.Date = request.Date;

                _context.Expenses.Update(expense);
                await _context.SaveChangesAsync();

                var response = MapToResponse(expense);

                _logger.LogInformation("Expense updated: {ExpenseId} for user: {UserId}", id, userId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating expense with ID: {ExpenseId}", id);
                return StatusCode(500, new { message = "An error occurred while updating the expense" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense(Guid id)
        {
            try
            {
                var userId = GetUserId();

                var expense = await GetExpenseByIdAndUserIdAsync(id, userId);
                if (expense == null)
                {
                    return NotFound(new { message = "Expense not found or you don't have permission to delete it" });
                }

                _context.Expenses.Remove(expense);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Expense deleted: {ExpenseId} for user: {UserId}", id, userId);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting expense with ID: {ExpenseId}", id);
                return StatusCode(500, new { message = "An error occurred while deleting the expense" });
            }
        }
    }
}
