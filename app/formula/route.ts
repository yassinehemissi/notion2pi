import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { saveFormula } from '@/lib/database';

// Schema for the 7-Vector properties
const SevenVectorSchema = z.object({
  Role: z.string().describe("The mathematical role or function of this component"),
  Domain: z.string().describe("The mathematical domain (input/output spaces)"),
  Binding: z.string().describe("How variables are bound or related"),
  Variance: z.string().describe("How this component varies or changes"),
  Geometric: z.string().describe("Geometric interpretation or meaning"),
  Invariant: z.string().describe("What remains constant or invariant"),
  Limits: z.string().describe("Behavior at limits or extremes"),
  narrative: z.string().describe("2-3 sentence explanation of significance and behavior")
});

// Schema for formula chunks
const FormulaChunkSchema = z.object({
  chunk: z.string().describe("LaTeX representation of this formula component"),
  displayName: z.string().describe("Human readable name for this component"),
  "7Vector": SevenVectorSchema
});

// Schema for the complete formula data
const FormulaDataSchema = z.object({
  meta: z.object({
    formula: z.string().describe("Full name of the formula"),
    latex: z.string().describe("Complete LaTeX representation of the formula"),
    slug: z.string().describe("URL-friendly slug (kebab-case)"),
    category: z.string().describe("Mathematical category (e.g., 'Algebra', 'Calculus', 'Statistics')")
  }),
  operators: z.array(z.string()).describe("LaTeX operators between chunks (e.g., ['+', '=', '\\\\times'])"),
  fullFormula7Vector: SevenVectorSchema.describe("7-Vector analysis of the complete formula"),
  subFormulas: z.array(FormulaChunkSchema).describe("Array of formula components/chunks")
});

export async function POST(request: NextRequest) {
  try {
    const { description } = await request.json();

    if (!description || typeof description !== 'string') {
      return NextResponse.json(
        { error: 'Description is required and must be a string' },
        { status: 400 }
      );
    }

    // Generate the formula object using AI
    const { object: formulaData } = await generateObject({
      model: openai('gpt-4o'),
      schema: FormulaDataSchema,
      prompt: `
        Generate a complete mathematical formula object based on this description: "${description}"

        Requirements:
        1. Create proper LaTeX notation for all mathematical expressions
        2. Break the formula into meaningful chunks/components
        3. Provide complete 7-Vector analysis for each component and the full formula
        4. Use proper mathematical terminology and notation
        5. Ensure the slug is URL-friendly (kebab-case)
        6. Make narratives educational and insightful (2-3 sentences each)
        7. Include appropriate operators between chunks
        8. Choose a relevant mathematical category

        The 7-Vector properties should be:
        - Role: What this component does mathematically
        - Domain: Input/output mathematical spaces
        - Binding: How variables relate to each other
        - Variance: How the component changes or varies
        - Geometric: Geometric interpretation or visualization
        - Invariant: What stays constant
        - Limits: Behavior at mathematical limits
        - narrative: Educational explanation of significance

        Examples of good LaTeX chunks:
        - "\\\\frac{1}{\\\\sigma\\\\sqrt{2\\\\pi}}" for normalizing constants
        - "e^{-\\\\frac{(x-\\\\mu)^2}{2\\\\sigma^2}}" for exponential terms
        - "a^2" for squared terms
        - "\\\\sum_{i=1}^{n}" for summations

        Make sure to escape backslashes properly in LaTeX (use \\\\ instead of \\).
      `,
    });

    // Save the generated formula to the database
    const formulaId = saveFormula(formulaData);

    // Return the slug for redirection
    return NextResponse.json({ 
      slug: formulaData.meta.slug,
      formula: formulaData.meta.formula,
      success: true 
    });

  } catch (error) {
    console.error('Error generating formula:', error);
    return NextResponse.json(
      { error: 'Failed to generate formula. Please try again.' },
      { status: 500 }
    );
  }
}