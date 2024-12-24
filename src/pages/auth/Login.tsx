import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { UserPlus } from 'lucide-react';

const Login = () => {
  const [phone, setPhone] = useState("");
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(phone);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid phone number. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to Graceway Church
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Young Adults Ministry
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <Input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white"
            />
          </div>

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Sign in
            </Button>
          </div>

          <div className="text-center">
            <Link
              to="/register"
              className="inline-flex items-center font-medium text-primary hover:text-primary/90"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Don't have an account? Register here
            </Link>
          </div>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Mock Users:</p>
          <p>Admin: 1234567890</p>
          <p>User: 0987654321</p>
        </div>
      </div>
    </div>
  );
};

export default Login;