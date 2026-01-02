'use client';

import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface MixedLatexTextProps {
  children: string;
  className?: string;
}

export function MixedLatexText({ children, className = '' }: MixedLatexTextProps) {
  // Simple and efficient: convert LaTeX delimiters to $ and let ReactMarkdown handle the rest
  const processedText = children
    .replace(/\\\(/g, '$')
    .replace(/\\\)/g, '$')
    .replace(/\\\[/g, '$$')
    .replace(/\\\]/g, '$$');

  return (
    <span className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          // Remove paragraph wrapper to avoid layout issues
          p: ({ children }) => <>{children}</>,
        }}
      >
        {processedText}
      </ReactMarkdown>
    </span>
  );
}