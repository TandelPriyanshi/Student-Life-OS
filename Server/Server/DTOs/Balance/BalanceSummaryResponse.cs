namespace Server.DTOs.Balance
{
    public class BalanceSummaryResponse
    {
        public decimal TotalBalance { get; set; }
        public decimal TotalCredit { get; set; }
        public decimal TotalDebit { get; set; }
    }
}
