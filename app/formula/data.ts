// Simplified, truly dynamic types with full Plotly support
export interface PlotTrace {
  name: string;
  color: string;
  type: "scatter" | "bar" | "histogram" | "box" | "violin" | "heatmap" | "contour" | "surface" | "mesh3d" | "scatter3d" | "pie" | "sunburst" | "treemap" | "funnel" | "waterfall" | "indicator" | "table" | "candlestick" | "ohlc" | "sankey" | "parcats" | "parcoords" | "scattergeo" | "choropleth" | "scattermapbox" | "choroplethmapbox" | "densitymapbox" | "scatterpolar" | "scatterpolargl" | "barpolar" | "area";
  mode?: "lines" | "markers" | "lines+markers" | "text" | "lines+text" | "markers+text" | "lines+markers+text";
  style?: "solid" | "dash" | "dot" | "dashdot";
  expression?: string; // Mathematical expression to evaluate (optional for custom data)
  // Support for custom Plotly data
  x?: number[] | string[];
  y?: number[] | string[];
  z?: number[][];
  values?: number[];
  labels?: string[];
  text?: string[];
  marker?: {
    color?: string | string[] | number[];
    size?: number | number[];
    symbol?: string;
    opacity?: number;
    colorscale?: string;
    showscale?: boolean;
    colorbar?: any;
  };
  line?: {
    color?: string;
    width?: number;
    dash?: string;
    shape?: "linear" | "spline" | "hv" | "vh" | "hvh" | "vhv";
  };
  fill?: "none" | "tozeroy" | "tozerox" | "tonexty" | "tonextx" | "toself" | "tonext";
  fillcolor?: string;
  // Add any other Plotly trace properties
  [key: string]: any;
}

export interface Parameter {
  name: string;
  min: number;
  max: number;
  step: number;
  default: number;
  label: string;
}

export interface VisualizationConfig {
  title: string;
  xAxisLabel: string;
  yAxisLabel: string;
  zAxisLabel?: string; // For 3D plots
  xRange?: [number, number];
  yRange?: [number, number];
  zRange?: [number, number];
  parameters: Parameter[];
  traces: PlotTrace[];
  // Full Plotly layout support
  layout?: {
    width?: number;
    height?: number;
    margin?: { t?: number; r?: number; b?: number; l?: number };
    showlegend?: boolean;
    legend?: any;
    annotations?: any[];
    shapes?: any[];
    images?: any[];
    scene?: { // For 3D plots
      xaxis?: any;
      yaxis?: any;
      zaxis?: any;
      camera?: any;
    };
    geo?: any; // For geographic plots
    polar?: any; // For polar plots
    coloraxis?: any;
    colorscale?: any;
    [key: string]: any;
  };
  // Plotly config options
  config?: {
    displayModeBar?: boolean;
    displaylogo?: boolean;
    modeBarButtonsToRemove?: string[];
    modeBarButtonsToAdd?: any[];
    responsive?: boolean;
    [key: string]: any;
  };
}

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
  visualization?: VisualizationConfig; // Now optional!
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

// Expression evaluator utility
export function evaluateExpression(expression: string, parameters: Record<string, number>): number[] {
  // Simple expression evaluator - can be extended for more complex expressions
  const x = Array.from({ length: 200 }, (_, i) => -4 + (i * 8) / 199);
  
  return x.map(xi => {
    let expr = expression;
    
    // Replace variables
    expr = expr.replace(/\bx\b/g, xi.toString());
    Object.entries(parameters).forEach(([key, value]) => {
      expr = expr.replace(new RegExp(`\\b${key}\\b`, 'g'), value.toString());
    });
    
    // Replace mathematical functions
    expr = expr.replace(/sqrt\(([^)]+)\)/g, 'Math.sqrt($1)');
    expr = expr.replace(/exp\(([^)]+)\)/g, 'Math.exp($1)');
    expr = expr.replace(/cos\(([^)]+)\)/g, 'Math.cos($1)');
    expr = expr.replace(/sin\(([^)]+)\)/g, 'Math.sin($1)');
    expr = expr.replace(/\bpi\b/g, 'Math.PI');
    expr = expr.replace(/\^/g, '**');
    
    try {
      return eval(expr);
    } catch (error) {
      console.warn(`Expression evaluation error: ${expr}`, error);
      return 0;
    }
  });
}

