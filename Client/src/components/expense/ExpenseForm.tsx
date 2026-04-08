import React, { useState } from 'react';

interface ExpenseFormProps {
  onAddExpense: (expenseData: {
    amount: number;
    type: 'credit' | 'debit';
    category: string;
    description: string;
    date: string;
  }) => void;
}

const ExpenseForm = ({ onAddExpense }: ExpenseFormProps) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState<'credit' | 'debit'>('debit');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!amount || parseFloat(amount) <= 0) {
      console.error('Amount must be greater than 0');
      return;
    }
    
    if (!category) {
      console.error('Category is required');
      return;
    }
    
    if (!date) {
      console.error('Date is required');
      return;
    }
    
    // Form data - convert date to ISO format for C# DateTime compatibility
    const formData = {
      amount: parseFloat(amount),
      type,
      category,
      description,
      date: new Date(date).toISOString()
    };
    
    // Send data to parent
    onAddExpense(formData);
    
    // Reset form fields
    setAmount('');
    setCategory('');
    setDescription('');
    setDate('');
    setType('debit');
  };
  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-6 shadow-md">
      <h2 className="text-xl font-semibold text-gray-200 mb-6">Add Transaction</h2>
      
      {/* Transaction Type Toggle */}
      <div className="flex space-x-2 mb-6">
        <button
          type="button"
          onClick={() => setType('credit')}
          className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] ${
            type === 'credit'
              ? 'bg-green-600 text-white shadow-lg'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Credit
        </button>
        <button
          type="button"
          onClick={() => setType('debit')}
          className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] ${
            type === 'debit'
              ? 'bg-red-600 text-white shadow-lg'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Debit
        </button>
      </div>
      
      <div className="space-y-6">
        {/* Amount Field */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Amount
          </label>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-gray-500"
          />
        </div>

        {/* Category Field */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-gray-500"
          >
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Rent">Rent</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <input
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-gray-500"
          />
        </div>

        {/* Date Field */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-gray-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 shadow-lg hover:shadow-xl"
        >
          Add Transaction
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
