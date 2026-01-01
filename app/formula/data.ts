// Types for formula data structure
export interface FormulaVisualization {
  type: 'normalizing_constant' | 'exponential_decay' | 'custom';
  parameters: {
    name: string;
    min: number;
    max: number;
    step: number;
    default: number;
    label: string;
  }[];
  plotConfig: {
    title: string;
    xAxisLabel: string;
    yAxisLabel: string;
    traces: {
      name: string;
      color: string;
      type: 'line' | 'marker' | 'both';
      style?: 'solid' | 'dash' | 'dot';
    }[];
  };
}

export interface FormulaChunk {
  chunk: string; // LaTeX representation
  displayName: string; // Human readable name
  renderComponent: {
    type: 'fraction' | 'exponential' | 'custom';
    numerator?: string;
    denominator?: string;
    base?: string;
    exponent?: {
      numerator: string;
      denominator: string;
    };
  };
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
  visualization: FormulaVisualization;
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
}

// Pythagorean Theorem Formula Data
export const pythagoreanTheoremData: FormulaData = {
  meta: {
    formula: "Pythagorean Theorem",
    latex: "a^2 + b^2 = c^2",
    slug: "pythagorean-theorem",
    category: "Geometry"
  },
  fullFormula7Vector: {
    Role: "Geometric relationship",
    Domain: "ℝ>0 → ℝ>0",
    Binding: "a,b sides, c hypotenuse",
    Variance: "Scale invariant",
    Geometric: "Right triangle",
    Invariant: "Sum of squares",
    Limits: "a,b→0 → c→0; a→∞ → c→a",
    narrative: "The Pythagorean theorem establishes the fundamental relationship between the sides of a right triangle. It states that the square of the hypotenuse (the side opposite the right angle) is equal to the sum of the squares of the other two sides. This relationship has been known for over 2500 years and forms the foundation of Euclidean geometry, with applications ranging from basic construction to advanced physics and engineering."
  },
  subFormulas: [
    {
      chunk: "a^2",
      displayName: "a²",
      renderComponent: {
        type: 'exponential',
        base: 'a',
        exponent: {
          numerator: '2',
          denominator: ''
        }
      },
      "7Vector": {
        Role: "First leg squared",
        Domain: "ℝ>0",
        Binding: "a is side length",
        Variance: "Quadratic growth",
        Geometric: "Area of square on side a",
        Invariant: "Always positive",
        Limits: "a→0 → 0; a→∞ → ∞",
        narrative: "The square of the first leg represents the area of a square constructed on side 'a' of the right triangle. This geometric interpretation was fundamental to the ancient Greek understanding of the theorem, where they visualized actual squares built on each side of the triangle. The quadratic relationship means that doubling the side length quadruples the area."
      },
      visualization: {
        type: 'custom',
        parameters: [
          {
            name: 'a',
            min: 1,
            max: 10,
            step: 0.1,
            default: 3,
            label: 'Side a'
          },
          {
            name: 'b',
            min: 1,
            max: 10,
            step: 0.1,
            default: 4,
            label: 'Side b'
          }
        ],
        plotConfig: {
          title: 'Right Triangle and Pythagorean Relationship',
          xAxisLabel: 'x',
          yAxisLabel: 'y',
          traces: [
            {
              name: 'Triangle',
              color: '#2563eb',
              type: 'line'
            },
            {
              name: 'Square on a',
              color: '#dc2626',
              type: 'line'
            },
            {
              name: 'Square on b',
              color: '#16a34a',
              type: 'line'
            },
            {
              name: 'Square on c',
              color: '#ca8a04',
              type: 'line'
            }
          ]
        }
      }
    },
    {
      chunk: "b^2",
      displayName: "b²",
      renderComponent: {
        type: 'exponential',
        base: 'b',
        exponent: {
          numerator: '2',
          denominator: ''
        }
      },
      "7Vector": {
        Role: "Second leg squared",
        Domain: "ℝ>0",
        Binding: "b is side length",
        Variance: "Quadratic growth",
        Geometric: "Area of square on side b",
        Invariant: "Always positive",
        Limits: "b→0 → 0; b→∞ → ∞",
        narrative: "The square of the second leg represents the area of a square constructed on side 'b' of the right triangle. Together with a², this term forms half of the fundamental equation. The geometric significance is that the combined areas of the squares on the two legs exactly equals the area of the square on the hypotenuse, providing a visual proof of the theorem."
      },
      visualization: {
        type: 'custom',
        parameters: [
          {
            name: 'a',
            min: 1,
            max: 10,
            step: 0.1,
            default: 3,
            label: 'Side a'
          },
          {
            name: 'b',
            min: 1,
            max: 10,
            step: 0.1,
            default: 4,
            label: 'Side b'
          }
        ],
        plotConfig: {
          title: 'Squares on Triangle Sides',
          xAxisLabel: 'Side Length',
          yAxisLabel: 'Area (Side²)',
          traces: [
            {
              name: 'a²',
              color: '#dc2626',
              type: 'marker'
            },
            {
              name: 'b²',
              color: '#16a34a',
              type: 'marker'
            },
            {
              name: 'c²',
              color: '#ca8a04',
              type: 'marker'
            }
          ]
        }
      }
    },
    {
      chunk: "c^2",
      displayName: "c²",
      renderComponent: {
        type: 'exponential',
        base: 'c',
        exponent: {
          numerator: '2',
          denominator: ''
        }
      },
      "7Vector": {
        Role: "Hypotenuse squared",
        Domain: "ℝ>0",
        Binding: "c is hypotenuse length",
        Variance: "Quadratic growth",
        Geometric: "Area of square on hypotenuse",
        Invariant: "Equals a² + b²",
        Limits: "c→max(a,b) when other→0",
        narrative: "The square of the hypotenuse represents the area of the largest square in the Pythagorean construction. This term is always equal to the sum of the squares of the other two sides, making it the cornerstone of the theorem. The hypotenuse is always the longest side of a right triangle, and its square provides the geometric balance that makes the theorem universally true."
      },
      visualization: {
        type: 'custom',
        parameters: [
          {
            name: 'a',
            min: 1,
            max: 10,
            step: 0.1,
            default: 3,
            label: 'Side a'
          },
          {
            name: 'b',
            min: 1,
            max: 10,
            step: 0.1,
            default: 4,
            label: 'Side b'
          }
        ],
        plotConfig: {
          title: 'Pythagorean Theorem Verification',
          xAxisLabel: 'Parameter Value',
          yAxisLabel: 'Area',
          traces: [
            {
              name: 'a² + b²',
              color: '#2563eb',
              type: 'line'
            },
            {
              name: 'c²',
              color: '#dc2626',
              type: 'line'
            }
          ]
        }
      }
    }
  ]
};

