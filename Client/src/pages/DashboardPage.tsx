import { useState, useEffect } from 'react';
import Card from '../components/Card';
import { taskService, type Task } from '../services/taskService';
import { expenseService, type BalanceSummary } from '../services/expenseService';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [balance, setBalance] = useState<BalanceSummary | null>(null);
  const [recentExpenses, setRecentExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedTasks, balanceData, expensesData] = await Promise.all([
          taskService.getTasks(),
          expenseService.getBalanceSummary(),
          expenseService.getExpenses()
        ]);
        setTasks(fetchedTasks);
        setBalance(balanceData);
        setRecentExpenses(expensesData.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.isCompleted).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const totalExpensesIcon = (
    <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const tasksIcon = (
    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const lifeScoreIcon = (
    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome, {user?.name || 'User'}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Here's an overview of your student life management
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card
          title="Balance"
          value={`₹${balance?.totalBalance.toLocaleString() || '0'}`}
          icon={totalExpensesIcon}
          description={`Credit: ₹${balance?.totalCredit.toLocaleString() || '0'} • Debit: ₹${balance?.totalDebit.toLocaleString() || '0'}`}
          trend={{
            value: balance && balance.totalBalance >= 0 ? "Positive" : "Negative",
            isPositive: balance ? balance.totalBalance >= 0 : true
          }}
        />
        
        <Card
          title="Tasks Completed"
          value={`${completedTasks}/${totalTasks}`}
          icon={tasksIcon}
          description={`${completionRate}% completion rate`}
          trend={{
            value: pendingTasks > 0 ? `${pendingTasks} pending` : "All done!",
            isPositive: pendingTasks === 0
          }}
        />
        
        <Card
          title="Life Score"
          value="85/100"
          icon={lifeScoreIcon}
          description="Overall well-being score"
          trend={{
            value: "5%",
            isPositive: true
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Transactions
          </h2>
          <div className="space-y-3">
            {recentExpenses.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No transactions yet. Add your first expense!
              </p>
            ) : (
              recentExpenses.map((expense, index) => (
                <div key={expense.id} className={`flex items-center justify-between py-2 ${index < recentExpenses.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${expense.type === 'credit' ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200' : 'bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200'}`}>
                      {expense.type}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[150px]">
                      {expense.description || expense.category}
                    </span>
                  </div>
                  <span className={`text-sm font-medium ${expense.type === 'credit' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                    {expense.type === 'credit' ? '+' : '-'}₹{expense.amount.toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Upcoming Tasks
          </h2>
          <div className="space-y-3">
            {tasks.filter(task => !task.isCompleted).slice(0, 3).length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No pending tasks. Great job!
              </p>
            ) : (
              tasks.filter(task => !task.isCompleted).slice(0, 3).map(task => (
                <div key={task.id} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Created: {new Date(task.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded">Pending</span>
                </div>
              ))
            )}
            {tasks.filter(task => !task.isCompleted).length > 3 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center pt-2">
                And {tasks.filter(task => !task.isCompleted).length - 3} more tasks...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
