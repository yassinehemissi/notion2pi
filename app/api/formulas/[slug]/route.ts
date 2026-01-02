import { NextRequest, NextResponse } from 'next/server';
import { getFormulaBySlug } from '@/lib/database';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const formula = getFormulaBySlug(params.slug);
    
    if (!formula) {
      return NextResponse.json(
        { error: 'Formula not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(formula);
  } catch (error) {
    console.error('Error fetching formula:', error);
    return NextResponse.json(
      { error: 'Failed to fetch formula' },
      { status: 500 }
    );
  }
}