import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
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
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="relative flex items-center">
        <span className="flex-1 p-4 font-semibold">Admin Portal</span>
        <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-20">
          <SidebarTrigger 
            className="h-8 w-8 hover:bg-transparent"
          >
            <ChevronLeft className="h-4 w-4 group-data-[state=expanded]:hidden" />
            <ChevronRight className="h-4 w-4 group-data-[state=collapsed]:hidden" />
          </SidebarTrigger>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => navigate(item.path)}
                    tooltip={item.title}
                  >
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