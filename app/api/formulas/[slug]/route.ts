import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database-service';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const formula = await DatabaseService.getFormulaBySlug(params.slug);
    
    if (!formula) {
      return NextResponse.json(
        { error: 'Formula not found' },
        { status: 404 }
      );
    }

    // Create response with cache headers
    const response = NextResponse.json(formula);
    
    // Set long cache for individual formulas (they rarely change)
    response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=7200'); // 1 hour cache, 2 hours stale
    response.headers.set('ETag', `"formula-${params.slug}"`);
    
    return response;
  } catch (error) {
    console.error('Error fetching formula:', error);
    return NextResponse.json(
      { error: 'Failed to fetch formula' },
      { status: 500 }
    );
  }
}