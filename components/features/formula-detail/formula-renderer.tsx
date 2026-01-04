'use client';

import { FormulaData } from '@/types';
import { LaTeXRenderer } from '../../atoms/latex-renderer';
import { ClickableLaTeX } from '../../molecules/clickable-latex';

interface FormulaRendererProps {
    formulaData: FormulaData;
    onChunkClick: (chunkLatex: string) => void;
}

export function FormulaRenderer({ formulaData, onChunkClick }: FormulaRendererProps) {
    return (
        <div className="relative group text-center mb-8">
            <div className="absolute inset-0 bg-white/5 dark:bg-white/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none scale-150"></div>

            <div className="relative mb-6">
                <div className="flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl font-light text-black dark:text-white mb-4">
                    <LaTeXRenderer className="text-3xl sm:text-4xl lg:text-5xl">
                        {formulaData.meta.latex}
                    </LaTeXRenderer>
                </div>

                <div className="flex items-center justify-center flex-wrap gap-1 text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-400">
                    {formulaData.subFormulas.map((chunk, index) => (
                        <span key={index} className="flex items-center">
                            <ClickableLaTeX
                                latex={chunk.chunk}
                                displayName={chunk.displayName}
                                onClick={() => onChunkClick(chunk.chunk)}
                                className="text-2xl hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                            />
                            {index < formulaData.subFormulas.length - 1 && (
                                <span className="text-2xl mx-1 text-gray-400">
                                    ,
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
                Click on formula components below to explore their properties
            </p>
        </div>
    );
}
