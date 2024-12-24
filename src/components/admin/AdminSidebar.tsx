import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Calendar,
  Home,
  MessageSquare,
  PieChart,
  Settings,
  Vote,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", icon: Home, path: "/admin" },
  { title: "Events", icon: Calendar, path: "/admin/events" },
  { title: "Polls", icon: Vote, path: "/admin/polls" },
  { title: "Announcements", icon: MessageSquare, path: "/admin/announcements" },
  { title: "Budget", icon: PieChart, path: "/admin/budget" },
  { title: "Settings", icon: Settings, path: "/admin/settings" },
];

const AdminSidebar = () => {
  const navigate = useNavigate();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Portal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={() => navigate(item.path)}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;