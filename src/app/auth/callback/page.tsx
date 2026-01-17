'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Account, Client } from 'appwrite';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const client = new Client()
          .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
          .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 'YOUR_PROJECT_ID');

        const account = new Account(client);

        // Get the current session
        await account.get();

        // Redirect to the main page on success
        router.push('/');
      } catch (error) {
        console.error('Auth callback error:', error);
        router.push('/auth/failure');
      }
    };

    handleAuthCallback();
  }, [ router ]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Authenticating...</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  );
}
