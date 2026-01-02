import Link from 'next/link';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryProps {
  title?: string;
  message?: string;
  showBackButton?: boolean;
  backHref?: string;
  className?: string;
}

export function ErrorBoundary({ 
  title = "Something went wrong",
  message = "There was an error loading this content. Please try again.",
  showBackButton = true,
  backHref = "/",
  className = ""
}: ErrorBoundaryProps) {
  return (
    <div className={`min-h-screen w-full flex items-center justify-center ${className}`}>
      <div className="text-center max-w-md mx-auto px-6">
        <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {message}
        </p>
        {showBackButton && (
          <Link href={backHref}>
            <Button className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}