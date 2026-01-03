import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface LaTeXRendererProps {
    children: string;
    inline?: boolean;
    className?: string;
}

export function LaTeXRenderer({ children, inline = false, className = '' }: LaTeXRendererProps) {
    const mathContent = inline ? `$${children}$` : `$$${children}$$`;

    return (
        <div className={className}>
            <ReactMarkdown
                remarkPlugins={[remarkMath]}

                rehypePlugins={[rehypeKatex]}
            >
                {mathContent}
            </ReactMarkdown>
        </div>
    );
}
