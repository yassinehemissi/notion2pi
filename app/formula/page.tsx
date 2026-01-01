'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FormulaPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the normal distribution formula by default
    router.replace('/formula/normal-distribution');
  }, [router]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Redirecting...</p>
      </div>
    </div>
  );
}
