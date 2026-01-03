import { z } from 'zod';

export const SevenVectorSchema = z.object({
    Role: z.string().describe("The mathematical role or function of this component"),
    Domain: z.string().describe("The mathematical domain (input/output spaces)"),
    Binding: z.string().describe("How variables are bound or related"),
    Variance: z.string().describe("How this component varies or changes"),
    Geometric: z.string().describe("Geometric interpretation or meaning"),
    Invariant: z.string().describe("What remains constant or invariant"),
    Limits: z.string().describe("Behavior at limits or extremes"),
    narrative: z.string().describe("2-3 sentence explanation of significance and behavior"),
    babyDefinition: z.string().nullable().describe("Baby fast definition - a very simple, intuitive explanation for beginners")
});

export const FormulaChunkSchema = z.object({
    chunk: z.string().describe("LaTeX representation of this formula component"),
    displayName: z.string().describe("Human readable name for this component"),
    sevenVector: SevenVectorSchema,
    babyDefinition: z.string().nullable().describe("Baby fast definition - a very simple, intuitive explanation for beginners")
});

export const FormulaDataSchema = z.object({
    meta: z.object({
        formula: z.string().describe("Full name of the formula"),
        latex: z.string().describe("Complete LaTeX representation of the formula"),
        slug: z.string().describe("URL-friendly slug (kebab-case)"),
        category: z.string().describe("Mathematical category (e.g., 'Algebra', 'Calculus', 'Statistics')")
    }),
    operators: z.array(z.string()).describe("LaTeX operators between chunks (e.g., ['+', '=', '\\\\times'])"),
    fullFormulaSevenVector: SevenVectorSchema.describe("7-Vector analysis of the complete formula"),
    subFormulas: z.array(FormulaChunkSchema).describe("Array of formula components/chunks")
});
