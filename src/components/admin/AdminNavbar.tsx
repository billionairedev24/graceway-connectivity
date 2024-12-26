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
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  User, 
  Settings, 
  LogOut, 
  Upload,
  PencilLine
} from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    whatsappNotifications: true
  });
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
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

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to update the profile
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully."
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Here you would typically handle the file upload
      toast({
        title: "Profile Picture Updated",
        description: "Your profile picture has been updated successfully."
      });
    }
  };

  return (
    <div className="bg-[#F7F5FF]">
      <div className="flex h-16 items-center px-4">
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <div className="group relative">
                  <Avatar>
                    <AvatarImage src={user?.profilePicture} />
                    <AvatarFallback className="bg-[#FFD700] text-black">{initials}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 rounded-full bg-background p-1 shadow-sm group-hover:bg-muted">
                    <label htmlFor="avatar-upload" className="cursor-pointer">
                      <Upload className="h-3 w-3" />
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{getGreeting()}, {firstName}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem>
                    <PencilLine className="mr-2 h-4 w-4" />
                    Edit Profile
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile information here.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <Button type="submit" className="w-full">Save Changes</Button>
                  </form>
                </DialogContent>
              </Dialog>

              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              
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