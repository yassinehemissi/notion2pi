import { FormulaData } from '@/app/formula/data';
import { ClickableLaTeX, LaTeXRenderer } from '@/components/latex-renderer';

interface FormulaRendererProps {
  formulaData: FormulaData;
  onChunkClick: (chunkLatex: string) => void;
}

export function FormulaRenderer({ formulaData, onChunkClick }: FormulaRendererProps) {
  return (
    <div className="relative group text-center mb-8">
      <div className="absolute inset-0 bg-white/5 dark:bg-white/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none scale-150"></div>

      <div className="relative mb-6">
        <div className="flex items-center justify-center gap-2 text-5xl font-light text-black dark:text-white">
          {formulaData.subFormulas.map((chunk, index) => (
            <span key={index} className="flex items-center gap-2">
              <ClickableLaTeX
                latex={chunk.chunk}
                displayName={chunk.displayName}
                onClick={() => onChunkClick(chunk.chunk)}
                className="text-4xl"
              />
              {index < formulaData.subFormulas.length - 1 && (
                <span className="text-4xl mx-2 text-gray-600 dark:text-gray-400">
                  <LaTeXRenderer inline className="text-4xl">
                    {formulaData.operators[index] || '+'}
                  </LaTeXRenderer>
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