'use client';
import posthog from 'posthog-js';
import {PostHogProvider} from 'posthog-js/react';

const IS_PROD = process.env.NODE_ENV === 'production';

if (typeof window !== 'undefined' && IS_PROD) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
  });
}
export default function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  if (IS_PROD) {
    return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
  }
  return children;
}
