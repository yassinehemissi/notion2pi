'use client';

import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface MixedLatexTextProps {
    children: string;
    className?: string;
}

export function MixedLatexText({ children, className = '' }: MixedLatexTextProps) {
    const processedText = children
        .replace(/\\\(\s*/g, '$')
        .replace(/\s*\\\)/g, '$')
        .replace(/\\\[\s*/g, '$$')
        .replace(/\s*\\\]/g, '$$');

    return (
        <span className={className}>
            <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}

            >
                {processedText}
            </ReactMarkdown>
        </span>
    );
}
