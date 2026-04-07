import api from './api';

export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: string;
}

export interface CreateTaskRequest {
  title: string;
}

export interface UpdateTaskRequest {
  title: string;
}

export const taskService = {
  // Get all tasks for the logged-in user
  getTasks: async (): Promise<Task[]> => {
    try {
      const response = await api.get('/task');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch tasks');
    }
  },

  // Create a new task
  createTask: async (title: string): Promise<Task> => {
    try {
      const response = await api.post('/task', { title });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create task');
    }
  },

  // Toggle task completion status
  toggleTask: async (id: string): Promise<Task> => {
    try {
      const response = await api.put(`/task/${id}/toggle`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to toggle task');
    }
  },

  // Update task title
  updateTask: async (id: string, title: string): Promise<Task> => {
    try {
      const response = await api.put(`/task/${id}`, { title });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update task');
    }
  },

  // Delete a task
  deleteTask: async (id: string): Promise<void> => {
    try {
      await api.delete(`/task/${id}`);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete task');
    }
  }
};
