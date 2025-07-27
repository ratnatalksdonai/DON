import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

export function AuthModal({ isOpen, setIsOpen, mode, setMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = mode === 'signIn'
      ? await signIn(email, password)
      : await signUp(email, password);

    setLoading(false);

    if (!error) {
      toast({
        title: `Successfully ${mode === 'signIn' ? 'signed in' : 'signed up'}!`,
        description: mode === 'signUp' ? 'Please check your email to verify your account.' : 'Welcome back!',
      });
      setIsOpen(false);
      setEmail('');
      setPassword('');
    }
  };

  const switchMode = () => {
    setMode(mode === 'signIn' ? 'signUp' : 'signIn');
    setEmail('');
    setPassword('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === 'signIn' ? 'Sign In' : 'Create an Account'}</DialogTitle>
          <DialogDescription>
            {mode === 'signIn'
              ? 'Enter your credentials to access your account.'
              : 'Enter your email and password to get started.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
                required
                disabled={loading}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="col-span-3"
                required
                minLength="6"
                disabled={loading}
              />
            </div>
          </div>
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
            <Button type="button" variant="ghost" onClick={switchMode} disabled={loading}>
              {mode === 'signIn' ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {mode === 'signIn' ? 'Sign In' : 'Sign Up'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}