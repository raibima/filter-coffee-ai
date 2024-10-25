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

export const maxDuration = 60;

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-amber-200 flex flex-col items-center justify-center p-4">
      <UserMenu>
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
      </UserMenu>
    </div>
  );
}

async function Footnote() {
  'use cache';
  cacheLife('days');
  return (
    <p className="text-xs text-center text-gray-700 mt-4">
      © {new Date().getFullYear()}{' '}
      <a href="https://rputra.me" className="font-bold">Raibima Putra</a>. All rights reserved.
    </p>
  );
}
