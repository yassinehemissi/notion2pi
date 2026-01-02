interface AppFooterProps {
  className?: string;
}

export function AppFooter({ className = "" }: AppFooterProps) {
  return (
    <footer className={`w-full text-center py-6 z-10 ${className}`}>
      <p className="text-xs text-gray-400 dark:text-gray-600 font-medium tracking-wider uppercase opacity-60 hover:opacity-100 transition-opacity cursor-default">
        Notion2Pi © 2025 — Mathematics Visualized
      </p>
    </footer>
  );
}