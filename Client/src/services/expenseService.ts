import api from './api';

export interface Expense {
  id: string;
  amount: number;
  type: 'credit' | 'debit';
  category: string;
  description?: string;
  date: string;
}

export interface CreateExpenseRequest {
  amount: number;
  type: 'credit' | 'debit';
  category: string;
  description: string;
  date: string;
}

export interface BalanceSummary {
  totalBalance: number;
  totalCredit: number;
  totalDebit: number;
}

const logApiError = (method: string, error: any) => {
  console.error(`API Error - ${method}:`, {
    status: error.response?.status,
    statusText: error.response?.statusText,
    data: error.response?.data,
    message: error.message,
    url: error.config?.url
  });
};

export const expenseService = {
  // Get all expenses for the logged-in user
  getExpenses: async (): Promise<Expense[]> => {
    try {
      const response = await api.get('/expense');
      return response.data;
    } catch (error: any) {
      logApiError('getExpenses', error);
      throw new Error(error.response?.data?.message || `Failed to fetch expenses (${error.response?.status || 'Network Error'})`);
    }
  },

  // Create a new expense
  createExpense: async (data: CreateExpenseRequest): Promise<Expense> => {
    try {
      const response = await api.post('/expense', data);
      return response.data;
    } catch (error: any) {
      logApiError('createExpense', error);
      throw new Error(error.response?.data?.message || `Failed to create expense (${error.response?.status || 'Network Error'})`);
    }
  },

  // Delete an expense
  deleteExpense: async (id: string): Promise<void> => {
    try {
      await api.delete(`/expense/${id}`);
    } catch (error: any) {
      logApiError('deleteExpense', error);
      throw new Error(error.response?.data?.message || `Failed to delete expense (${error.response?.status || 'Network Error'})`);
    }
  },

  // Get balance summary
  getBalanceSummary: async (): Promise<BalanceSummary> => {
    try {
      const response = await api.get('/balance/summary');
      return response.data;
    } catch (error: any) {
      console.error('API Error - getBalanceSummary:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        url: error.config?.url
      });
      throw new Error(error.response?.data?.message || `Failed to fetch balance summary (${error.response?.status || 'Network Error'})`);
    }
  }
};
