import { AppHeader } from '@/components/features/layout/app-header';
import { FloatingSymbols } from '@/components/features/layout/floating-symbols';
import { AppFooter } from '@/components/features/layout/app-footer';
import { getFormula } from '@/lib/actions/formula';
import { FormulaDetailView } from '@/components/features/formula-detail/formula-detail-view';
import { NotFoundError } from '@/lib/errors';
import { notFound } from 'next/navigation';

interface FormulaPageProps {
  params: { slug: string };
}

export default async function FormulaPage({ params }: FormulaPageProps) {
  const resolvedParams = await params;
  try {
    const formulaData = await getFormula(resolvedParams.slug);

    return (
      <div className="min-h-screen w-full overflow-hidden flex flex-col relative">
        <FloatingSymbols />
        <AppHeader />

        <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-8 flex flex-col items-center justify-center z-10">
          <div className="space-y-12 w-full">
            <FormulaDetailView formulaData={formulaData} />
          </div>
        </main>

        <AppFooter />
      </div>
    );
  } catch (error) {
    if (error instanceof NotFoundError) {
      notFound();
    }
    throw error;
  }
}