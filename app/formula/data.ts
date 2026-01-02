export interface FormulaChunk {
  chunk: string; // LaTeX representation
  displayName: string; // Human readable name
  "7Vector": {
    Role: string;
    Domain: string;
    Binding: string;
    Variance: string;
    Geometric: string;
    Invariant: string;
    Limits: string;
    narrative: string;
  };
}

export interface FormulaData {
  meta: {
    formula: string;
    latex: string;
    slug: string;
    category: string;
  };
  fullFormula7Vector: {
    Role: string;
    Domain: string;
    Binding: string;
    Variance: string;
    Geometric: string;
    Invariant: string;
    Limits: string;
    narrative: string;
  };
  subFormulas: FormulaChunk[];
  operators: string[]; // Operators between chunks (e.g., ["+", "="])
}

// Helper function to get formula data by slug from API
export async function getFormulaData(slug: string): Promise<FormulaData | null> {
  try {
    const response = await fetch(`/api/formulas/${slug}`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching formula:', error);
    return null;
  }
}