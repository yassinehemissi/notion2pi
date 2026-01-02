"use client";

import Link from "next/link";
import { useState } from "react";
import { Sparkles, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FloatingFormulas } from "@/components/floating-formulas";
import { ThemeToggle } from "@/components/theme-toggle";
import { GlassPanel } from "@/components/glass-panel";
import { LoadingSpinner } from "@/components/loading-spinner";
import { AppFooter } from "@/components/app-footer";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useFormulas } from "@/hooks/use-formulas";
import { useApiError } from "@/hooks/use-api-error";

export default function Home() {
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { formulas, isLoading: isLoadingFormulas } = useFormulas();
  const { error, handleError, clearError } = useApiError();

  const handleGenerate = async () => {
    if (!description.trim()) {
      handleError("Please enter a description", "validation");
      return;
    }

    setIsGenerating(true);
    clearError();

    try {
      const response = await fetch("/formula", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: description.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate formula");
      }

      const result = await response.json();

      toast({
        title: "Formula Generated!",
        description: `Successfully created ${result.formula}`,
      });

      // Redirect to the generated formula page
      router.push(`/formula/${result.slug}`);
    } catch (err) {
      handleError(err, "generation");

      toast({
        title: "Generation Failed",
        description: error?.message || "An unexpected error occurred",
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

        <GlassPanel hover className="w-full p-8 md:p-10">
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

            {/* Single Column Layout */}
            <div className="space-y-6">
              {/* Generate New Formula - Full Width */}
              <div className="space-y-4">
                <div className="space-y-3">
                  <Textarea
                    placeholder="e.g., 'The quadratic formula for solving ax² + bx + c = 0' or 'Einstein's mass-energy equivalence'"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full resize-none bg-white dark:bg-white/5 border-gray-300 dark:border-white/10"
                  />

                  {error && (
                    <div className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded">
                      {error.message}
                    </div>
                  )}

                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || !description.trim()}
                    className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 text-white"
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

              {/* Browse Formulas - Examples in Rows */}
              <div className="space-y-4">
                <div className="space-x-3 grid grid-cols-3">
                  {isLoadingFormulas ? (
                    <LoadingSpinner size="md" className="py-8" />
                  ) : formulas.length > 0 ? (
                    formulas.slice(0, 3).map((formula) => (
                      <Link
                        key={formula.slug}
                        href={`/formula/${formula.slug}`}
                        className="block p-4 h-full bg-white dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
                      >
                        <div className="font-medium text-gray-900 dark:text-white">
                          {formula.formula}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
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

                {/* Browse All Arrow - Grey */}
                <div className="pt-2">
                  <Link
                    href="/browse"
                    className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors text-sm"
                  >
                    Browse All Formulas
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </GlassPanel>
      </main>

      <AppFooter className="absolute bottom-6" />
    </div>
  );
}
