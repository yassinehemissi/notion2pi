import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { FloatingSymbols } from '@/components/features/layout/floating-symbols';
import { AppFooter } from '@/components/features/layout/app-footer';
import { AppHeader } from '@/components/features/layout/app-header';
import { FormulaGenerator } from '@/components/features/formula-generator/formula-generator';
import { getFormulas } from '@/lib/actions/formula';

export default async function Home() {
  const formulas = await getFormulas();
  const trendingFormulas = formulas.slice(0, 3);

  return (
    <div className="min-h-screen w-full overflow-hidden flex flex-col relative">
      <FloatingSymbols />
      <AppHeader showBack={false} />

      <main className="flex-1 z-10 w-full max-w-3xl mx-auto px-6 flex flex-col items-center justify-center py-8">
        <div className="w-full space-y-12">
          <div className="relative group text-center space-y-6">
            <div className="absolute inset-0 bg-white/5 dark:bg-white/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none scale-150"></div>

            <h1 className="relative text-4xl sm:text-6xl md:text-8xl font-display font-medium text-black dark:text-white tracking-tight drop-shadow-sm">
              A Bit Easier Abstract Math
            </h1>

            <p className="text-lg text-gray-500 dark:text-gray-400 font-light max-w-2xl mx-auto">
              Discover the meaning behind symbols in formulas.
            </p>
          </div>

          <div className="space-y-12">
            <FormulaGenerator />

            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  Trending Formulas
                </h3>
                <Link
                  href="/browse"
                  className="text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1"
                >
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {trendingFormulas.length > 0 ? (
                  trendingFormulas.map((f: any) => (
                    <Link
                      key={f.slug}
                      href={`/formula/${f.slug}`}
                      className="group p-4 bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all hover:scale-[1.02] shadow-sm"
                    >
                      <div className="font-medium text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {f.formula}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-tighter">
                        {f.category}
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8 text-sm text-gray-500 italic">
                    Start by generating your first formula above.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <AppFooter className="flex-shrink-0" />
    </div>
  );
}
