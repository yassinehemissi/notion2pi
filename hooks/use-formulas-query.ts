import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FormulaListItem, FormulaItem, SearchResponse } from '@/types/formula';
import { FormulaData } from '@/app/formula/data';

// Query keys for consistent cache management
export const formulaQueryKeys = {
  all: ['formulas'] as const,
  lists: () => [...formulaQueryKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...formulaQueryKeys.lists(), filters] as const,
  details: () => [...formulaQueryKeys.all, 'detail'] as const,
  detail: (slug: string) => [...formulaQueryKeys.details(), slug] as const,
  search: (query: string, page: number, limit: number) => 
    [...formulaQueryKeys.all, 'search', { query, page, limit }] as const,
};

// Fetch all formulas
export function useFormulasQuery() {
  return useQuery({
    queryKey: formulaQueryKeys.lists(),
    queryFn: async (): Promise<FormulaListItem[]> => {
      const response = await fetch('/api/formulas');
      if (!response.ok) {
        throw new Error('Failed to fetch formulas');
      }
      return response.json();
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Fetch single formula by slug
export function useFormulaQuery(slug: string) {
  return useQuery({
    queryKey: formulaQueryKeys.detail(slug),
    queryFn: async (): Promise<FormulaData> => {
      const response = await fetch(`/api/formulas/${slug}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Formula not found');
        }
        throw new Error('Failed to fetch formula');
      }
      return response.json();
    },
    staleTime: 30 * 60 * 1000, // 30 minutes (formulas rarely change)
    gcTime: 60 * 60 * 1000, // 1 hour
    enabled: !!slug, // Only run if slug is provided
  });
}

// Search formulas with pagination
export function useSearchQuery(query: string, page: number = 1, limit: number = 12) {
  return useQuery({
    queryKey: formulaQueryKeys.search(query, page, limit),
    queryFn: async (): Promise<SearchResponse> => {
      const params = new URLSearchParams({
        q: query,
        page: page.toString(),
        limit: limit.toString(),
      });
      
      const response = await fetch(`/api/formulas/search?${params}`);
      if (!response.ok) {
        throw new Error('Failed to search formulas');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    // Keep previous data while loading new search results
    placeholderData: (previousData) => previousData,
  });
}

// Generate new formula mutation
export function useGenerateFormulaMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (description: string): Promise<{ slug: string; formula: string }> => {
      const response = await fetch('/formula', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate formula');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      // Invalidate and refetch formula lists
      queryClient.invalidateQueries({ queryKey: formulaQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: formulaQueryKeys.all });
      
      // Prefetch the newly created formula
      queryClient.prefetchQuery({
        queryKey: formulaQueryKeys.detail(data.slug),
        queryFn: async () => {
          const response = await fetch(`/api/formulas/${data.slug}`);
          return response.json();
        },
      });
    },
  });
}

// Prefetch related formulas
export function usePrefetchFormula() {
  const queryClient = useQueryClient();
  
  return (slug: string) => {
    queryClient.prefetchQuery({
      queryKey: formulaQueryKeys.detail(slug),
      queryFn: async () => {
        const response = await fetch(`/api/formulas/${slug}`);
        if (!response.ok) throw new Error('Failed to fetch formula');
        return response.json();
      },
      staleTime: 30 * 60 * 1000, // 30 minutes
    });
  };
}

// Optimistic updates for formula interactions
export function useOptimisticFormulaUpdate() {
  const queryClient = useQueryClient();
  
  return {
    // Optimistically update formula view count
    incrementViewCount: (slug: string) => {
      queryClient.setQueryData(
        formulaQueryKeys.detail(slug),
        (old: FormulaData | undefined) => {
          if (!old) return old;
          // This would update view count if we tracked it
          return old;
        }
      );
    },
    
    // Optimistically add to favorites (if we implement this feature)
    toggleFavorite: (slug: string, isFavorite: boolean) => {
      queryClient.setQueryData(
        formulaQueryKeys.detail(slug),
        (old: FormulaData | undefined) => {
          if (!old) return old;
          // This would update favorite status if we tracked it
          return old;
        }
      );
    },
  };
}