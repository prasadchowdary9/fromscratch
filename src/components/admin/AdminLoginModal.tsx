
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const AdminLoginModal = ({ isOpen, onClose, onLogin }: AdminLoginModalProps) => {
  const { toast } = useToast();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (credentials.email === 'mvprasad2023@gmail.com' && credentials.password === 'Venkat@123') {
      onLogin();
      toast({
        title: "Login successful",
        description: "Welcome to the admin panel",
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Admin Login</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter admin email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Enter password"
            />
          </div>
          <Button type="submit" className="w-full">Login</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminLoginModal;
