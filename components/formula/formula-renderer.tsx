import { FormulaData, FormulaChunk } from '@/app/formula/data';

interface FormulaRendererProps {
  formulaData: FormulaData;
  onChunkClick: (chunkLatex: string) => void;
}

export function FormulaRenderer({ formulaData, onChunkClick }: FormulaRendererProps) {
  const renderFormulaComponent = (chunk: FormulaChunk, index: number) => {
    const { renderComponent } = chunk;
    
    if (renderComponent.type === 'fraction') {
      return (
        <span
          key={index}
          className="chunk cursor-pointer transition-all duration-200 px-4 py-3 rounded-xl inline-flex items-center hover:bg-white/10 dark:hover:bg-white/5 hover:scale-105"
          data-latex={chunk.chunk}
          onClick={() => onChunkClick(chunk.chunk)}
        >
          <div className="flex flex-col items-center">
            <div className="text-3xl mb-1">{renderComponent.numerator}</div>
            <div className="w-20 h-0.5 bg-current mb-1"></div>
            <div className="text-2xl">{renderComponent.denominator}</div>
          </div>
        </span>
      );
    }

    if (renderComponent.type === 'exponential') {
      return (
        <span
          key={index}
          className="chunk cursor-pointer transition-all duration-200 px-4 py-3 rounded-xl inline-flex items-center hover:bg-white/10 dark:hover:bg-white/5 hover:scale-105"
          data-latex={chunk.chunk}
          onClick={() => onChunkClick(chunk.chunk)}
        >
          <div className="flex items-start">
            <span className="text-5xl">{renderComponent.base}</span>
            {renderComponent.exponent?.numerator && (
              <div className="flex flex-col items-center ml-2 -mt-2">
                <div className="text-2xl">{renderComponent.exponent.numerator}</div>
                {renderComponent.exponent.denominator && (
                  <>
                    <div className="w-16 h-0.5 bg-current mb-0.5"></div>
                    <div className="text-lg">{renderComponent.exponent.denominator}</div>
                  </>
                )}
              </div>
            )}
          </div>
        </span>
      );
    }

    return null;
  };

  return (
    <div className="relative group text-center mb-8">
      <div className="absolute inset-0 bg-white/5 dark:bg-white/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none scale-150"></div>

      <div className="relative mb-6">
        <div className="flex items-center justify-center gap-4 text-5xl font-light text-black dark:text-white">
          {formulaData.subFormulas.map((chunk, index) => (
            <span key={index}>
              {renderFormulaComponent(chunk, index)}
              {index < formulaData.subFormulas.length - 1 && (
                <span className="text-4xl mx-2">
                  {formulaData.meta.slug === 'pythagorean-theorem' && index === 1 ? ' = ' : ' + '}
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      <p className="text-sm uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 font-medium mb-2">
        {formulaData.meta.formula}
      </p>
      
      <p className="text-xs text-gray-500 dark:text-gray-400 italic">
        Click on formula parts to explore their properties
      </p>
    </div>
  );
}