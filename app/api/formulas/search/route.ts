import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database-service';
import { warmCacheIfNeeded } from '@/lib/cache-init';

export async function GET(request: NextRequest) {
  try {
    // Warm cache on first API call
    await warmCacheIfNeeded();
    
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const offset = (page - 1) * limit;

    const response = await DatabaseService.searchFormulas(query, limit, offset);
    
    // Create response with cache headers
    const nextResponse = NextResponse.json(response);
    
    // Set cache headers
    const cacheMaxAge = query ? 300 : 900; // 5 min for search, 15 min for browse
    nextResponse.headers.set('Cache-Control', `public, max-age=${cacheMaxAge}, stale-while-revalidate=600`);
    nextResponse.headers.set('ETag', `"search-${query}-${page}-${limit}"`);
    
    return nextResponse;
  } catch (error) {
    console.error('Error in search API:', error);
    return NextResponse.json(
      { error: 'Failed to search formulas', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}