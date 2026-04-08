import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import { authAPI } from '../services/api';

interface User {
  userId: string;
  name: string;
  email: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'UPDATE_USER'; payload: User };

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'UPDATE_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getCurrentUser: () => Promise<void>;
  updateUserProfile: (name?: string, email?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          dispatch({ type: 'SET_LOADING', payload: true });
          await getCurrentUser();
        } catch (error) {
          console.error('Failed to initialize auth:', error);
          localStorage.removeItem('token');
          dispatch({ type: 'LOGIN_FAILURE' });
        }
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      
      const response = await authAPI.login(email, password);
      
      // Store token
      localStorage.setItem('token', response.token);
      
      // Get user info
      await getCurrentUser();
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: response, token: response.token } });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  const getCurrentUser = async () => {
    try {
      const user = await authAPI.getCurrentUser();
      dispatch({ type: 'UPDATE_USER', payload: user });
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token: localStorage.getItem('token')! } });
    } catch (error) {
      console.error('Failed to get current user:', error);
      localStorage.removeItem('token');
      dispatch({ type: 'LOGIN_FAILURE' });
      throw error;
    }
  };

  const updateUserProfile = async (name?: string, email?: string) => {
    try {
      const updatedUser = await authAPI.updateUserProfile(name, email);
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
    } catch (error) {
      console.error('Failed to update user profile:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    getCurrentUser,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
