import { UserNav } from "@/components/user/UserNav";
import { ReactNode } from "react";

interface AdminNavbarProps {
  children?: ReactNode;
}

const AdminNavbar = ({ children }: AdminNavbarProps) => {
  return (
    <div className="border-b bg-background">
      <div className="flex h-16 items-center px-4 gap-4">
        {children}
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;