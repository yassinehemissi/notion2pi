// Removed PlotTrace interface - no longer needed

// Removed visualization interfaces - no longer needed

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
  // Removed visualization - no longer supported
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

// Removed expression evaluation utilities - no longer needed

export const normalDistributionData: FormulaData = {
  meta: {
    formula: "Normal Distribution Density Function",
    latex: "f(x)=\\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}",
    slug: "normal-distribution",
    category: "Probability Theory",
  },
  operators: ["\\times"], // Single operator between the two main chunks
  fullFormula7Vector: {
    Role: "Probability density",
    Domain: "ℝ → ℝ≥0",
    Binding: "x free, μ,σ parameters",
    Variance: "σ scales width",
    Geometric: "Bell curve",
    Invariant: "Total area = 1",
    Limits: "σ→0 → Dirac; σ→∞ → flat",
    narrative: "The normal distribution density function represents the iconic bell curve that appears throughout nature and statistics. It transforms any real input x into a non-negative probability density, with the curve's width controlled by σ and center positioned at μ. This fundamental function maintains unit area under its curve, making it a proper probability distribution that approaches extreme forms as σ varies.",
  },
  subFormulas: [
    {
      chunk: "\\frac{1}{\\sigma\\sqrt{2\\pi}}",
      displayName: "1/(σ√(2π))",
      "7Vector": {
        Role: "Normalising constant",
        Domain: "ℝ>0",
        Binding: "depends on σ",
        Variance: "Inverse scale",
        Geometric: "Peak height",
        Invariant: "Keeps area = 1",
        Limits: "σ→0 → ∞; σ→∞ → 0",
        narrative: "This normalizing constant acts as the gatekeeper of probability, ensuring the bell curve maintains unit area regardless of its width. As σ shrinks, this term grows larger to compensate for the narrowing curve, while expanding σ reduces the peak height. It's the mathematical embodiment of conservation - what's lost in width is gained in height.",
      },
    },
    {
      chunk: "e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}",
      displayName: "e^(-(x-μ)²/(2σ²))",
      "7Vector": {
        Role: "Exponential decay",
        Domain: "ℝ",
        Binding: "x free",
        Variance: "Quadratic penalty",
        Geometric: "Bell wings",
        Invariant: "Symmetry around μ",
        Limits: "±∞ → 0",
        narrative: "The exponential decay term creates the signature bell shape through its quadratic penalty function. Distance from the mean μ is squared and scaled by σ², then negated in the exponent, causing rapid decay as we move away from center. This mathematical structure ensures perfect symmetry around μ while the wings gracefully approach zero at the extremes.",
      },
    },
  ],
};

// Pythagorean Theorem Formula Data
export const pythagoreanTheoremData: FormulaData = {
  meta: {
    formula: "Pythagorean Theorem",
    latex: "a^2 + b^2 = c^2",
    slug: "pythagorean-theorem",
    category: "Geometry",
  },
  operators: ["+", "="], // Plus between a² and b², equals before c²
  fullFormula7Vector: {
    Role: "Geometric relationship",
    Domain: "ℝ>0 → ℝ>0",
    Binding: "a,b sides, c hypotenuse",
    Variance: "Scale invariant",
    Geometric: "Right triangle",
    Invariant: "Sum of squares",
    Limits: "a,b→0 → c→0; a→∞ → c→a",
    narrative: "The Pythagorean theorem establishes the fundamental relationship between the sides of a right triangle. It states that the square of the hypotenuse (the side opposite the right angle) is equal to the sum of the squares of the other two sides. This relationship has been known for over 2500 years and forms the foundation of Euclidean geometry, with applications ranging from basic construction to advanced physics and engineering.",
  },
  subFormulas: [
    {
      chunk: "a^2",
      displayName: "a²",
      "7Vector": {
        Role: "First leg squared",
        Domain: "ℝ>0",
        Binding: "a is side length",
        Variance: "Quadratic growth",
        Geometric: "Area of square on side a",
        Invariant: "Always positive",
        Limits: "a→0 → 0; a→∞ → ∞",
        narrative: "The square of the first leg represents the area of a square constructed on side 'a' of the right triangle. This geometric interpretation was fundamental to the ancient Greek understanding of the theorem, where they visualized actual squares built on each side of the triangle. The quadratic relationship means that doubling the side length quadruples the area.",
      },
    },
    {
      chunk: "b^2",
      displayName: "b²",
      "7Vector": {
        Role: "Second leg squared",
        Domain: "ℝ>0",
        Binding: "b is side length",
        Variance: "Quadratic growth",
        Geometric: "Area of square on side b",
        Invariant: "Always positive",
        Limits: "b→0 → 0; b→∞ → ∞",
        narrative: "The square of the second leg represents the area of a square constructed on side 'b' of the right triangle. Together with a², this term forms half of the fundamental equation. The geometric significance is that the combined areas of the squares on the two legs exactly equals the area of the square on the hypotenuse, providing a visual proof of the theorem.",
      },
    },
    {
      chunk: "c^2",
      displayName: "c²",
      "7Vector": {
        Role: "Hypotenuse squared",
        Domain: "ℝ>0",
        Binding: "c is hypotenuse length",
        Variance: "Quadratic growth",
        Geometric: "Area of square on hypotenuse",
        Invariant: "Equals a² + b²",
        Limits: "c→max(a,b) when other→0",
        narrative: "The square of the hypotenuse represents the area of the largest square in the Pythagorean construction. This term is always equal to the sum of the squares of the other two sides, making it the cornerstone of the theorem. The hypotenuse is always the longest side of a right triangle, and its square provides the geometric balance that makes the theorem universally true.",
      },
    },
  ],
};

