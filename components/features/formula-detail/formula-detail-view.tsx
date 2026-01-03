'use client';

import { useState, useRef, useEffect } from 'react';
import { FormulaData, FormulaChunk } from '@/types';
import { FormulaRenderer } from './formula-renderer';
import { FormulaProperties } from './formula-properties';
import { FormulaModal } from './formula-modal';

interface FormulaDetailViewProps {
    formulaData: FormulaData;
}

export function FormulaDetailView({ formulaData }: FormulaDetailViewProps) {
    const [selectedChunk, setSelectedChunk] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null!);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal();
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

    const handleChunkClick = (chunkLatex: string) => {
        setSelectedChunk(chunkLatex);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedChunk(null);
    };

    const getSelectedSubFormula = (): FormulaChunk | null => {
        return formulaData.subFormulas.find((sf) => sf.chunk === selectedChunk) || null;
    };

    return (
        <>
            <div className="flex flex-col justify-center space-y-8 w-full">
                <FormulaRenderer
                    formulaData={formulaData}
                    onChunkClick={handleChunkClick}
                />
                <FormulaProperties formulaData={formulaData} />
            </div>

            <FormulaModal
                isOpen={isModalOpen}
                selectedChunk={getSelectedSubFormula()}
                onClose={closeModal}
                modalRef={modalRef}
            />
        </>
    );
}
