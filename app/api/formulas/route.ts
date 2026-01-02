import { NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database-service';

export async function GET() {
  try {
    const formulas = await DatabaseService.getAllFormulas();
    return NextResponse.json(formulas);
  } catch (error) {
    console.error('Error fetching formulas:', error);
    return NextResponse.json(
      { error: 'Failed to fetch formulas' },
      { status: 500 }
    );
  }
}