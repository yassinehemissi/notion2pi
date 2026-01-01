import dynamic from 'next/dynamic';
import { FormulaChunk } from '@/app/formula/data';

// Dynamically import Plotly to avoid SSR issues
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface FormulaVisualizationProps {
  chunk: FormulaChunk;
  parameters: Record<string, number>;
  onParameterChange: (paramName: string, value: number) => void;
}

export function FormulaVisualization({ chunk, parameters, onParameterChange }: FormulaVisualizationProps) {
  const { visualization } = chunk;

  if (visualization.type === 'normalizing_constant') {
    const sigma = parameters.sigma || 1;
    const sigmaValues = Array.from({ length: 100 }, (_, i) => 0.1 + (i * 2.9) / 99);
    const normalizingValues = sigmaValues.map(s => 1 / (s * Math.sqrt(2 * Math.PI)));

    return (
      <div className="w-full">
        {visualization.parameters.map(param => (
          <div key={param.name} className="mb-4">
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
        <Plot
          data={[
            {
              x: sigmaValues,
              y: normalizingValues,
              type: 'scatter',
              mode: 'lines',
              name: visualization.plotConfig.traces[0].name,
              line: { color: visualization.plotConfig.traces[0].color, width: 3 }
            },
            {
              x: [sigma],
              y: [1 / (sigma * Math.sqrt(2 * Math.PI))],
              type: 'scatter',
              mode: 'markers',
              name: visualization.plotConfig.traces[1].name,
              marker: { color: visualization.plotConfig.traces[1].color, size: 10 }
            }
          ]}
          layout={{
            title: visualization.plotConfig.title,
            xaxis: { title: visualization.plotConfig.xAxisLabel },
            yaxis: { title: visualization.plotConfig.yAxisLabel },
            showlegend: true,
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            font: { color: '#374151' },
            margin: { t: 50, r: 50, b: 50, l: 50 }
          }}
          config={{ responsive: true, displayModeBar: false }}
          style={{ width: '100%', height: '400px' }}
        />
      </div>
    );
  }

  if (visualization.type === 'exponential_decay') {
    const mu = parameters.mu || 0;
    const sigma = parameters.sigma || 1;
    const x = Array.from({ length: 200 }, (_, i) => -4 + (i * 8) / 199);
    const exponentialOnly = x.map(xi => Math.exp(-Math.pow(xi - mu, 2) / (2 * Math.pow(sigma, 2))));
    const fullNormal = x.map(xi => 
      (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-Math.pow(xi - mu, 2) / (2 * Math.pow(sigma, 2)))
    );

    return (
      <div className="w-full">
        <div className="grid grid-cols-2 gap-4 mb-4">
          {visualization.parameters.map(param => (
            <div key={param.name}>
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
        </div>
        <Plot
          data={[
            {
              x: x,
              y: exponentialOnly,
              type: 'scatter',
              mode: 'lines',
              name: visualization.plotConfig.traces[0].name,
              line: { color: visualization.plotConfig.traces[0].color, width: 3 }
            },
            {
              x: x,
              y: fullNormal,
              type: 'scatter',
              mode: 'lines',
              name: visualization.plotConfig.traces[1].name,
              line: { 
                color: visualization.plotConfig.traces[1].color, 
                width: 2, 
                dash: visualization.plotConfig.traces[1].style === 'dash' ? 'dash' : undefined 
              }
            }
          ]}
          layout={{
            title: visualization.plotConfig.title,
            xaxis: { title: visualization.plotConfig.xAxisLabel },
            yaxis: { title: visualization.plotConfig.yAxisLabel },
            showlegend: true,
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            font: { color: '#374151' },
            margin: { t: 50, r: 50, b: 50, l: 50 }
          }}
          config={{ responsive: true, displayModeBar: false }}
          style={{ width: '100%', height: '400px' }}
        />
      </div>
    );
  }

  if (visualization.type === 'custom') {
    const a = parameters.a || 3;
    const b = parameters.b || 4;
    const c = Math.sqrt(a * a + b * b);

    // Different visualizations based on which chunk is selected
    if (chunk.chunk === 'a^2' || chunk.chunk === 'b^2') {
      // Show the right triangle with squares
      const triangleX = [0, a, 0, 0];
      const triangleY = [0, 0, b, 0];

      // Square on side a
      const squareAX = [0, a, a, 0, 0];
      const squareAY = [0, 0, -a, -a, 0];

      // Square on side b
      const squareBX = [0, 0, -b, -b, 0];
      const squareBY = [0, b, b, 0, 0];

      // Square on hypotenuse c
      const angle = Math.atan2(b, a);
      const cx1 = a + c * Math.cos(angle + Math.PI/2);
      const cy1 = c * Math.sin(angle + Math.PI/2);
      const cx2 = cx1 - c * Math.cos(angle);
      const cy2 = cy1 - c * Math.sin(angle);
      const cx3 = b * Math.cos(angle + Math.PI/2);
      const cy3 = b + b * Math.sin(angle + Math.PI/2);

      const squareCX = [a, cx1, cx2, cx3, a];
      const squareCY = [0, cy1, cy2, cy3, 0];

      return (
        <div className="w-full">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {visualization.parameters.map(param => (
              <div key={param.name}>
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
          </div>
          <div className="mb-4 p-3 bg-gray-100 dark:bg-white/5 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              a = {a.toFixed(1)}, b = {b.toFixed(1)}, c = {c.toFixed(1)}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              a² = {(a*a).toFixed(1)}, b² = {(b*b).toFixed(1)}, c² = {(c*c).toFixed(1)}
            </p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              a² + b² = {(a*a + b*b).toFixed(1)} {Math.abs((a*a + b*b) - (c*c)) < 0.01 ? '✓' : '✗'}
            </p>
          </div>
          <Plot
            data={[
              {
                x: triangleX,
                y: triangleY,
                type: 'scatter',
                mode: 'lines',
                name: 'Right Triangle',
                line: { color: '#2563eb', width: 3 },
                fill: 'toself',
                fillcolor: 'rgba(37, 99, 235, 0.1)'
              },
              {
                x: squareAX,
                y: squareAY,
                type: 'scatter',
                mode: 'lines',
                name: `Square on a (${(a*a).toFixed(1)})`,
                line: { color: '#dc2626', width: 2 },
                fill: 'toself',
                fillcolor: 'rgba(220, 38, 38, 0.2)'
              },
              {
                x: squareBX,
                y: squareBY,
                type: 'scatter',
                mode: 'lines',
                name: `Square on b (${(b*b).toFixed(1)})`,
                line: { color: '#16a34a', width: 2 },
                fill: 'toself',
                fillcolor: 'rgba(22, 163, 74, 0.2)'
              },
              {
                x: squareCX,
                y: squareCY,
                type: 'scatter',
                mode: 'lines',
                name: `Square on c (${(c*c).toFixed(1)})`,
                line: { color: '#ca8a04', width: 2 },
                fill: 'toself',
                fillcolor: 'rgba(202, 138, 4, 0.2)'
              }
            ]}
            layout={{
              title: visualization.plotConfig.title,
              xaxis: { title: visualization.plotConfig.xAxisLabel, scaleanchor: 'y', scaleratio: 1 },
              yaxis: { title: visualization.plotConfig.yAxisLabel },
              showlegend: true,
              paper_bgcolor: 'rgba(0,0,0,0)',
              plot_bgcolor: 'rgba(0,0,0,0)',
              font: { color: '#374151' },
              margin: { t: 50, r: 50, b: 50, l: 50 }
            }}
            config={{ responsive: true, displayModeBar: false }}
            style={{ width: '100%', height: '500px' }}
          />
        </div>
      );
    } else {
      // For c² chunk, show area comparison
      return (
        <div className="w-full">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {visualization.parameters.map(param => (
              <div key={param.name}>
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
          </div>
          <Plot
            data={[
              {
                x: ['a²', 'b²', 'c²'],
                y: [a*a, b*b, c*c],
                type: 'bar',
                name: 'Areas',
                marker: { 
                  color: ['#dc2626', '#16a34a', '#ca8a04'],
                  opacity: 0.8
                }
              },
              {
                x: ['a² + b²'],
                y: [a*a + b*b],
                type: 'bar',
                name: 'Sum of legs',
                marker: { color: '#2563eb', opacity: 0.6 }
              }
            ]}
            layout={{
              title: 'Pythagorean Theorem Verification: Areas',
              xaxis: { title: 'Terms' },
              yaxis: { title: 'Area (square units)' },
              showlegend: true,
              paper_bgcolor: 'rgba(0,0,0,0)',
              plot_bgcolor: 'rgba(0,0,0,0)',
              font: { color: '#374151' },
              margin: { t: 50, r: 50, b: 50, l: 50 }
            }}
            config={{ responsive: true, displayModeBar: false }}
            style={{ width: '100%', height: '400px' }}
          />
        </div>
      );
    }
  }

  return null;
}