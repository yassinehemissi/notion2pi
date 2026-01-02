import { LRUCache } from 'lru-cache';

// Cache configuration interface
interface CacheConfig {
  maxSize: number;
  ttl: number; // Time to live in milliseconds
  updateAgeOnGet?: boolean;
  updateAgeOnHas?: boolean;
}

// Default cache configurations for different data types
const CACHE_CONFIGS = {
  formulas: { maxSize: 200, ttl: 30 * 60 * 1000 }, // 30 minutes
  search: { maxSize: 100, ttl: 5 * 60 * 1000 }, // 5 minutes
  metadata: { maxSize: 50, ttl: 15 * 60 * 1000 }, // 15 minutes
  static: { maxSize: 500, ttl: 60 * 60 * 1000 }, // 1 hour
} as const;

// Cache key generators
export const CacheKeys = {
  formula: (slug: string) => `formula:${slug}`,
  allFormulas: () => 'formulas:all',
  search: (query: string, limit: number, offset: number) => 
    `search:${query}:${limit}:${offset}`,
  searchCount: (query: string) => `search:count:${query}`,
  formulasByCategory: (category: string) => `formulas:category:${category}`,
  popularFormulas: () => 'formulas:popular',
} as const;

// Generic cache service class
class CacheService {
  private caches: Map<string, LRUCache<string, any>> = new Map();
  private hitCounts: Map<string, number> = new Map();
  private missCounts: Map<string, number> = new Map();

  constructor() {
    // Initialize caches for different data types
    Object.entries(CACHE_CONFIGS).forEach(([type, config]) => {
      this.caches.set(type, new LRUCache({
        max: config.maxSize,
        ttl: config.ttl,
        updateAgeOnGet: true,
        updateAgeOnHas: true,
      }));
    });
  }

  // Get from cache
  get<T>(cacheType: keyof typeof CACHE_CONFIGS, key: string): T | undefined {
    const cache = this.caches.get(cacheType);
    if (!cache) return undefined;

    const value = cache.get(key);
    
    // Update metrics
    if (value !== undefined) {
      this.incrementHit(cacheType);
    } else {
      this.incrementMiss(cacheType);
    }

    return value;
  }

  // Set in cache
  set<T>(cacheType: keyof typeof CACHE_CONFIGS, key: string, value: T): void {
    const cache = this.caches.get(cacheType);
    if (!cache) return;

    cache.set(key, value);
  }

  // Delete from cache
  delete(cacheType: keyof typeof CACHE_CONFIGS, key: string): boolean {
    const cache = this.caches.get(cacheType);
    if (!cache) return false;

    return cache.delete(key);
  }

  // Check if key exists in cache
  has(cacheType: keyof typeof CACHE_CONFIGS, key: string): boolean {
    const cache = this.caches.get(cacheType);
    if (!cache) return false;

    const exists = cache.has(key);
    
    // Update metrics
    if (exists) {
      this.incrementHit(cacheType);
    } else {
      this.incrementMiss(cacheType);
    }

    return exists;
  }

  // Clear specific cache
  clear(cacheType: keyof typeof CACHE_CONFIGS): void {
    const cache = this.caches.get(cacheType);
    if (cache) {
      cache.clear();
    }
  }

  // Clear all caches
  clearAll(): void {
    this.caches.forEach(cache => cache.clear());
    this.hitCounts.clear();
    this.missCounts.clear();
  }

  // Invalidate related caches (for when data changes)
  invalidateFormula(slug: string): void {
    this.delete('formulas', CacheKeys.formula(slug));
    this.clear('search'); // Clear all search results
    this.delete('static', CacheKeys.allFormulas());
  }

  // Invalidate search caches
  invalidateSearch(): void {
    this.clear('search');
  }

  // Warm cache with popular/static data
  async warmCache<T>(
    cacheType: keyof typeof CACHE_CONFIGS,
    key: string,
    dataLoader: () => Promise<T>
  ): Promise<T> {
    try {
      const data = await dataLoader();
      this.set(cacheType, key, data);
      return data;
    } catch (error) {
      console.error(`Failed to warm cache for ${cacheType}:${key}`, error);
      throw error;
    }
  }

  // Get cache statistics
  getStats() {
    const stats: Record<string, any> = {};
    
    this.caches.forEach((cache, type) => {
      const hits = this.hitCounts.get(type) || 0;
      const misses = this.missCounts.get(type) || 0;
      const total = hits + misses;
      
      stats[type] = {
        size: cache.size,
        maxSize: cache.max,
        hits,
        misses,
        hitRate: total > 0 ? (hits / total * 100).toFixed(2) + '%' : '0%',
        memoryUsage: this.estimateMemoryUsage(cache),
      };
    });

    return stats;
  }

  // Estimate memory usage (rough calculation)
  private estimateMemoryUsage(cache: LRUCache<string, any>): string {
    const sizeInBytes = cache.size * 1024; // Rough estimate: 1KB per item
    if (sizeInBytes < 1024) return `${sizeInBytes}B`;
    if (sizeInBytes < 1024 * 1024) return `${(sizeInBytes / 1024).toFixed(1)}KB`;
    return `${(sizeInBytes / (1024 * 1024)).toFixed(1)}MB`;
  }

  // Increment hit counter
  private incrementHit(cacheType: string): void {
    this.hitCounts.set(cacheType, (this.hitCounts.get(cacheType) || 0) + 1);
  }

  // Increment miss counter
  private incrementMiss(cacheType: string): void {
    this.missCounts.set(cacheType, (this.missCounts.get(cacheType) || 0) + 1);
  }

  // Get or set pattern (cache-aside)
  async getOrSet<T>(
    cacheType: keyof typeof CACHE_CONFIGS,
    key: string,
    dataLoader: () => Promise<T>
  ): Promise<T> {
    // Try to get from cache first
    const cached = this.get<T>(cacheType, key);
    if (cached !== undefined) {
      return cached;
    }

    // Load data and cache it
    try {
      const data = await dataLoader();
      this.set(cacheType, key, data);
      return data;
    } catch (error) {
      console.error(`Failed to load data for cache ${cacheType}:${key}`, error);
      throw error;
    }
  }
}

// Singleton instance
export const cacheService = new CacheService();

// Cache warming utilities
export const CacheWarming = {
  // Warm static formulas cache
  async warmStaticFormulas(dataLoader: () => Promise<any>) {
    return cacheService.warmCache('static', CacheKeys.allFormulas(), dataLoader);
  },

  // Warm popular formulas
  async warmPopularFormulas(dataLoader: () => Promise<any>) {
    return cacheService.warmCache('static', CacheKeys.popularFormulas(), dataLoader);
  },

  // Warm specific formula
  async warmFormula(slug: string, dataLoader: () => Promise<any>) {
    return cacheService.warmCache('formulas', CacheKeys.formula(slug), dataLoader);
  },
};

// Cache middleware for API routes
export const withCache = <T>(
  cacheType: keyof typeof CACHE_CONFIGS,
  keyGenerator: (...args: any[]) => string,
  dataLoader: (...args: any[]) => Promise<T>
) => {
  return async (...args: any[]): Promise<T> => {
    const key = keyGenerator(...args);
    return cacheService.getOrSet(cacheType, key, () => dataLoader(...args));
  };
};

export default cacheService;