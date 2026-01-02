# Adding New Formulas to Notion2Pi

This guide explains how to add new mathematical formulas to the Notion2Pi **truly dynamic** formula system with **LaTeX rendering**.

## Overview

The formula system is completely data-driven with **zero hardcoded conditionals** and uses **KaTeX for beautiful mathematical rendering**. All formulas use the same universal rendering engine. You only need to provide:

1. **Formula data structure** - Mathematical content and metadata
2. **LaTeX expressions** - Proper mathematical notation using LaTeX syntax
3. **7-Vector properties** - Complete mathematical characterization for each component

## Key Features

- **🎨 LaTeX Rendering**: Beautiful mathematical notation using KaTeX
- **🚫 No conditionals**: The system has no `if/else` statements for different formula types
- **🔄 Universal rendering**: One renderer handles all formula types through LaTeX
- **🧩 Modular chunks**: Each formula part is independently defined and rendered
- **📊 Pure Mathematics**: Focus on mathematical properties without distracting visualizations

## File Structure

```
app/formula/
├── data.ts                 # Formula data definitions and registry
├── [slug]/
│   └── page.tsx            # Dynamic page component (no changes needed)
└── page.tsx                # Redirect page (no changes needed)

components/
├── latex-renderer.tsx      # LaTeX rendering components
└── formula/
    ├── formula-header.tsx      # Header component
    ├── formula-renderer.tsx    # Universal LaTeX renderer
    ├── formula-properties.tsx  # Properties panel component
    └── formula-modal.tsx       # Modal component with LaTeX
```

## Step-by-Step Guide

### 1. Define Your Formula Data

Add your formula data to `app/formula/data.ts`. Here's the complete structure:

```typescript
export const yourFormulaData: FormulaData = {
  meta: {
    formula: "Your Formula Name",
    latex: "E = mc^2",              // Full LaTeX representation
    slug: "your-formula-slug",      // URL slug (kebab-case)
    category: "Physics"             // Category for organization
  },
  
  operators: ["="], // LaTeX operators between chunks (e.g., ["+", "=", "\\times"])
  
  fullFormula7Vector: {
    Role: "What the formula represents",
    Domain: "Input/output domains",
    Binding: "Variable relationships",
    Variance: "How parameters affect the formula",
    Geometric: "Geometric interpretation",
    Invariant: "What remains constant",
    Limits: "Behavior at extremes",
    narrative: "2-3 sentence explanation of the formula's significance and applications."
  },
  
  subFormulas: [
    {
      chunk: "E",                   // LaTeX for this chunk
      displayName: "Energy",       // Human readable name
      
      "7Vector": {
        Role: "Component's role",
        Domain: "Component's domain",
        Binding: "Variable bindings",
        Variance: "How it varies",
        Geometric: "Geometric meaning",
        Invariant: "What's invariant",
        Limits: "Limiting behavior",
        narrative: "2-3 sentence explanation of this component's role and behavior."
      }
    }
    // Add more sub-formulas as needed
  ]
};
```

### 2. Register Your Formula

Add your formula to the registry in `app/formula/data.ts`:

```typescript
export const formulaRegistry: Record<string, FormulaData> = {
  'normal-distribution': normalDistributionData,
  'pythagorean-theorem': pythagoreanTheoremData,
  'your-formula-slug': yourFormulaData, // Add this line
};
```

## LaTeX Syntax Guide

### Basic Elements
```latex
x^2                    # Superscript: x²
x_i                    # Subscript: xᵢ
\frac{a}{b}           # Fraction: a/b
\sqrt{x}              # Square root: √x
\sqrt[n]{x}           # nth root: ⁿ√x
```

### Greek Letters
```latex
\alpha, \beta, \gamma  # α, β, γ
\mu, \sigma, \pi      # μ, σ, π
\theta, \phi, \psi    # θ, φ, ψ
```

### Mathematical Functions
```latex
\sin x, \cos x, \tan x    # sin x, cos x, tan x
\log x, \ln x             # log x, ln x
\exp(x)                   # exp(x)
\lim_{x \to \infty}       # lim as x→∞
```

### Operators and Symbols
```latex
\times                # ×
\cdot                 # ·
\pm                   # ±
\neq                  # ≠
\leq, \geq           # ≤, ≥
\infty               # ∞
\sum_{i=1}^n         # Σ from i=1 to n
\int_a^b             # ∫ from a to b
```

## Complete Example: Quadratic Formula

