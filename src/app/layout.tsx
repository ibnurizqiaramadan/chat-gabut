import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';

const inter = Inter({ subsets: [ 'latin' ] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <Navbar />
          <Sidebar />
          {children}
        </main>
      </body>
    </html>
  );
}