// Normal Distribution Formula Data
export const normalDistributionData: FormulaData = {
  meta: {
    formula: "Normal Distribution Density Function",
    latex: "f(x)=\\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}",
    slug: "normal-distribution",
    category: "Probability Theory"
  },
  fullFormula7Vector: {
    Role: "Probability density",
    Domain: "ℝ → ℝ≥0",
    Binding: "x free, μ,σ parameters",
    Variance: "σ scales width",
    Geometric: "Bell curve",
    Invariant: "Total area = 1",
    Limits: "σ→0 → Dirac; σ→∞ → flat",
    narrative: "The normal distribution density function represents the iconic bell curve that appears throughout nature and statistics. It transforms any real input x into a non-negative probability density, with the curve's width controlled by σ and center positioned at μ. This fundamental function maintains unit area under its curve, making it a proper probability distribution that approaches extreme forms as σ varies."
  },
  subFormulas: [
    {
      chunk: "\\frac{1}{\\sigma\\sqrt{2\\pi}}",
      displayName: "1/(σ√(2π))",
      renderComponent: {
        type: 'fraction',
        numerator: '1',
        denominator: 'σ√(2π)'
      },
      "7Vector": {
        Role: "Normalising constant",
        Domain: "ℝ>0",
        Binding: "depends on σ",
        Variance: "Inverse scale",
        Geometric: "Peak height",
        Invariant: "Keeps area = 1",
        Limits: "σ→0 → ∞; σ→∞ → 0",
        narrative: "This normalizing constant acts as the gatekeeper of probability, ensuring the bell curve maintains unit area regardless of its width. As σ shrinks, this term grows larger to compensate for the narrowing curve, while expanding σ reduces the peak height. It's the mathematical embodiment of conservation - what's lost in width is gained in height."
      },
      visualization: {
        type: 'normalizing_constant',
        parameters: [
          {
            name: 'sigma',
            min: 0.1,
            max: 3,
            step: 0.1,
            default: 1,
            label: 'σ (Standard Deviation)'
          }
        ],
        plotConfig: {
          title: 'Normalizing Constant vs Standard Deviation',
          xAxisLabel: 'σ (Standard Deviation)',
          yAxisLabel: '1/(σ√(2π))',
          traces: [
            {
              name: '1/(σ√(2π))',
              color: '#2563eb',
              type: 'line'
            },
            {
              name: 'Current Value',
              color: '#dc2626',
              type: 'marker'
            }
          ]
        }
      }
    },
    {
      chunk: "e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}",
      displayName: "e^(-(x-μ)²/(2σ²))",
      renderComponent: {
        type: 'exponential',
        base: 'e',
        exponent: {
          numerator: '−(x−μ)²',
          denominator: '2σ²'
        }
      },
      "7Vector": {
        Role: "Exponential decay",
        Domain: "ℝ",
        Binding: "x free",
        Variance: "Quadratic penalty",
        Geometric: "Bell wings",
        Invariant: "Symmetry around μ",
        Limits: "±∞ → 0",
        narrative: "The exponential decay term creates the signature bell shape through its quadratic penalty function. Distance from the mean μ is squared and scaled by σ², then negated in the exponent, causing rapid decay as we move away from center. This mathematical structure ensures perfect symmetry around μ while the wings gracefully approach zero at the extremes."
      },
      visualization: {
        type: 'exponential_decay',
        parameters: [
          {
            name: 'mu',
            min: -3,
            max: 3,
            step: 0.1,
            default: 0,
            label: 'μ (Mean)'
          },
          {
            name: 'sigma',
            min: 0.1,
            max: 3,
            step: 0.1,
            default: 1,
            label: 'σ (Std Dev)'
          }
        ],
        plotConfig: {
          title: 'Exponential Decay Component vs Full Normal Distribution',
          xAxisLabel: 'x',
          yAxisLabel: 'f(x)',
          traces: [
            {
              name: 'e^(-(x-μ)²/(2σ²))',
              color: '#2563eb',
              type: 'line'
            },
            {
              name: 'Full Normal Distribution',
              color: '#dc2626',
              type: 'line',
              style: 'dash'
            }
          ]
        }
      }
    }
  ]
};

// Formula registry for future formulas
export const formulaRegistry: Record<string, FormulaData> = {
  'normal-distribution': normalDistributionData,
  'pythagorean-theorem': pythagoreanTheoremData,
  // Future formulas can be added here
  // 'quadratic-formula': quadraticFormulaData,
  // 'euler-identity': eulerIdentityData,
};

// Helper function to get formula data by slug
export function getFormulaData(slug: string): FormulaData | null {
  return formulaRegistry[slug] || null;
}