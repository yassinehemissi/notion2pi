import { ReactNode } from 'react';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassPanel({ 
  children, 
  className = "", 
  hover = false 
}: GlassPanelProps) {
  const baseClasses = "glass-panel bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-glass rounded-2xl";
  const hoverClasses = hover ? "transform transition-all duration-300 hover:scale-[1.01]" : "";
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}