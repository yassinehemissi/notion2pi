import { useState, useCallback, useMemo } from 'react';
import { useSearchQuery } from './use-formulas-query';
import { FormulaItem, PaginationInfo } from '@/types/formula';

interface UseSearchOptions {
  initialQuery?: string;
  limit?: number;
  debounceMs?: number;
}

export function useSearch({ 
  initialQuery = '', 
  limit = 12, 
  debounceMs = 300 
}: UseSearchOptions = {}) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [currentPage, setCurrentPage] = useState(1);

  // Use React Query for search with debouncing handled by query key changes
  const { 
    data, 
    isLoading, 
    error, 
    refetch 
  } = useSearchQuery(searchQuery, currentPage, limit);

  const formulas = useMemo(() => data?.formulas || [], [data]);
  const pagination = useMemo(() => data?.pagination || null, [data]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  }, []);

  return {
    searchQuery,
    formulas,
    pagination,
    currentPage,
    isLoading,
    error: error ? { message: error.message } : null,
    handleSearchChange,
    handlePageChange,
    refetch,
  };
}