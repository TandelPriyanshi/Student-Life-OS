interface Transaction {
  id: string;
  amount: number;
  type: string;
  category: string;
  description?: string;
  date: string;
}

interface ExpenseItemProps {
  expense: Transaction;
  onDelete: (id: string) => void;
}

const ExpenseItem = ({ expense, onDelete }: ExpenseItemProps) => {
  const getCategoryEmoji = (category: string) => {
    const emojis: { [key: string]: string } = {
      Food: "🍔",
      Travel: "✈️",
      Rent: "🏠",
      Other: "💼",
    };
    return emojis[category] || "💼";
  };

  return (
    <div className="group bg-gray-700/50 hover:bg-gray-700/80 rounded-lg border border-gray-600/50 hover:border-gray-500/70 transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold transition-colors duration-200 ${
                  expense.type === "credit"
                    ? "bg-green-500/20 text-green-400 ring-1 ring-green-500/30"
                    : "bg-red-500/20 text-red-400 ring-1 ring-red-500/30"
                }`}
              >
                {expense.type}
              </span>
              <span className="flex items-center space-x-2 text-gray-200 font-medium">
                <span className="text-lg transition-transform duration-200 group-hover:scale-110">
                  {getCategoryEmoji(expense.category)}
                </span>
                <span className="truncate">{expense.category}</span>
              </span>
            </div>
            {expense.description && (
              <p className="text-gray-400 text-sm mb-1 truncate transition-colors duration-200 group-hover:text-gray-300">
                {expense.description}
              </p>
            )}
            <p className="text-gray-500 text-xs transition-colors duration-200 group-hover:text-gray-400">
              {new Date(expense.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="text-right flex items-center space-x-3 ml-4">
            <span
              className={`text-lg font-bold transition-all duration-200 group-hover:scale-105 ${
                expense.type === "credit" ? "text-green-400" : "text-red-400"
              }`}
            >
              {expense.type === "credit" ? "+" : "-"}₹
              {expense.amount.toFixed(2)}
            </span>
            <button
              onClick={() => onDelete(expense.id)}
              className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-lg transition-all duration-200 transform hover:scale-110"
              title="Delete transaction"
            >
              <svg
                className="w-5 h-5 transition-transform duration-200 hover:rotate-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseItem;
