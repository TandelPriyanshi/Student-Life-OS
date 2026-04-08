using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.DTOs.Balance;
using Server.Data;
using System.Security.Claims;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BalanceController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<BalanceController> _logger;

        public BalanceController(ApplicationDbContext context, ILogger<BalanceController> logger)
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

        [HttpGet("summary")]
        public async Task<IActionResult> GetBalanceSummary()
        {
            try
            {
                var userId = GetUserId();
                var summary = await _context.Expenses
                    .Where(e => e.UserId == userId)
                    .GroupBy(e => 1)
                    .Select(g => new BalanceSummaryResponse
                    {
                        TotalCredit = g.Where(e => e.Type == "credit").Sum(e => e.Amount),
                        TotalDebit = g.Where(e => e.Type == "debit").Sum(e => e.Amount)
                    })
                    .FirstOrDefaultAsync();

                if (summary != null)
                {
                    summary.TotalBalance = summary.TotalCredit - summary.TotalDebit;
                }
                else
                {
                    summary = new BalanceSummaryResponse
                    {
                        TotalBalance = 0,
                        TotalCredit = 0,
                        TotalDebit = 0
                    };
                }

                _logger.LogInformation("Balance summary retrieved for user: {UserId}", userId);
                return Ok(summary);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving balance summary for user");
                return StatusCode(500, new { message = "An error occurred while retrieving balance summary" });
            }
        }
    }
}
