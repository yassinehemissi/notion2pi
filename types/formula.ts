// Shared formula types
export interface FormulaListItem {
  slug: string;
  formula: string;
  category: string;
}

export interface FormulaItem extends FormulaListItem {
  latex: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface SearchResponse {
  formulas: FormulaItem[];
  pagination: PaginationInfo;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}