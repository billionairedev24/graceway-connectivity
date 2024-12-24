import { Outlet } from 'react-router-dom';
import UserNavbar from '@/components/user/UserNavbar';

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <UserNavbar />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;