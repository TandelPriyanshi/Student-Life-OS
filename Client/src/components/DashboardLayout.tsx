import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar />
      <Navbar />
      
      <main className="ml-64 mt-16 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
