import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const initials = user?.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#FFD700]">Graceway Church</h1>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full bg-[#FFD700] text-white"
            >
              {initials}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="font-medium">
              {user?.name}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default AdminNavbar;