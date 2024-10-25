'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import {CoffeeIcon, Loader2, User, LogOut} from 'lucide-react';

const brewingDevices = [
  'V60',
  'Chemex',
  'AeroPress',
  'French Press',
  'Kalita Wave',
];

const generateRecipe = (device: string) => {
  // This is a mock function to simulate AI-generated recipes
  const recipes: Record<string, string> = {
    V60: '15g coffee, medium-fine grind. 250ml water at 96°C. 30s bloom, then pour in spirals. Total brew time: 2:30.',
    Chemex:
      '30g coffee, medium-coarse grind. 500ml water at 94°C. 45s bloom, then two more pours. Total brew time: 4:00.',
    AeroPress:
      '17g coffee, fine grind. 220ml water at 88°C. Inverted method, steep for 1:30, then press for 30s.',
    'French Press':
      '30g coffee, coarse grind. 500ml water at 93°C. Steep for 4 minutes, then plunge slowly.',
    'Kalita Wave':
      '20g coffee, medium grind. 300ml water at 95°C. 30s bloom, then three even pours. Total brew time: 3:00.',
  };
  return recipes[device] || 'Recipe not available for this device.';
};

export function CoffeeRecipeGeneratorComponent() {
  const [device, setDevice] = useState<string>('');
  const [recipe, setRecipe] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [user, setUser] = useState<{name: string; image: string} | null>(null);

  const handleGenerate = () => {
    if (!device) return;
    if (!user) {
      setIsSignInOpen(true);
    } else {
      generateRecipeEntry();
    }
  };

  const handleGoogleSignIn = () => {
    // In a real application, this is where you would initiate the Google Sign-In flow
    // For this example, we'll simulate a successful sign-in
    setIsSignInOpen(false);
    setUser({
      name: 'Jane Doe',
      image: 'https://github.com/shadcn.png', // placeholder image
    });
    generateRecipeEntry();
  };

  const handleLogout = () => {
    // In a real application, you would handle the logout process here
    setUser(null);
    setRecipe('');
  };

  const generateRecipeEntry = () => {
    setIsGenerating(true);
    // Simulate API call delay
    setTimeout(() => {
      const newRecipe = generateRecipe(device);
      setRecipe(newRecipe);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-amber-200 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-4 flex justify-end">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-2 bg-white rounded-full py-2 px-4 shadow-md cursor-pointer">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{user.name}</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
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
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Filter Coffee Recipe Generator
          </CardTitle>
          <CardDescription className="text-center">
            Get AI-powered recipe ideas for your brew
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="device-select"
              className="text-sm font-medium text-gray-700"
            >
              Select your brewing device:
            </label>
            <Select onValueChange={setDevice} value={device}>
              <SelectTrigger id="device-select">
                <SelectValue placeholder="Choose a device" />
              </SelectTrigger>
              <SelectContent>
                {brewingDevices.map((dev) => (
                  <SelectItem key={dev} value={dev}>
                    {dev}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleGenerate}
            disabled={!device || isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <CoffeeIcon className="mr-2 h-4 w-4" />
                Generate Recipe
              </>
            )}
          </Button>
          {recipe && (
            <div className="mt-4 p-4 bg-amber-50 rounded-md">
              <h3 className="font-semibold mb-2">Your Recipe:</h3>
              <p>{recipe}</p>
            </div>
          )}
        </CardContent>
      </Card>
      <p className="text-xs text-center text-gray-700 mt-4">
        © {new Date().getFullYear()} Coffee Recipe Generator. All rights
        reserved.
      </p>

      <Dialog open={isSignInOpen} onOpenChange={setIsSignInOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
            <DialogDescription>
              Sign in with Google to generate your personalized coffee recipe.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={handleGoogleSignIn} className="w-full">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
