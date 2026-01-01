'use client';

import Link from 'next/link';
import { ArrowLeft, Search, Bookmark, Copy, Share, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FloatingFormulas } from '@/components/floating-formulas';
import { ThemeToggle } from '@/components/theme-toggle';

export default function FormulaPage() {
  return (
    <div className="min-h-screen w-full overflow-hidden flex flex-col items-center justify-center relative">
      <FloatingFormulas />

      <header className="absolute top-0 w-full max-w-4xl p-6 z-20 flex justify-between items-center">
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

      <main className="z-10 w-full max-w-3xl px-6 flex flex-col items-center justify-center space-y-12">
        <div className="relative group text-center">
          <div className="absolute inset-0 bg-white/5 dark:bg-white/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none scale-150"></div>

          <h1 className="relative text-7xl md:text-9xl font-display font-medium text-black dark:text-white tracking-tight drop-shadow-sm select-text">
            <span className="math-symbol">n</span>
            <span className="text-8xl md:text-[10rem] align-middle px-1">
              2
            </span>
            <span className="math-symbol">π</span>
          </h1>

          <p className="mt-4 text-sm uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 font-medium">
            Equation 4.2
          </p>
        </div>

        <div className="w-full glass-panel bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-glass rounded-2xl p-8 md:p-10 transform transition-all duration-300 hover:scale-[1.01]">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mb-1">
                Circle Geometry & Series
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Category: Pure Mathematics
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-white/10"
            >
              <Bookmark className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed font-light">
            <p>
              The{' '}
              <strong className="text-black dark:text-white font-medium">
                n2π
              </strong>{' '}
              expression represents the fundamental relationship in harmonic
              analysis and circular topology. Where{' '}
              <span className="math-symbol">n</span> signifies the integer
              coefficient of periodicity, and{' '}
              <span className="math-symbol">2π</span> denotes the complete
              circumference of the unit circle in radians.
            </p>

            <div className="pl-4 border-l-2 border-gray-300 dark:border-gray-700 italic text-gray-500 dark:text-gray-400">
              Often utilized in Fourier series expansions to normalize the
              period of a function to the standard interval.
            </div>

            <p>
              In the context of complex analysis, this term frequently appears
              in the exponent of the exponential function,{' '}
              <span className="font-mono bg-gray-200 dark:bg-white/10 rounded px-1 text-sm">
                e^(in2π)
              </span>
              , mapping integers to unity.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                className="flex items-center space-x-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 rounded-lg"
              >
                <Copy className="h-4 w-4" />
                <span>Copy LaTeX</span>
              </Button>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 rounded-lg"
              >
                <Share className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-400 dark:text-gray-500">
              <Eye className="h-4 w-4" />
              <span>1.2k views</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="absolute bottom-6 w-full text-center z-10">
        <p className="text-xs text-gray-400 dark:text-gray-600 font-medium tracking-wider uppercase opacity-60 hover:opacity-100 transition-opacity cursor-default">
          Notion2Pi © 2025 — Mathematics Visualized
        </p>
      </footer>
    </div>
  );
}
