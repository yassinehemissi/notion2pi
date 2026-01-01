'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FloatingFormulas } from '@/components/floating-formulas';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  const [formulaName, setFormulaName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen w-full overflow-hidden flex flex-col items-center justify-center relative">
      <FloatingFormulas />

      <header className="absolute top-0 w-full max-w-4xl p-6 z-20 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xl font-display font-semibold tracking-tight">
            Notion2Pi
          </span>
        </div>
        <ThemeToggle />
      </header>

      <main className="z-10 w-full max-w-3xl px-6 flex flex-col items-center justify-center space-y-12">
        <div className="relative group text-center space-y-6">
          <div className="absolute inset-0 bg-white/5 dark:bg-white/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none scale-150"></div>

          <h1 className="relative text-6xl md:text-8xl font-display font-medium text-black dark:text-white tracking-tight drop-shadow-sm">
            A Bit Easier Abstract Math
          </h1>

          <p className="text-lg text-gray-500 dark:text-gray-400 font-light max-w-2xl mx-auto">
            Discover the meaning behind symbols in formulas.
          </p>
        </div>

        <div className="w-full glass-panel bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-glass rounded-2xl p-8 md:p-10 transform transition-all duration-300 hover:scale-[1.01]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mb-1">
                  Search for a formula
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Type the name and the system will search for the closest occurance
                </p>
              </div>
              <Sparkles className="h-6 w-6 text-gray-400" />
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="formula-name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Formula Name
                </label>
                <Input
                  id="formula-name"
                  placeholder="e.g., Pythagorean Theorem"
                  value={formulaName}
                  onChange={(e) => setFormulaName(e.target.value)}
                  className="bg-white dark:bg-white/5 border-gray-300 dark:border-white/10 focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>

             
            </div>

            <div className="pt-4 flex items-center justify-end">

              <Button
                type="submit"
                className="group bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 rounded-xl px-6"
              >
                Explain Formula
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>
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
