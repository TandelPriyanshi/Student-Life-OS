import DarkModeToggle from './DarkModeToggle';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user } = useAuth();
  return (
    <nav className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 fixed top-0 left-64 right-0 transition-colors duration-300">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Student Life OS
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <DarkModeToggle />
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Hi, {user?.username || 'User'}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
