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
import { Bell, Mail, MessageSquare, User, Settings, Sun, Moon, LogOut, Eye, EyeOff, Camera } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";

const UserNavbar = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    whatsappNotifications: true,
    profileVisible: true
  });
  const initials = user?.name.split(' ').map(n => n[0]).join('').toUpperCase();

  const handlePreferenceChange = (key: string) => {
    setPreferences(prev => {
      const newPrefs = { ...prev, [key]: !prev[key as keyof typeof prev] };
      toast({
        title: "Preferences updated",
        description: `${key} has been ${newPrefs[key as keyof typeof prev] ? 'enabled' : 'disabled'}.`
      });
      return newPrefs;
    });
  };

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2.5">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#FFD700] dark:text-[#FFD700]">Graceway Church</h1>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarImage src={user?.profilePicture} />
                  <AvatarFallback className="bg-[#FFD700] text-black">{initials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <div className="p-2">
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
              
              <div className="p-2">
                <h4 className="text-sm font-medium mb-2">Profile Settings</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {preferences.profileVisible ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                      <span className="text-sm">Profile Visibility</span>
                    </div>
                    <Switch
                      checked={preferences.profileVisible}
                      onCheckedChange={() => handlePreferenceChange('profileVisible')}
                    />
                  </div>
                  <Button variant="outline" className="w-full" size="sm">
                    <Camera className="mr-2 h-4 w-4" />
                    Update Profile Picture
                  </Button>
                </div>
              </div>

              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;