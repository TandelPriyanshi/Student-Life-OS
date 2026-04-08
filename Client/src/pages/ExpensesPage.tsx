import { useState, useEffect } from 'react';
import BalanceCard from '../components/expense/BalanceCard';
import ExpenseForm from '../components/expense/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import { expenseService, type Expense, type BalanceSummary } from '../services/expenseService';

const ExpensesPage = () => {
  // State
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [summary, setSummary] = useState<BalanceSummary>({
    totalBalance: 0,
    totalCredit: 0,
    totalDebit: 0
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'credit' | 'debit'>('all');

  // Fetch data on load
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [expensesData, summaryData] = await Promise.all([
        expenseService.getExpenses(),
        expenseService.getBalanceSummary()
      ]);

      setExpenses(expensesData);
      setSummary(summaryData);
    } catch (err: any) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // Handle add transaction
  const handleAddExpense = async (data: {
    amount: number;
    type: 'credit' | 'debit';
    category: string;
    description: string;
    date: string;
  }) => {
    try {
      setError(null);
      await expenseService.createExpense(data);

      // Fetch updated data
      await fetchData();
    } catch (err: any) {
      console.error('Error adding expense:', err);
      setError(err.message || 'Failed to add transaction');
    }
  };

  // Handle delete transaction
  const handleDelete = async (id: string) => {
    try {
      setError(null);
      await expenseService.deleteExpense(id);

      // Update local state
      setExpenses((prev) => prev.filter((expense) => expense.id !== id));

      // Refresh balance summary
      const summaryData = await expenseService.getBalanceSummary();
      setSummary(summaryData);
    } catch (err: any) {
      console.error('Error deleting expense:', err);
      setError(err.message || 'Failed to delete transaction');
    }
  };

  // Filter expenses based on selected filter
  const filteredExpenses = filter === 'all'
    ? expenses
    : expenses.filter((expense) => expense.type === filter);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-200 mb-2">Expenses</h1>
        <p className="text-gray-400">Track and manage your personal expenses</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <span className="ml-4 text-gray-400">Loading...</span>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Section 1: Balance Summary Card */}
          <BalanceCard
            totalBalance={summary.totalBalance}
            totalCredit={summary.totalCredit}
            totalDebit={summary.totalDebit}
          />

          {/* Section 2: Add Transaction Form */}
          <ExpenseForm onAddExpense={handleAddExpense} />

          {/* Section 3: Filter Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-200 ease-in-out shadow-sm hover:shadow-md ${
                filter === 'all'
                  ? 'bg-blue-600 text-white shadow-blue-500/30'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
              }`}
            >
              <span>📊</span>
              <span>All ({expenses.length})</span>
            </button>
            <button
              onClick={() => setFilter('credit')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-200 ease-in-out shadow-sm hover:shadow-md ${
                filter === 'credit'
                  ? 'bg-blue-600 text-white shadow-blue-500/30'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
              }`}
            >
              <span>➕</span>
              <span>Credit ({expenses.filter(e => e.type === 'credit').length})</span>
            </button>
            <button
              onClick={() => setFilter('debit')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-200 ease-in-out shadow-sm hover:shadow-md ${
                filter === 'debit'
                  ? 'bg-blue-600 text-white shadow-blue-500/30'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
              }`}
            >
              <span>➖</span>
              <span>Debit ({expenses.filter(e => e.type === 'debit').length})</span>
            </button>
          </div>

          {/* Section 4: Transaction History */}
          <ExpenseList expenses={filteredExpenses} onDeleteExpense={handleDelete} />
        </div>
      )}
    </div>
  );
};

export default ExpensesPage;
