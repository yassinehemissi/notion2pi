// Database service layer to abstract database operations
import { 
  saveFormula as dbSaveFormula,
  getFormulaBySlug as dbGetFormulaBySlug,
  getAllFormulas as dbGetAllFormulas,
  searchFormulas as dbSearchFormulas,
  getFormulasWithPagination as dbGetFormulasWithPagination
} from './database';
import { cacheService, CacheKeys, withCache } from './cache-service';
import { FormulaData } from '@/app/formula/data';
import { FormulaListItem, FormulaItem, SearchResponse } from '@/types/formula';

export class DatabaseService {
  static async saveFormula(formulaData: FormulaData): Promise<number> {
    try {
      const result = dbSaveFormula(formulaData);
      
      // Invalidate related caches
      cacheService.invalidateFormula(formulaData.meta.slug);
      
      return result;
    } catch (error) {
      console.error('Database error saving formula:', error);
      throw new Error('Failed to save formula to database');
    }
  }

  static async getFormulaBySlug(slug: string): Promise<FormulaData | null> {
    return withCache(
      'formulas',
      (slug: string) => CacheKeys.formula(slug),
      async (slug: string) => {
        try {
          return dbGetFormulaBySlug(slug);
        } catch (error) {
          console.error('Database error getting formula by slug:', error);
          throw new Error('Failed to retrieve formula from database');
        }
      }
    )(slug);
  }

  static async getAllFormulas(): Promise<FormulaListItem[]> {
    return withCache(
      'static',
      () => CacheKeys.allFormulas(),
      async () => {
        try {
          return dbGetAllFormulas();
        } catch (error) {
          console.error('Database error getting all formulas:', error);
          throw new Error('Failed to retrieve formulas from database');
        }
      }
    )();
  }

  static async searchFormulas(
    query: string, 
    limit: number = 20, 
    offset: number = 0
  ): Promise<SearchResponse> {
    return withCache(
      'search',
      (query: string, limit: number, offset: number) => 
        CacheKeys.search(query, limit, offset),
      async (query: string, limit: number, offset: number) => {
        try {
          const result = query.trim() 
            ? dbSearchFormulas(query, limit, offset)
            : dbGetFormulasWithPagination(limit, offset);

          const totalPages = Math.ceil(result.total / limit);
          const currentPage = Math.floor(offset / limit) + 1;

          return {
            formulas: result.formulas,
            pagination: {
              currentPage,
              totalPages,
              totalItems: result.total,
              itemsPerPage: limit,
              hasNext: currentPage < totalPages,
              hasPrev: currentPage > 1
            }
          };
        } catch (error) {
          console.error('Database error searching formulas:', error);
          throw new Error('Failed to search formulas in database');
        }
      }
    )(query, limit, offset);
  }

  // Cache statistics endpoint
  static getCacheStats() {
    return cacheService.getStats();
  }

  // Cache management methods
  static clearCache() {
    cacheService.clearAll();
  }

  static invalidateFormula(slug: string) {
    cacheService.invalidateFormula(slug);
  }

  static invalidateSearch() {
    cacheService.invalidateSearch();
  }
}