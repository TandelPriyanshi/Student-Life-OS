import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const SplitExpensesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar />
      <Navbar />
      
      <main className="ml-64 mt-16 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Split Expenses
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage shared expenses with roommates and friends
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Create New Split
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Description (e.g., Pizza night)"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="number"
                placeholder="Total amount"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Split with:</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-indigo-600" />
                    <span className="text-gray-700 dark:text-gray-300">Roommate 1</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-indigo-600" />
                    <span className="text-gray-700 dark:text-gray-300">Roommate 2</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-indigo-600" />
                    <span className="text-gray-700 dark:text-gray-300">Friend 1</span>
                  </label>
                </div>
              </div>
              <button className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-300">
                Create Split
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Active Splits
            </h2>
            <div className="space-y-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Pizza Dinner</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">3 people</p>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">$45.00</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">You owe:</span>
                    <span className="font-medium text-orange-600 dark:text-orange-400">$15.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Roommate 1 owes:</span>
                    <span className="font-medium text-orange-600 dark:text-orange-400">$15.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Roommate 2 paid:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">$45.00</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Groceries</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">2 people</p>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">$120.00</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">You paid:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">$120.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Roommate 1 owes you:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">$60.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SplitExpensesPage;
