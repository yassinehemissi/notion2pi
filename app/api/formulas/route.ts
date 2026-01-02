import { NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database-service';
import { warmCacheIfNeeded } from '@/lib/cache-init';

export async function GET() {
  try {
    // Warm cache on first API call
    await warmCacheIfNeeded();
    
    const formulas = await DatabaseService.getAllFormulas();
    
    // Create response with cache headers
    const response = NextResponse.json(formulas);
    
    // Set aggressive cache headers for static formula list
    response.headers.set('Cache-Control', 'public, max-age=1800, stale-while-revalidate=3600'); // 30 min cache, 1 hour stale
    response.headers.set('ETag', '"formulas-all"');
    
    return response;
  } catch (error) {
    console.error('Error fetching formulas:', error);
    return NextResponse.json(
      { error: 'Failed to fetch formulas' },
      { status: 500 }
    );
  }
}