```typescript
export const quadraticFormulaData: FormulaData = {
  meta: {
    formula: "Quadratic Formula",
    latex: "x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}",
    slug: "quadratic-formula",
    category: "Algebra"
  },
  
  operators: ["="], // Just equals sign
  
  fullFormula7Vector: {
    Role: "Solves quadratic equations",
    Domain: "ℝ³ → ℂ²",
    Binding: "a,b,c coefficients, x solutions",
    Variance: "Discriminant determines solution type",
    Geometric: "Parabola x-intercepts",
    Invariant: "Two solutions (counting multiplicity)",
    Limits: "a→0 becomes linear",
    narrative: "The quadratic formula provides the exact solutions to any quadratic equation ax² + bx + c = 0. It reveals the fundamental relationship between a parabola's coefficients and its x-intercepts, with the discriminant determining whether solutions are real or complex."
  },
  
  subFormulas: [
    {
      chunk: "x",
      displayName: "Solution",
      "7Vector": {
        Role: "Solution variable",
        Domain: "ℂ",
        Binding: "x represents the roots",
        Variance: "Changes with coefficients",
        Geometric: "Parabola x-intercepts",
        Invariant: "Always two values",
        Limits: "Real when b²≥4ac",
        narrative: "The variable x represents the solutions to the quadratic equation. These are the points where the parabola crosses the x-axis, revealing the fundamental zeros of the quadratic function."
      }
    },
    {
      chunk: "\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}",
      displayName: "Quadratic Formula",
      "7Vector": {
        Role: "Solution formula",
        Domain: "ℝ³ → ℂ²",
        Binding: "Takes coefficients, gives roots",
        Variance: "Discriminant controls solution type",
        Geometric: "Distance from vertex to roots",
        Invariant: "Symmetric about axis of symmetry",
        Limits: "Real solutions when b²≥4ac",
        narrative: "This expression encapsulates the complete solution method for quadratic equations. The ± symbol indicates two solutions, while the discriminant b²-4ac determines whether they're real or complex, providing deep insight into the parabola's behavior."
      }
    }
  ]
};
```

## LaTeX Operators

Common operators you can use between formula chunks:

```typescript
operators: ["+"]           # Addition: +
operators: ["-"]           # Subtraction: -
operators: ["\\times"]     # Multiplication: ×
operators: ["\\cdot"]      # Dot product: ·
operators: ["="]           # Equals: =
operators: ["\\neq"]       # Not equals: ≠
operators: ["\\leq"]       # Less than or equal: ≤
operators: ["\\geq"]       # Greater than or equal: ≥
operators: ["\\pm"]        # Plus-minus: ±
operators: ["\\to"]        # Arrow: →
operators: ["\\Rightarrow"] # Implies: ⇒

# Multiple operators for complex formulas
operators: ["+", "="]      # For: a² + b² = c²
operators: ["\\times", "="] # For: force × distance = work
```

## Testing Your Formula

1. Add your formula data to `data.ts`
2. Register it in the `formulaRegistry`
3. Navigate to `/formula/your-formula-slug`
4. Test all interactive elements:
   - Click on formula chunks (should render as LaTeX)
   - Verify 7-vector properties display properly
   - Check modal functionality

## Best Practices

1. **🎯 Proper LaTeX**: Use correct LaTeX syntax for mathematical notation
2. **📏 Complete 7-Vectors**: Fill out all seven properties for each component
3. **📝 Engaging Narratives**: Write 2-3 sentences that explain significance
4. **🎨 Consistent Styling**: Follow the existing color scheme and styling patterns
5. **✅ Test LaTeX**: Verify your LaTeX renders correctly in the browser
6. **🧮 Focus on Mathematics**: Emphasize the mathematical properties and relationships

## System Architecture

The LaTeX-based system eliminates all conditionals through:

1. **🎨 LaTeX Renderer**: Universal mathematical notation rendering
2. **🔄 Universal Components**: `ClickableLaTeX` handles all formula chunks
3. **📋 Data-Driven Operators**: Formula operators come from the `operators` array
4. **🧩 Modular Chunks**: Each chunk is independently defined with LaTeX
5. **📊 Pure Mathematics**: Focus on mathematical properties without distracting visualizations

This approach makes the system truly extensible while providing beautiful mathematical rendering - adding new formulas requires only data, never code changes.

## Troubleshooting

### Common Issues

1. **LaTeX not rendering**: Check LaTeX syntax and escape backslashes properly
2. **Operators not showing**: Verify LaTeX operator syntax (use `\\times` not `×`)
3. **Modal not opening**: Ensure chunk LaTeX matches exactly between data and click handler

### LaTeX Debugging

- Test LaTeX syntax in an online LaTeX editor first
- Remember to escape backslashes: `\\frac` not `\frac`
- Use proper grouping with braces: `{...}`
- Check for matching braces and parentheses

The system now provides beautiful, professional mathematical rendering with complete focus on mathematical understanding! 🎉