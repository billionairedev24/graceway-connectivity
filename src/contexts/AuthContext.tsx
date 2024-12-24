import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: 'admin' | 'user';
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  login: (phone: string) => Promise<void>;
  logout: () => void;
  register: (data: Omit<User, 'id' | 'role'>) => Promise<void>;
}

// Export the context so it can be imported by useAuth
export const AuthContext = createContext<AuthContextType | null>(null);

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    phone: '1234567890',
    email: 'admin@graceway.church',
    role: 'admin',
    profilePicture: '/placeholder.svg'
  },
  {
    id: '2',
    name: 'Regular User',
    phone: '0987654321',
    email: 'user@graceway.church',
    role: 'user',
    profilePicture: '/placeholder.svg'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (phone: string) => {
    const foundUser = mockUsers.find(u => u.phone === phone);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      toast({
        title: "Welcome back!",
        description: `Logged in as ${foundUser.name}`,
      });
      navigate(foundUser.role === 'admin' ? '/admin' : '/user');
    } else {
      throw new Error('Invalid phone number');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const register = async (data: Omit<User, 'id' | 'role'>) => {
    const newUser: User = {
      ...data,
      id: Math.random().toString(),
      role: 'user'
    };
    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    toast({
      title: "Registration successful!",
      description: "Welcome to Graceway Church",
    });
    navigate('/user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

// Export the useAuth hook directly from this file
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}