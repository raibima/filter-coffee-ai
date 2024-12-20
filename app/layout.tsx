import type {Metadata} from 'next';
import {SessionProvider} from 'next-auth/react';
import localFont from 'next/font/local';
import './globals.css';
import AnalyticsProvider from './AnalyticsProvider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Filter Coffee AI',
  description:
    'Effortlessly generate perfect filter coffee recipes with the power of AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnalyticsProvider>
          <SessionProvider>{children}</SessionProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
