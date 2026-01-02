'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FloatingFormulas } from '@/components/floating-formulas';
import { ThemeToggle } from '@/components/theme-toggle';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface FormulaListItem {
  slug: string;
  formula: string;
  category: string;
}

export default function Home() {
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formulas, setFormulas] = useState<FormulaListItem[]>([]);
  const [isLoadingFormulas, setIsLoadingFormulas] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  // Load formulas on component mount
  useEffect(() => {
    const loadFormulas = async () => {
      try {
        const response = await fetch('/api/formulas');
        if (response.ok) {
          const formulaList = await response.json();
          setFormulas(formulaList);
        }
      } catch (error) {
        console.error('Failed to load formulas:', error);
      } finally {
        setIsLoadingFormulas(false);
      }
    };

    loadFormulas();
  }, []);

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError('Please enter a description');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/formula', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: description.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate formula');
      }

      const result = await response.json();
      
      toast({
        title: "Formula Generated!",
        description: `Successfully created ${result.formula}`,
      });

      // Redirect to the generated formula page
      router.push(`/formula/${result.slug}`);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
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
          <div className="space-y-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mb-1">
                  Explore Formulas
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Browse existing formulas or generate new ones with AI
                </p>
              </div>
              <Sparkles className="h-6 w-6 text-gray-400" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Browse Formulas
                </h3>
                <div className="space-y-2">
                  {isLoadingFormulas ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                    </div>
                  ) : formulas.length > 0 ? (
                    formulas.slice(0, 3).map((formula) => (
                      <Link
                        key={formula.slug}
                        href={`/formula/${formula.slug}`}
                        className="block p-3 bg-white dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
                      >
                        <div className="font-medium text-gray-900 dark:text-white">
                          {formula.formula}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {formula.category}
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                      No formulas available
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Generate New Formula
                </h3>
                <div className="space-y-3">
                  <Textarea
                    placeholder="e.g., 'The quadratic formula for solving ax² + bx + c = 0' or 'Einstein's mass-energy equivalence'"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="resize-none bg-white dark:bg-white/5 border-gray-300 dark:border-white/10"
                  />
                  
                  {error && (
                    <div className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded">
                      {error}
                    </div>
                  )}

                  <Button 
                    onClick={handleGenerate} 
                    disabled={isGenerating || !description.trim()}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Formula
                      </>
                    )}
                  </Button>
                </div>
              </div>
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
