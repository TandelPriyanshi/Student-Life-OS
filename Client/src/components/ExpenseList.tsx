import ExpenseItem from './ExpenseItem';

interface Transaction {
  id: string;
  amount: number;
  type: string;
  category: string;
  description?: string;
  date: string;
}

interface ExpenseListProps {
  expenses: Transaction[];
  onDeleteExpense: (id: string) => void;
}

const ExpenseList = ({ expenses, onDeleteExpense }: ExpenseListProps) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-gray-200">Transaction History</h2>
        <p className="text-gray-400 text-sm mt-1">Your recent financial activity</p>
      </div>
      
      {expenses.length === 0 ? (
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-400 text-lg font-medium mb-2">No transactions yet</p>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">Start tracking your expenses by adding your first transaction above</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-700">
          {expenses.map((transaction) => (
            <ExpenseItem key={transaction.id} expense={transaction} onDelete={onDeleteExpense} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
