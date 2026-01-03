import { openai } from '@ai-sdk/openai';
import { generateText, Output } from 'ai';
import { FormulaDataSchema } from './schemas';

export const generateFormulaData = async (description: string) => {
  const { output } = await generateText({
    model: openai('gpt-4o-mini'),
    output: Output.object({ schema: FormulaDataSchema }),
    prompt: `
      Generate a complete mathematical formula object based on this description: "${description}"

      Requirements:
      1. Create proper LaTeX notation for all mathematical expressions
      2. Break the formula into meaningful chunks/components
      3. Provide complete 7-Vector analysis for each component and the full formula
      4. MUST provide "babyDefinition" for BOTH the main formula AND each component - very simple, intuitive explanations in 1-2 sentences for beginners
      5. Use proper mathematical terminology and notation
      6. Ensure the slug is URL-friendly (kebab-case)
      7. Make narratives educational and insightful (2-3 sentences each)
      8. Include appropriate operators between chunks
      9. Choose a relevant mathematical category

      The 7-Vector properties should be:
      - Role: What this component does mathematically
      - Domain: Input/output mathematical spaces
      - Binding: How variables relate to each other
      - Variance: How the component changes or varies
      - Geometric: Geometric interpretation or visualization
      - Invariant: What stays constant
      - Limits: Behavior at mathematical limits
      - narrative: Educational explanation of significance
      - babyDefinition: REQUIRED simple explanation for beginners

      Baby definitions are REQUIRED for BOTH main formula AND sub-components and should be:
      - Very simple explanations that a beginner could understand
      - 1-2 sentences maximum
      - Use everyday language when possible
      - Focus on intuitive understanding rather than technical details
      - Example for main formula: "This formula tells us how likely something is to happen based on a bell curve pattern"
      - Example for component: "This part makes sure the total area under the curve equals 1" instead of "Normalizing constant ensuring unit probability"
      - NEVER leave this field empty or null for ANY component or the main formula

      Examples of good LaTeX chunks:
      - "\\\\frac{1}{\\\\sigma\\\\sqrt{2\\\\pi}}" for normalizing constants
      - "e^{-\\\\frac{(x-\\\\mu)^2}{2\\\\sigma^2}}" for exponential terms
      - "a^2" for squared terms
      - "\\\\sum_{i=1}^{n}" for summations

      Make sure to escape backslashes properly in LaTeX (use \\\\ instead of \\).
    `,
  });
  return output;
};
