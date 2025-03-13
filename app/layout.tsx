import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/lib/context/auth-context'
import { Toaster } from '@/components/ui/sonner'
import Providers from './providers'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
});

export const metadata: Metadata = {
  title: 'Varnothsava 2025',
  description: 'Annual celebration of innovation, creativity, and engineering excellence',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Providers>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}