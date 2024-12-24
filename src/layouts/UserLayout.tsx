import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;