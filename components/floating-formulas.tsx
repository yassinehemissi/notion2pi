'use client';

const formulas = [
  { symbol: '∫', size: 'text-6xl', position: 'top-10 left-10', delay: '' },
  {
    symbol: 'e=mc²',
    size: 'text-4xl',
    position: 'bottom-20 right-20',
    delay: 'animation-delay-5000',
  },
  {
    symbol: '∑',
    size: 'text-5xl',
    position: 'top-1/4 right-1/4',
    delay: '',
  },
  {
    symbol: '√x',
    size: 'text-3xl',
    position: 'bottom-1/3 left-1/4',
    delay: 'animation-delay-5000',
  },
  { symbol: 'π', size: 'text-7xl', position: 'top-1/2 left-10', delay: '' },
  {
    symbol: 'Δ',
    size: 'text-5xl',
    position: 'top-1/3 left-1/3',
    delay: 'animation-delay-3000',
  },
  {
    symbol: '∞',
    size: 'text-6xl',
    position: 'bottom-1/4 right-1/3',
    delay: '',
  },
  {
    symbol: 'α',
    size: 'text-4xl',
    position: 'top-2/3 right-1/4',
    delay: 'animation-delay-5000',
  },
];

export function FloatingFormulas() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
      {formulas.map((formula, index) => (
        <div
          key={index}
          className={`absolute ${formula.size} ${formula.position} text-gray-200 dark:text-gray-800 opacity-20 font-display ${
            formula.delay ? 'animate-float-delayed' : 'animate-float'
          }`}
          style={
            formula.delay
              ? ({ animationDelay: '5s' } as React.CSSProperties)
              : undefined
          }
        >
          {formula.symbol}
        </div>
      ))}
    </div>
  );
}