export function getXValues(xRange: [number, number], points: number = 200): number[] {
  return Array.from({ length: points }, (_, i) => 
    xRange[0] + (i * (xRange[1] - xRange[0])) / (points - 1)
  );
}

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
      visualization: {
        title: "Normalizing Constant vs Standard Deviation",
        xAxisLabel: "σ (Standard Deviation)",
        yAxisLabel: "1/(σ√(2π))",
        xRange: [0.1, 3],
        parameters: [
          {
            name: "sigma",
            min: 0.1,
            max: 3,
            step: 0.1,
            default: 1,
            label: "σ (Standard Deviation)",
          },
        ],
        traces: [
          {
            name: "1/(σ√(2π))",
            color: "#2563eb",
            type: "scatter",
            mode: "lines",
            expression: "1/(sigma*sqrt(2*pi))"
          },
          {
            name: "Current Value",
            color: "#dc2626",
            type: "scatter",
            mode: "markers",
            expression: "1/(sigma*sqrt(2*pi))",
            marker: { size: 10 }
          }
        ]
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
      visualization: {
        title: "Exponential Decay Component vs Full Normal Distribution",
        xAxisLabel: "x",
        yAxisLabel: "f(x)",
        xRange: [-4, 4],
        parameters: [
          {
            name: "mu",
            min: -3,
            max: 3,
            step: 0.1,
            default: 0,
            label: "μ (Mean)",
          },
          {
            name: "sigma",
            min: 0.1,
            max: 3,
            step: 0.1,
            default: 1,
            label: "σ (Std Dev)",
          },
        ],
        traces: [
          {
            name: "e^(-(x-μ)²/(2σ²))",
            color: "#2563eb",
            type: "scatter",
            mode: "lines",
            expression: "exp(-((x-mu)^2)/(2*sigma^2))"
          },
          {
            name: "Full Normal Distribution",
            color: "#dc2626",
            type: "scatter",
            mode: "lines",
            style: "dash",
            expression: "(1/(sigma*sqrt(2*pi)))*exp(-((x-mu)^2)/(2*sigma^2))"
          }
        ]
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
      visualization: {
        title: "Right Triangle with Square on Side a",
        xAxisLabel: "x",
        yAxisLabel: "y",
        parameters: [
          {
            name: "a",
            min: 1,
            max: 8,
            step: 0.1,
            default: 3,
            label: "Side a",
          },
          {
            name: "b",
            min: 1,
            max: 8,
            step: 0.1,
            default: 4,
            label: "Side b",
          },
        ],
        traces: [
          {
            name: "Right Triangle",
            color: "#2563eb",
            type: "scatter",
            mode: "lines",
            x: [0, 0, 0], // Will be calculated: [0, a, 0, 0]
            y: [0, 0, 0], // Will be calculated: [0, 0, b, 0]
            fill: "toself",
            fillcolor: "rgba(37, 99, 235, 0.1)",
            line: { width: 3 }
          },
          {
            name: "Square on side a (highlighted)",
            color: "#dc2626",
            type: "scatter",
            mode: "lines",
            x: [0, 0, 0, 0, 0], // Will be calculated: [0, a, a, 0, 0]
            y: [0, 0, 0, 0, 0], // Will be calculated: [0, 0, -a, -a, 0]
            fill: "toself",
            fillcolor: "rgba(220, 38, 38, 0.3)",
            line: { width: 2 }
          },
          {
            name: "Square on side b",
            color: "#16a34a",
            type: "scatter",
            mode: "lines",
            x: [0, 0, 0, 0, 0], // Will be calculated
            y: [0, 0, 0, 0, 0], // Will be calculated
            fill: "toself",
            fillcolor: "rgba(22, 163, 74, 0.2)",
            line: { width: 2 }
          }
        ],
        layout: {
          xaxis: { 
            scaleanchor: "y", 
            scaleratio: 1,
            range: [-1, 9]
          },
          yaxis: { 
            range: [-9, 9] 
          },
          showlegend: true,
          height: 500
        }
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
      // No visualization for this chunk - demonstrates optional visualization
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
      visualization: {
        title: "Complete Pythagorean Construction with Square on Hypotenuse",
        xAxisLabel: "x",
        yAxisLabel: "y",
        parameters: [
          {
            name: "a",
            min: 1,
            max: 6,
            step: 0.1,
            default: 3,
            label: "Side a",
          },
          {
            name: "b",
            min: 1,
            max: 6,
            step: 0.1,
            default: 4,
            label: "Side b",
          },
        ],
        traces: [
          {
            name: "Right Triangle",
            color: "#2563eb",
            type: "scatter",
            mode: "lines",
            x: [0, 0, 0], // Will be calculated: [0, a, 0, 0]
            y: [0, 0, 0], // Will be calculated: [0, 0, b, 0]
            fill: "toself",
            fillcolor: "rgba(37, 99, 235, 0.2)",
            line: { width: 3 }
          },
          {
            name: "Square on side a",
            color: "#dc2626",
            type: "scatter",
            mode: "lines",
            x: [0, 0, 0, 0, 0], // Will be calculated
            y: [0, 0, 0, 0, 0], // Will be calculated
            fill: "toself",
            fillcolor: "rgba(220, 38, 38, 0.3)",
            line: { width: 2 }
          },
          {
            name: "Square on side b",
            color: "#16a34a",
            type: "scatter",
            mode: "lines",
            x: [0, 0, 0, 0, 0], // Will be calculated
            y: [0, 0, 0, 0, 0], // Will be calculated
            fill: "toself",
            fillcolor: "rgba(22, 163, 74, 0.3)",
            line: { width: 2 }
          },
          {
            name: "Square on hypotenuse c (highlighted)",
            color: "#ca8a04",
            type: "scatter",
            mode: "lines",
            x: [0, 0, 0, 0, 0], // Will be calculated
            y: [0, 0, 0, 0, 0], // Will be calculated
            fill: "toself",
            fillcolor: "rgba(202, 138, 4, 0.4)",
            line: { width: 3 }
          }
        ],
        layout: {
          xaxis: { 
            scaleanchor: "y", 
            scaleratio: 1,
            range: [-7, 8]
          },
          yaxis: { 
            range: [-7, 8] 
          },
          showlegend: true,
          height: 600
        }
      },
    },
  ],
};

// Formula registry for future formulas
export const formulaRegistry: Record<string, FormulaData> = {
  "normal-distribution": normalDistributionData,
  "pythagorean-theorem": pythagoreanTheoremData,
  // Future formulas can be added here
  // 'quadratic-formula': quadraticFormulaData,
  // 'euler-identity': eulerIdentityData,
};

// Helper function to get formula data by slug
export function getFormulaData(slug: string): FormulaData | null {
  return formulaRegistry[slug] || null;
}