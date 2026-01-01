# Adding New Formulas to Notion2Pi

This guide explains how to add new mathematical formulas to the Notion2Pi dynamic formula system.

## Overview

The formula system is completely data-driven, meaning you only need to provide the formula data structure - no new components or pages are required. All formulas use the same rendering engine and interactive components.

## File Structure

```
app/formula/
├── data.ts                 # Formula data definitions and registry
├── [slug]/
│   └── page.tsx            # Dynamic page component (no changes needed)
└── page.tsx                # Redirect page (no changes needed)

components/formula/
├── formula-header.tsx      # Header component
├── formula-renderer.tsx    # Formula display component
├── formula-properties.tsx  # Properties panel component
├── formula-visualization.tsx # Plotly visualization component
└── formula-modal.tsx       # Modal component
```

## Step-by-Step Guide

### 1. Define Your Formula Data

Add your formula data to `app/formula/data.ts`. Here's the complete structure:

```typescript
export const yourFormulaData: FormulaData = {
  meta: {
    formula: "Your Formula Name",
    latex: "LaTeX representation", // e.g., "E = mc^2"
    slug: "your-formula-slug",     // URL slug (kebab-case)
    category: "Physics"            // Category for organization
  },
  
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
      chunk: "LaTeX chunk",           // e.g., "E" or "mc^2"
      displayName: "Human readable",  // e.g., "Energy" or "mc²"
      renderComponent: {
        type: 'fraction' | 'exponential' | 'custom',
        // For fractions:
        numerator?: "top part",
        denominator?: "bottom part",
        // For exponentials:
        base?: "base",
        exponent?: {
          numerator: "exponent top",
          denominator: "exponent bottom" // optional
        }
      },
      "7Vector": {
        Role: "Component's role",
        Domain: "Component's domain",
        Binding: "Variable bindings",
        Variance: "How it varies",
        Geometric: "Geometric meaning",
        Invariant: "What's invariant",
        Limits: "Limiting behavior",
        narrative: "2-3 sentence explanation of this component's role and behavior."
      },
      visualization: {
        type: 'normalizing_constant' | 'exponential_decay' | 'custom',
        parameters: [
          {
            name: 'parameterName',
            min: 0,
            max: 10,
            step: 0.1,
            default: 5,
            label: 'Parameter Label'
          }
        ],
        plotConfig: {
          title: 'Plot Title',
          xAxisLabel: 'X Axis',
          yAxisLabel: 'Y Axis',
          traces: [
            {
              name: 'Trace Name',
              color: '#2563eb',
              type: 'line' | 'marker' | 'both',
              style?: 'solid' | 'dash' | 'dot'
            }
          ]
        }
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

### 3. Implement Custom Visualization (if needed)

If you're using `visualization.type: 'custom'`, you'll need to add the visualization logic to `components/formula/formula-visualization.tsx`:

```typescript
if (visualization.type === 'custom') {
  // Your custom visualization logic here
  // Access parameters via: parameters.parameterName
  // Return JSX with Plotly Plot component
  
  return (
    <div className="w-full">
      {/* Parameter controls */}
      {visualization.parameters.map(param => (
        <div key={param.name} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {param.label}: {(parameters[param.name] || param.default).toFixed(1)}
          </label>
          <input
            type="range"
            min={param.min}
            max={param.max}
            step={param.step}
            value={parameters[param.name] || param.default}
            onChange={(e) => onParameterChange(param.name, parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>
      ))}
      
      {/* Your Plotly visualization */}
      <Plot
        data={[
          // Your plot data
        ]}
        layout={{
          title: visualization.plotConfig.title,
          // Your layout config
        }}
        config={{ responsive: true, displayModeBar: false }}
        style={{ width: '100%', height: '400px' }}
      />
    </div>
  );
}
```

## Component Types

### Render Component Types

1. **fraction**: For fractions like `1/2π`
   ```typescript
   renderComponent: {
     type: 'fraction',
     numerator: '1',
     denominator: '2π'
   }
   ```

2. **exponential**: For exponentials like `e^x` or `x^2`
   ```typescript
   renderComponent: {
     type: 'exponential',
     base: 'e',
     exponent: {
       numerator: 'x',
       denominator: '' // optional
     }
   }
   ```

### Visualization Types

1. **normalizing_constant**: For parameters that normalize distributions
2. **exponential_decay**: For exponential functions with parameters
3. **custom**: For completely custom visualizations (requires implementation)

## Formula Rendering Logic

The formula renderer automatically handles operators between chunks:
- For most formulas: uses `+` between chunks
- For equations (like Pythagorean theorem): uses `=` before the last chunk
- Custom logic can be added in `FormulaRenderer` component

## Examples

### Simple Linear Formula: F = ma

```typescript
export const newtonSecondLawData: FormulaData = {
  meta: {
    formula: "Newton's Second Law",
    latex: "F = ma",
    slug: "newton-second-law",
    category: "Physics"
  },
  fullFormula7Vector: {
    Role: "Force relationship",
    Domain: "ℝ → ℝ",
    Binding: "F force, m mass, a acceleration",
    Variance: "Linear in both m and a",
    Geometric: "Vector relationship",
    Invariant: "Proportionality constant",
    Limits: "m→0 or a→0 → F→0",
    narrative: "Newton's second law establishes the fundamental relationship between force, mass, and acceleration. It states that the force acting on an object is equal to its mass times its acceleration, forming the cornerstone of classical mechanics."
  },
  subFormulas: [
    {
      chunk: "F",
      displayName: "F",
      renderComponent: {
        type: 'exponential',
        base: 'F',
        exponent: { numerator: '', denominator: '' }
      },
      "7Vector": {
        Role: "Applied force",
        Domain: "ℝ",
        Binding: "F is force vector",
        Variance: "Linear with acceleration",
        Geometric: "Vector quantity",
        Invariant: "Direction with acceleration",
        Limits: "F→0 when a→0",
        narrative: "Force represents the push or pull acting on an object. It's a vector quantity that determines how the object's motion will change over time."
      },
      visualization: {
        type: 'custom',
        parameters: [
          { name: 'm', min: 0.1, max: 10, step: 0.1, default: 1, label: 'Mass (kg)' },
          { name: 'a', min: 0, max: 20, step: 0.1, default: 10, label: 'Acceleration (m/s²)' }
        ],
        plotConfig: {
          title: 'Force vs Mass and Acceleration',
          xAxisLabel: 'Parameter',
          yAxisLabel: 'Force (N)',
          traces: [
            { name: 'F = ma', color: '#2563eb', type: 'line' }
          ]
        }
      }
    }
  ]
};
```

## Testing Your Formula

1. Add your formula data to `data.ts`
2. Register it in the `formulaRegistry`
3. Navigate to `/formula/your-formula-slug`
4. Test all interactive elements:
   - Click on formula chunks
   - Adjust parameters in the modal
   - Verify visualizations work correctly
   - Check 7-vector properties display properly

## Best Practices

1. **Meaningful Slugs**: Use descriptive, URL-friendly slugs
2. **Complete 7-Vectors**: Fill out all seven properties for each component
3. **Engaging Narratives**: Write 2-3 sentences that explain significance
4. **Appropriate Parameters**: Choose parameter ranges that show interesting behavior
5. **Clear Visualizations**: Make sure plots clearly demonstrate the mathematical concepts
6. **Consistent Styling**: Follow the existing color scheme and styling patterns

## Troubleshooting

### Common Issues

1. **Formula not found**: Check that the slug matches exactly in the registry
2. **Visualization not working**: Ensure all required parameters are defined
3. **Rendering issues**: Verify the `renderComponent` type and properties are correct
4. **TypeScript errors**: Make sure all required fields are provided in the data structure

### Getting Help

If you encounter issues:
1. Check the existing formulas (Normal Distribution, Pythagorean Theorem) as examples
2. Verify your data structure matches the TypeScript interfaces
3. Test with simple visualizations first, then add complexity
4. Use browser developer tools to debug any runtime errors

## Advanced Features

### Custom Formula Operators

To add custom operators between formula chunks, modify the `FormulaRenderer` component:

```typescript
// In FormulaRenderer component
{index < formulaData.subFormulas.length - 1 && (
  <span className="text-4xl mx-2">
    {formulaData.meta.slug === 'your-formula' ? ' → ' : ' + '}
  </span>
)}
```

### Complex Visualizations

For advanced visualizations, you can:
1. Add multiple Plot components
2. Use different chart types (3D, contour, etc.)
3. Implement interactive animations
4. Add custom controls beyond sliders

The system is designed to be highly extensible while maintaining consistency across all formulas.