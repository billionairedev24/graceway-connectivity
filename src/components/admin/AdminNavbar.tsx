import { UserNav } from "@/components/user/UserNav";

const AdminNavbar = () => {
  return (
    <div className="bg-[#F7F5FF]">
      <div className="flex h-16 items-center px-4">
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;