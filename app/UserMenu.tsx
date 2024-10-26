'use client';

import {ReactNode, useState, useTransition} from 'react';
import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {User, LogOut} from 'lucide-react';
import {signIntoGoogle, signOut} from './actions';
import {Session} from 'next-auth';
import {clearPreferences} from './CoffeePreferences';

export default function UserMenu({
  session,
  googleLogo,
}: {
  session: Session | null;
  googleLogo: ReactNode;
}) {
  const user = session?.user
    ? {
        name: session.user!.name ?? 'Unknown',
        image: session.user!.image,
      }
    : null;

  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSigningIn, startSigningIn] = useTransition();
  const [isSigningOut, startSigningOut] = useTransition();

  const handleGoogleSignIn = () => {
    startSigningIn(async () => {
      await signIntoGoogle();
    });
  };

  const handleLogout = () => {
    startSigningOut(async () => {
      await signOut();
    });
    clearPreferences();
  };

  return (
    <>
      <div className="w-full max-w-md mb-4 flex justify-end">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-2 bg-white rounded-full py-2 px-4 shadow-md cursor-pointer">
                <Avatar className="h-8 w-8">
                  {user.image && (
                    <AvatarImage src={user.image} alt={user.name} />
                  )}
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{user.name}</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 disabled:opacity-50"
                disabled={isSigningOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="outline" onClick={() => setIsSignInOpen(true)}>
            Sign In
          </Button>
        )}
      </div>
      <Dialog open={isSignInOpen} onOpenChange={setIsSignInOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
            <DialogDescription>
              Sign in with Google to generate your personalized coffee recipe.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={handleGoogleSignIn}
            className="w-full disabled:opacity-50"
            disabled={isSigningIn}
          >
            {googleLogo}
            Sign in with Google
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
