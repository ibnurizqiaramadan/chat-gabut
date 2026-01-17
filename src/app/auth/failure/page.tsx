'use client';

import { useRouter } from 'next/navigation';

export default function AuthFailure() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Authentication Failed</h1>
        <p className="mb-4">There was an error during authentication. Please try again.</p>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