// Jarque-Bera Test Statistic Formula Data
export const jarqueBeraData: FormulaData = {
  meta: {
    formula: "Jarque-Bera Test Statistic",
    latex: "JB = \\frac{n}{6}\\left(S^2 + \\frac{(K-3)^2}{4}\\right)",
    slug: "jarque-bera-test",
    category: "Statistics",
  },
  operators: ["=", "\\times", "(", "+", ")"], // JB = (n/6) × (S² + (K-3)²/4)
  fullFormula7Vector: {
    Role: "Normality test statistic",
    Domain: "ℝ⁺ → ℝ≥0",
    Binding: "n sample size, S skewness, K kurtosis",
    Variance: "Increases with deviation from normality",
    Geometric: "Chi-squared distribution under null hypothesis",
    Invariant: "Always non-negative",
    Limits: "JB→0 for normal data; JB→∞ for non-normal",
    narrative: "The Jarque-Bera test statistic measures how much the skewness and kurtosis of sample data deviate from those of a normal distribution. Under the null hypothesis of normality, JB follows a chi-squared distribution with 2 degrees of freedom. Values close to zero suggest normality, while large values indicate departure from normality, making it a powerful tool for testing distributional assumptions in statistical analysis.",
  },
  subFormulas: [
    {
      chunk: "JB",
      displayName: "JB",
      "7Vector": {
        Role: "Test statistic result",
        Domain: "ℝ≥0",
        Binding: "JB is the computed test statistic",
        Variance: "Varies with sample characteristics",
        Geometric: "Distance from normality",
        Invariant: "Always non-negative",
        Limits: "JB→0 for perfect normality",
        narrative: "The Jarque-Bera statistic quantifies the overall departure from normality by combining information about both skewness and kurtosis. A value of zero indicates perfect normality, while larger values suggest increasing evidence against the normality assumption.",
      },
    },
    {
      chunk: "\\frac{n}{6}",
      displayName: "n/6",
      "7Vector": {
        Role: "Sample size scaling factor",
        Domain: "ℝ⁺ → ℝ⁺",
        Binding: "n is sample size",
        Variance: "Linear in sample size",
        Geometric: "Scaling coefficient",
        Invariant: "Always positive",
        Limits: "n→∞ increases sensitivity",
        narrative: "The scaling factor n/6 adjusts the test statistic based on sample size, ensuring that larger samples provide more statistical power to detect deviations from normality. This factor is derived from the asymptotic distribution theory of sample moments and ensures the test statistic follows a chi-squared distribution under the null hypothesis.",
      },
    },
    {
      chunk: "S^2",
      displayName: "S²",
      "7Vector": {
        Role: "Squared skewness component",
        Domain: "ℝ → ℝ≥0",
        Binding: "S is sample skewness",
        Variance: "Quadratic in skewness",
        Geometric: "Asymmetry penalty",
        Invariant: "Always non-negative",
        Limits: "S²→0 for symmetric data",
        narrative: "The squared skewness term penalizes departures from symmetry in the data distribution. Skewness measures the asymmetry of the distribution - positive skewness indicates a longer right tail, while negative skewness indicates a longer left tail. Squaring ensures that both positive and negative skewness contribute equally to the test statistic.",
      },
    },
    {
      chunk: "\\frac{(K-3)^2}{4}",
      displayName: "(K-3)²/4",
      "7Vector": {
        Role: "Excess kurtosis component",
        Domain: "ℝ → ℝ≥0",
        Binding: "K is sample kurtosis",
        Variance: "Quadratic in excess kurtosis",
        Geometric: "Tail heaviness penalty",
        Invariant: "Zero when K=3 (normal)",
        Limits: "(K-3)²→0 for normal kurtosis",
        narrative: "The excess kurtosis term measures how much the tail behavior of the data deviates from that of a normal distribution, which has kurtosis K=3. Values above 3 indicate heavy tails (leptokurtic), while values below 3 indicate light tails (platykurtic). The factor of 4 in the denominator provides appropriate weighting relative to the skewness term in the overall test statistic.",
      },
    },
  ],
};

// Formula registry for future formulas
export const formulaRegistry: Record<string, FormulaData> = {
  "normal-distribution": normalDistributionData,
  "pythagorean-theorem": pythagoreanTheoremData,
  "jarque-bera-test": jarqueBeraData,
};

// Helper function to get formula data by slug
export function getFormulaData(slug: string): FormulaData | null {
  return formulaRegistry[slug] || null;
}