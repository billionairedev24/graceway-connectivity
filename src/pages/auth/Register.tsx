import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from '@/contexts/AuthContext';
import { QrCode, UserRound, LogIn } from 'lucide-react';

const Register = () => {
  const { register } = useAuth();
  const [isQRMode, setIsQRMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Join Graceway Church</CardTitle>
          <CardDescription>Create your account to connect with our community</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Button 
              variant={!isQRMode ? "default" : "outline"}
              className="flex-1"
              onClick={() => setIsQRMode(false)}
            >
              <UserRound className="mr-2 h-4 w-4" />
              Form
            </Button>
            <Button 
              variant={isQRMode ? "default" : "outline"}
              className="flex-1"
              onClick={() => setIsQRMode(true)}
            >
              <QrCode className="mr-2 h-4 w-4" />
              QR Code
            </Button>
          </div>

          {isQRMode ? (
            <div className="text-center p-8">
              <div className="mx-auto w-48 h-48 bg-white p-2 rounded-lg shadow-sm">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://graceway.church/register" 
                  alt="Registration QR Code"
                  className="w-full h-full"
                />
              </div>
              <p className="mt-4 text-sm text-gray-600">Scan the QR code to register</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Register</Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center text-sm text-[#FFD700] hover:text-[#E6C200]"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Already have an account? Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;