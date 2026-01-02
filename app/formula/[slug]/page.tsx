'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FormulaData, FormulaChunk } from '../data';
import { FloatingFormulas } from '@/components/floating-formulas';
import { FormulaHeader } from '@/components/formula/formula-header';
import { FormulaRenderer } from '@/components/formula/formula-renderer';
import { FormulaProperties } from '@/components/formula/formula-properties';
import { FormulaModal } from '@/components/formula/formula-modal';
import { LoadingSpinner } from '@/components/loading-spinner';
import { ErrorBoundary } from '@/components/error-boundary';
import { AppFooter } from '@/components/app-footer';
import { useFormulaQuery } from '@/hooks/use-formulas-query';

interface DynamicFormulaPageProps {}

export default function DynamicFormulaPage({}: DynamicFormulaPageProps) {
  const params = useParams();
  const slug = params.slug as string;
  
  const [selectedChunk, setSelectedChunk] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Use React Query for data fetching
  const { data: formulaData, isLoading, error } = useFormulaQuery(slug);

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

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading formula..." />
      </div>
    );
  }

  // Error state
  if (error || !formulaData) {
    const isNotFound = error?.message === 'Formula not found';
    return (
      <ErrorBoundary
        title={isNotFound ? 'Formula Not Found' : 'Error Loading Formula'}
        message={
          isNotFound 
            ? `The formula "${slug}" could not be found.`
            : 'There was an error loading the formula. Please try again.'
        }
      />
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

  const getSelectedSubFormula = (): FormulaChunk | null => {
    return formulaData.subFormulas.find((sf: FormulaChunk) => sf.chunk === selectedChunk) || null;
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
        onClose={closeModal}
        modalRef={modalRef}
      />

      <AppFooter />
    </div>
  );
}