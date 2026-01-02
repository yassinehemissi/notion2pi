import { useState, useEffect, useCallback } from 'react';
import { FormulaItem, PaginationInfo, SearchResponse, LoadingState } from '@/types/formula';

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
  const [formulas, setFormulas] = useState<FormulaItem[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: true,
    error: null
  });

  const fetchFormulas = useCallback(async (query: string = '', page: number = 1) => {
    try {
      setLoadingState({ isLoading: true, error: null });
      
      const params = new URLSearchParams({
        q: query,
        page: page.toString(),
        limit: limit.toString()
      });

      const response = await fetch(`/api/formulas/search?${params}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch formulas: ${response.status}`);
      }

      const data: SearchResponse = await response.json();
      setFormulas(data.formulas);
      setPagination(data.pagination);
      setCurrentPage(page);
      setLoadingState({ isLoading: false, error: null });
    } catch (error) {
      console.error('Error fetching formulas:', error);
      setFormulas([]);
      setPagination(null);
      setLoadingState({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch formulas'
      });
    }
  }, [limit]);

  // Search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchFormulas(searchQuery, 1);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchQuery, fetchFormulas, debounceMs]);

  const handlePageChange = useCallback((page: number) => {
    fetchFormulas(searchQuery, page);
  }, [searchQuery, fetchFormulas]);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  return {
    searchQuery,
    formulas,
    pagination,
    currentPage,
    ...loadingState,
    handleSearchChange,
    handlePageChange,
    refetch: () => fetchFormulas(searchQuery, currentPage)
  };
}