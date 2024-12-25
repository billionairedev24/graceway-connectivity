import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminSidebar from '@/components/admin/AdminSidebar';

const AdminLayout = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AdminSidebar />
        <SidebarInset className="flex-1 min-w-0">
          <AdminNavbar />
          <main className="p-4 overflow-auto">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;