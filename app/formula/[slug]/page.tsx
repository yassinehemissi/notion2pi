'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getFormulaData, FormulaData, FormulaChunk } from '../data';
import { FloatingFormulas } from '@/components/floating-formulas';
import { FormulaHeader } from '@/components/formula/formula-header';
import { FormulaRenderer } from '@/components/formula/formula-renderer';
import { FormulaProperties } from '@/components/formula/formula-properties';
import { FormulaModal } from '@/components/formula/formula-modal';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface DynamicFormulaPageProps {}

export default function DynamicFormulaPage({}: DynamicFormulaPageProps) {
  const params = useParams();
  const slug = params.slug as string;
  
  const [selectedChunk, setSelectedChunk] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parameters, setParameters] = useState<Record<string, number>>({});
  const modalRef = useRef<HTMLDivElement>(null);

  // Get formula data
  const formulaData = getFormulaData(slug);

  // Initialize parameters
  useEffect(() => {
    if (formulaData) {
      const initialParams: Record<string, number> = {};
      formulaData.subFormulas.forEach(subFormula => {
        // Only process parameters if visualization exists
        if (subFormula.visualization) {
          subFormula.visualization.parameters.forEach(param => {
            initialParams[param.name] = param.default;
          });
        }
      });
      setParameters(initialParams);
    }
  }, [formulaData]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // If formula not found, show 404
  if (!formulaData) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Formula Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The formula &quot;{slug}&quot; could not be found.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleChunkClick = (chunkLatex: string) => {
    setSelectedChunk(chunkLatex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedChunk(null);
  };

  // Close modal on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  const getSelectedSubFormula = (): FormulaChunk | null => {
    return formulaData.subFormulas.find(sf => sf.chunk === selectedChunk) || null;
  };

  const updateParameter = (paramName: string, value: number) => {
    setParameters(prev => ({ ...prev, [paramName]: value }));
  };

  return (
    <div className="min-h-screen w-full overflow-hidden flex flex-col relative">
      <FloatingFormulas />
      <FormulaHeader />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-8 flex flex-col items-center justify-center">
        <div className="space-y-12 w-full">
          <div className="flex flex-col justify-center space-y-8">
            <FormulaRenderer 
              formulaData={formulaData} 
              onChunkClick={handleChunkClick} 
            />
            <FormulaProperties formulaData={formulaData} />
          </div>
        </div>
      </main>

      <FormulaModal
        isOpen={isModalOpen}
        selectedChunk={getSelectedSubFormula()}
        parameters={parameters}
        onClose={closeModal}
        onParameterChange={updateParameter}
        onBackdropClick={handleBackdropClick}
        modalRef={modalRef}
      />

      <footer className="w-full text-center py-6 z-10">
        <p className="text-xs text-gray-400 dark:text-gray-600 font-medium tracking-wider uppercase opacity-60 hover:opacity-100 transition-opacity cursor-default">
          Notion2Pi © 2025 — Mathematics Visualized
        </p>
      </footer>
    </div>
  );
}