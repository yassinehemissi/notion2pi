import { useFormulasQuery } from './use-formulas-query';

export function useFormulas() {
  const { data: formulas = [], isLoading, error, refetch } = useFormulasQuery();

  return {
    formulas,
    isLoading,
    error: error ? { message: error.message } : null,
    refetch,
  };
}