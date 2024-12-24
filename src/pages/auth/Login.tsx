import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

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
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#FFD700] focus:border-[#FFD700] focus:z-10 sm:text-sm"
            />
          </div>

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#FFD700] hover:bg-[#E6C200] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFD700]"
            >
              Sign in
            </Button>
          </div>

          <div className="text-sm text-center">
            <Link
              to="/register"
              className="font-medium text-[#FFD700] hover:text-[#E6C200]"
            >
              Don't have an account? Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;