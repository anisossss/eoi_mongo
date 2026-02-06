/**
 * CSIR EOI 8119/06/01/2026 - Root Layout
 * Main application layout with providers and global styles
 * 
 * Demonstrates proficiency in:
 * - Next.js App Router
 * - React components
 * - TypeScript
 * - Modern UI/UX
 */

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'CSIR EOI Software Development | Population Data Visualization',
  description: 'CSIR EOI 8119/06/01/2026 - A modern web application demonstrating proficiency in software development, featuring DataUSA population data visualization with Grid and Tree views.',
  keywords: ['CSIR', 'Software Development', 'Next.js', 'React', 'TypeScript', 'Docker', 'MongoDB', 'Data Visualization'],
  authors: [{ name: 'CSIR Software Development Services' }],
  creator: 'CSIR EOI Team',
  publisher: 'CSIR',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: 'https://csir-eoi.co.za',
    title: 'CSIR EOI Software Development Services',
    description: 'Modern web application demonstrating software development capabilities for CSIR EOI 8119/06/01/2026',
    siteName: 'CSIR EOI Portal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CSIR EOI Software Development',
    description: 'Population Data Visualization Platform',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans antialiased bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 min-h-screen">
        <Providers>
          <div className="flex flex-col min-h-screen">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
