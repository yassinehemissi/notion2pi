'use client';

import { LaTeXRenderer } from '../atoms/latex-renderer';

interface ClickableLaTeXProps {
    latex: string;
    displayName: string;
    onClick: () => void;
    className?: string;
}

export function ClickableLaTeX({ latex, displayName, onClick, className = '' }: ClickableLaTeXProps) {
    return (
        <span
            className={`chunk cursor-pointer transition-all duration-200 px-4 py-3 rounded-xl inline-flex items-center hover:bg-white/10 dark:hover:bg-white/5 hover:scale-105 ${className}`}
            onClick={onClick}
            title={displayName}
        >
            <LaTeXRenderer inline>{latex}</LaTeXRenderer>
        </span>
    );
}
