import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface LaTeXRendererProps {
  children: string;
  inline?: boolean;
  className?: string;
}

export function LaTeXRenderer({ children, inline = false, className = '' }: LaTeXRendererProps) {
  // For inline math, wrap in single $ signs
  // For display math, wrap in double $$ signs
  const mathContent = inline ? `$${children}$` : `$$${children}$$`;
  
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          // Customize paragraph rendering to avoid extra spacing
          p: ({ children }) => <span>{children}</span>,
        }}
      >
        {mathContent}
      </ReactMarkdown>
    </div>
  );
}

// Clickable LaTeX component for formula chunks
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