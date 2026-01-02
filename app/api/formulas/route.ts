import { NextResponse } from 'next/server';
import { getAllFormulas } from '@/lib/database';

export async function GET() {
  try {
    const formulas = getAllFormulas();
    return NextResponse.json(formulas);
  } catch (error) {
    console.error('Error fetching formulas:', error);
    return NextResponse.json(
      { error: 'Failed to fetch formulas' },
      { status: 500 }
    );
  }
}