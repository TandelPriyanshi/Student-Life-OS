interface BalanceCardProps {
  totalBalance: number;
  totalCredit: number;
  totalDebit: number;
}

const BalanceCard = ({ totalBalance, totalCredit, totalDebit }: BalanceCardProps) => {
  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div
        className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden
                   hover:scale-[1.02] hover:shadow-3xl
                   transition-all duration-300 ease-out"
        style={{ animation: 'fadeIn 0.6s ease-out forwards' }}
      >
      {/* Total Balance - Prominent */}
      <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-8 text-center">
        <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Balance</p>
        <p className="text-5xl font-extrabold text-white mt-2">₹{totalBalance.toLocaleString()}</p>
      </div>

      {/* Credit & Debit */}
      <div className="grid grid-cols-2 divide-x divide-gray-700">
        {/* Total Credit - Green */}
        <div className="p-6 text-center">
          <div className="flex items-center justify-center gap-1 mb-2">
            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
            <span className="text-emerald-400 text-sm font-medium">Credit</span>
          </div>
          <p className="text-2xl font-bold text-emerald-400">₹{totalCredit.toLocaleString()}</p>
        </div>

        {/* Total Debit - Red */}
        <div className="p-6 text-center">
          <div className="flex items-center justify-center gap-1 mb-2">
            <svg className="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
            </svg>
            <span className="text-rose-400 text-sm font-medium">Debit</span>
          </div>
          <p className="text-2xl font-bold text-rose-400">₹{totalDebit.toLocaleString()}</p>
        </div>
      </div>
      </div>
    </>
  );
};

export default BalanceCard;
