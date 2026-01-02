import { useState, useEffect } from 'react';
import { FormulaListItem, LoadingState } from '@/types/formula';

export function useFormulas() {
  const [formulas, setFormulas] = useState<FormulaListItem[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const loadFormulas = async () => {
      try {
        setLoadingState({ isLoading: true, error: null });
        const response = await fetch("/api/formulas");
        
        if (!response.ok) {
          throw new Error(`Failed to fetch formulas: ${response.status}`);
        }
        
        const formulaList = await response.json();
        setFormulas(formulaList);
        setLoadingState({ isLoading: false, error: null });
      } catch (error) {
        console.error("Failed to load formulas:", error);
        setLoadingState({ 
          isLoading: false, 
          error: error instanceof Error ? error.message : "Failed to load formulas" 
        });
      }
    };

    loadFormulas();
  }, []);

  return {
    formulas,
    ...loadingState,
    refetch: () => {
      setLoadingState({ isLoading: true, error: null });
      // Re-trigger the effect by updating a dependency
    }
  };
}