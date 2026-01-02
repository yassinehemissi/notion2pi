import { useState, useCallback } from 'react';
import { ApiError } from '@/types/formula';

export function useApiError() {
  const [error, setError] = useState<ApiError | null>(null);

  const handleError = useCallback((err: unknown, context?: string) => {
    let apiError: ApiError;

    if (err instanceof Error) {
      apiError = {
        message: err.message,
        code: context
      };
    } else if (typeof err === 'string') {
      apiError = {
        message: err,
        code: context
      };
    } else {
      apiError = {
        message: 'An unexpected error occurred',
        code: context
      };
    }

    setError(apiError);
    console.error(`API Error${context ? ` (${context})` : ''}:`, err);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleError,
    clearError,
    hasError: error !== null
  };
}