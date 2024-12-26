import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell, Mail, MessageSquare, User, Settings, LogOut, Camera } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    whatsappNotifications: true
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const initials = user?.name.split(' ').map(n => n[0]).join('').toUpperCase();
  const firstName = user?.name.split(' ')[0];

  const handlePreferenceChange = (key: string) => {
    setPreferences(prev => {
      const newPrefs = { ...prev, [key]: !prev[key as keyof typeof prev] };
      toast({
        title: "Preference updated",
        description: `${key} notifications have been ${newPrefs[key as keyof typeof prev] ? 'enabled' : 'disabled'}.`
      });
      return newPrefs;
    });
  };

  return (
    <div className="bg-[#F7F5FF]">
      <div className="flex h-16 items-center px-4">
        <span className="text-sm text-muted-foreground">
          {getGreeting()}, {firstName}
        </span>
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar>
                  <AvatarImage src={user?.profilePicture} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <div className="p-2">
                <div className="flex items-center space-x-2 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user?.profilePicture} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mb-4" size="sm">
                  <Camera className="mr-2 h-4 w-4" />
                  Update Profile Picture
                </Button>

                <h4 className="text-sm font-medium mb-2">Notification Preferences</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">Email Notifications</span>
                    </div>
                    <Switch
                      checked={preferences.emailNotifications}
                      onCheckedChange={() => handlePreferenceChange('emailNotifications')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      <span className="text-sm">SMS Notifications</span>
                    </div>
                    <Switch
                      checked={preferences.smsNotifications}
                      onCheckedChange={() => handlePreferenceChange('smsNotifications')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      <span className="text-sm">WhatsApp Notifications</span>
                    </div>
                    <Switch
                      checked={preferences.whatsappNotifications}
                      onCheckedChange={() => handlePreferenceChange('whatsappNotifications')}
                    />
                  </div>
                </div>
              </div>

              <DropdownMenuSeparator />
              
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;