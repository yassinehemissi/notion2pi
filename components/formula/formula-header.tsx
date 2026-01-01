import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/theme-toggle';

export function FormulaHeader() {
  return (
    <header className="w-full max-w-6xl mx-auto p-6 z-20 flex justify-between items-center">
      <Link
        href="/"
        className="group flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded-lg px-2 py-1"
      >
        <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium tracking-wide uppercase">
          Back
        </span>
      </Link>

      <div className="relative group w-96">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400 dark:text-gray-500 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" />
        </div>
        <Input
          type="text"
          placeholder="Search formulas or concepts..."
          className="pl-10 pr-16 bg-gray-100 dark:bg-white/5 border-transparent focus:bg-white dark:focus:bg-black/40 focus:ring-2 focus:ring-black dark:focus:ring-white rounded-xl glass-panel"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-xs text-gray-400 dark:text-gray-600 border border-gray-300 dark:border-gray-700 rounded px-1.5 py-0.5">
            ⌘K
          </span>
        </div>
      </div>

      <ThemeToggle />
    </header>
  );
}