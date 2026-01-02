// Cache initialization utility to avoid circular dependencies
import { cacheService, CacheKeys } from './cache-service';
import { 
  getAllFormulas,
  getFormulasWithPagination 
} from './database';

let cacheWarmed = false;

export async function warmCacheIfNeeded() {
  if (cacheWarmed) return;
  
  try {
    console.log('Warming cache...');
    
    // Warm all formulas cache
    await cacheService.warmCache('static', CacheKeys.allFormulas(), async () => {
      return getAllFormulas();
    });

    // Warm popular search results (empty query)
    await cacheService.warmCache('search', CacheKeys.search('', 12, 0), async () => {
      const result = getFormulasWithPagination(12, 0);
      const totalPages = Math.ceil(result.total / 12);
      
      return {
        formulas: result.formulas,
        pagination: {
          currentPage: 1,
          totalPages,
          totalItems: result.total,
          itemsPerPage: 12,
          hasNext: totalPages > 1,
          hasPrev: false
        }
      };
    });

    cacheWarmed = true;
    console.log('Cache warmed successfully');
  } catch (error) {
    console.error('Failed to warm cache:', error);
  }
}