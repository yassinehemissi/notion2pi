import dynamic from 'next/dynamic';
import { FormulaChunk, evaluateExpression, getXValues } from '@/app/formula/data';

// Dynamically import Plotly to avoid SSR issues
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface FormulaVisualizationProps {
  chunk: FormulaChunk;
  parameters: Record<string, number>;
  onParameterChange: (paramName: string, value: number) => void;
}

export function FormulaVisualization({ chunk, parameters, onParameterChange }: FormulaVisualizationProps) {
  const { visualization } = chunk;

  // If no visualization is defined, show a message
  if (!visualization) {
    return (
      <div className="w-full text-center py-8">
        <p className="text-gray-500 dark:text-gray-400 italic">
          No visualization available for this component
        </p>
      </div>
    );
  }

  // Generate plot data based on expressions or custom data
  const generatePlotData = () => {
    const plotData: any[] = [];
    
    visualization.traces.forEach(trace => {
      const traceData: any = {
        name: trace.name,
        type: trace.type,
        mode: trace.mode || (trace.type === "scatter" ? "lines" : undefined),
      };

      // Handle expression-based traces
      if (trace.expression) {
        if (trace.type === 'scatter' && trace.mode === 'markers') {
          // For marker traces, use current parameter values
          const currentParams = { ...parameters };
          visualization.parameters.forEach(param => {
            if (!(param.name in currentParams)) {
              currentParams[param.name] = param.default;
            }
          });
          
          // For parameter-based plots (like normalizing constant)
          if (visualization.xAxisLabel.includes('σ') || visualization.xAxisLabel.includes('Standard')) {
            const xValue = currentParams.sigma || currentParams[visualization.parameters[0]?.name] || 1;
            const yValues = evaluateExpression(trace.expression, { ...currentParams, x: xValue });
            traceData.x = [xValue];
            traceData.y = [yValues[0]];
          } else {
            // For function-based plots
            const xValues = getXValues(visualization.xRange || [-4, 4]);
            const yValues = evaluateExpression(trace.expression, currentParams);
            traceData.x = xValues;
            traceData.y = yValues;
          }
        } else {
          // For line traces
          if (visualization.xAxisLabel.includes('σ') || visualization.xAxisLabel.includes('Standard')) {
            // Parameter sweep for normalizing constant type plots
            const xValues = getXValues(visualization.xRange || [0.1, 3]);
            const yValues = xValues.map(x => {
              const tempParams = { ...parameters, sigma: x };
              const result = evaluateExpression(trace.expression as string, tempParams);
              return result[0]; // Take first value since it's parameter-based
            });
            
            traceData.x = xValues;
            traceData.y = yValues;
          } else {
            // Function-based plots
            const xValues = getXValues(visualization.xRange || [-4, 4]);
            const yValues = evaluateExpression(trace.expression, parameters);
            
            traceData.x = xValues;
            traceData.y = yValues;
          }
        }
      } else {
        // Handle custom data traces (direct Plotly data)
        if (trace.x) traceData.x = trace.x;
        if (trace.y) traceData.y = trace.y;
        if (trace.z) traceData.z = trace.z;
        if (trace.values) traceData.values = trace.values;
        if (trace.labels) traceData.labels = trace.labels;
        if (trace.text) traceData.text = trace.text;

        // Handle special cases for dynamic data generation
        if (trace.type === 'bar' && trace.x && !trace.y) {
          // Generate bar chart data dynamically
          const a = parameters.a || 3;
          const b = parameters.b || 4;
          const c = Math.sqrt(a * a + b * b);
          
          if (trace.name === 'Individual Areas') {
            traceData.y = [a * a, b * b, c * c];
          } else if (trace.name === 'Sum Verification' || trace.name === 'Sum: a² + b²') {
            traceData.y = [a * a + b * b];
          }
        }

        // Handle geometric triangle and squares visualization
        if (trace.type === 'scatter' && trace.x && trace.x.length === 3 && trace.name === 'Right Triangle') {
          const a = parameters.a || 3;
          const b = parameters.b || 4;
          traceData.x = [0, a, 0, 0];
          traceData.y = [0, 0, b, 0];
        }

        if (trace.type === 'scatter' && trace.x && trace.x.length === 5) {
          const a = parameters.a || 3;
          const b = parameters.b || 4;
          const c = Math.sqrt(a * a + b * b);
          
          if (trace.name?.includes('Square on side a')) {
            // Square below the triangle on side a
            traceData.x = [0, a, a, 0, 0];
            traceData.y = [0, 0, -a, -a, 0];
          } else if (trace.name?.includes('Square on side b')) {
            // Square to the left of the triangle on side b
            traceData.x = [0, 0, -b, -b, 0];
            traceData.y = [0, b, b, 0, 0];
          } else if (trace.name?.includes('Square on hypotenuse')) {
            // Square on the hypotenuse (the most complex one)
            // We need to rotate the square to align with the hypotenuse
            const angle = Math.atan2(b, a); // Angle of the hypotenuse
            
            // Start from point (a, 0) and build the square perpendicular to hypotenuse
            const cos_a = Math.cos(angle);
            const sin_a = Math.sin(angle);
            
            // Vector perpendicular to hypotenuse with length c
            const perp_x = -c * sin_a;
            const perp_y = c * cos_a;
            
            // Four corners of the square on hypotenuse
            const x1 = a, y1 = 0;           // Bottom right of triangle
            const x2 = 0, y2 = b;           // Top left of triangle  
            const x3 = x2 + perp_x, y3 = y2 + perp_y;  // Third corner
            const x4 = x1 + perp_x, y4 = y1 + perp_y;  // Fourth corner
            
            traceData.x = [x1, x2, x3, x4, x1];
            traceData.y = [y1, y2, y3, y4, y1];
          }
        }

        if (trace.type === 'surface' && !trace.z) {
          // Generate 3D surface data
          const maxSide = parameters.max_side || 10;
          const resolution = 20;
          const step = maxSide / resolution;
          
          const xData = [];
          const yData = [];
          const zData = [];
          
          for (let i = 0; i <= resolution; i++) {
            const row = [];
            for (let j = 0; j <= resolution; j++) {
              const a = i * step + 0.1; // Avoid zero
              const b = j * step + 0.1;
              const c = Math.sqrt(a * a + b * b);
              row.push(c);
            }
            zData.push(row);
          }
          
          // Generate x and y coordinate arrays
          for (let i = 0; i <= resolution; i++) {
            xData.push(i * step + 0.1);
            yData.push(i * step + 0.1);
          }
          
          traceData.x = xData;
          traceData.y = yData;
          traceData.z = zData;
        }
      }

      // Apply styling
      if (trace.marker) {
        traceData.marker = { ...trace.marker };
        if (!traceData.marker.color && trace.color) {
          traceData.marker.color = trace.color;
        }
      } else if (trace.color) {
        traceData.marker = { color: trace.color };
      }

      if (trace.line) {
        traceData.line = { ...trace.line };
        if (!traceData.line.color && trace.color) {
          traceData.line.color = trace.color;
        }
        if (trace.style && !traceData.line.dash) {
          traceData.line.dash = trace.style === 'dash' ? 'dash' : trace.style === 'dot' ? 'dot' : undefined;
        }
      } else if (trace.color && (trace.type === 'scatter' || !trace.type)) {
        traceData.line = { 
          color: trace.color, 
          width: trace.name?.includes('Full') ? 2 : 3,
          dash: trace.style === 'dash' ? 'dash' : undefined 
        };
      }

      // Apply fill properties
      if (trace.fill) traceData.fill = trace.fill;
      if (trace.fillcolor) traceData.fillcolor = trace.fillcolor;

      // Copy any additional Plotly properties
      Object.keys(trace).forEach(key => {
        if (!['name', 'color', 'type', 'mode', 'style', 'expression', 'x', 'y', 'z', 'values', 'labels', 'text', 'marker', 'line', 'fill', 'fillcolor'].includes(key)) {
          traceData[key] = trace[key];
        }
      });
      
      plotData.push(traceData);
    });
    
    return plotData;
  };

  // Build layout object
  const buildLayout = () => {
    const layout: any = {
      title: { text: visualization.title },
      xaxis: { title: { text: visualization.xAxisLabel } },
      yaxis: { title: { text: visualization.yAxisLabel } },
      showlegend: true,
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      font: { color: '#374151' },
      margin: { t: 50, r: 50, b: 50, l: 50 }
    };

    // Add z-axis for 3D plots
    if (visualization.zAxisLabel) {
      layout.scene = {
        xaxis: { title: { text: visualization.xAxisLabel } },
        yaxis: { title: { text: visualization.yAxisLabel } },
        zaxis: { title: { text: visualization.zAxisLabel } }
      };
    }

    // Apply custom layout properties
    if (visualization.layout) {
      Object.assign(layout, visualization.layout);
    }

    return layout;
  };

  // Build config object
  const buildConfig = () => {
    const config: any = {
      responsive: true,
      displayModeBar: false
    };

    if (visualization.config) {
      Object.assign(config, visualization.config);
    }

    return config;
  };

  return (
    <div className="w-full">
      {/* Parameter controls */}
      <div className={`grid gap-4 mb-4 ${visualization.parameters.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {visualization.parameters.map(param => (
          <div key={param.name}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {param.label}: {(parameters[param.name] || param.default).toFixed(2)}
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
      </div>

      {/* Plotly visualization */}
      <Plot
        data={generatePlotData()}
        layout={buildLayout()}
        config={buildConfig()}
        style={{ width: '100%', height: visualization.layout?.height || '400px' }}
      />
    </div>
  );
}