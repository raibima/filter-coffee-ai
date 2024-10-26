import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import RecipeGenerator from './RecipeGenerator';
import UserMenu from './UserMenu';
import {unstable_cacheLife as cacheLife} from 'next/cache';
import {auth} from './auth';
import {Suspense} from 'react';

export const maxDuration = 60;

export default function Home() {
  return (
    <StaticShell
      userMenu={
        <Suspense fallback={null}>
          <UserData />
        </Suspense>
      }
    />
  );
}

async function StaticShell({userMenu}: {userMenu: React.ReactNode}) {
  'use cache';
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-amber-200 flex flex-col items-center justify-center p-4">
      {userMenu}
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
          <RecipeGenerator />
        </CardContent>
      </Card>
      <Footnote />
      <p className="text-xs text-center text-gray-700 mt-1">
        <a
          href="https://forms.gle/LbtJeBZG2dK29WrQA"
          className="font-bold underline"
        >
          Submit Feedback
        </a>
      </p>
    </div>
  );
}

async function UserData() {
  const session = await auth();
  return (
    <UserMenu
      session={session}
      googleLogo={
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
      }
    />
  );
}

async function Footnote() {
  'use cache';
  cacheLife('days');
  return (
    <p className="text-xs text-center text-gray-700 mt-4">
      © {new Date().getFullYear()}{' '}
      <a href="https://rputra.me" className="font-bold">
        Raibima Putra
      </a>
      . All rights reserved.
    </p>
  );
}
