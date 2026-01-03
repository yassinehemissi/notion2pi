import { AppHeader } from '@/components/features/layout/app-header';
import { FloatingSymbols } from '@/components/features/layout/floating-symbols';
import { AppFooter } from '@/components/features/layout/app-footer';
import { searchFormulasAction } from '@/lib/actions/formula';
import { FormulaCatalog } from '@/components/features/formula-catalog/formula-catalog';
import { SearchParamsSchema } from '@/lib/validators/search';

interface BrowsePageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function BrowsePage({ searchParams }: BrowsePageProps) {
  const resolvedSearchParams = await searchParams;

  const validated = SearchParamsSchema.parse({
    q: resolvedSearchParams.q || '',
    page: resolvedSearchParams.page || 1,
    limit: resolvedSearchParams.limit || 9
  });

  // 2. Fetch data on server
  const result = await searchFormulasAction(validated);

  return (
    <div className="min-h-screen w-full overflow-hidden flex flex-col relative">
      <FloatingSymbols />
      <AppHeader />

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-8 z-10">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white">
              Formula Catalog
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore mathematical formulas with detailed analysis and 7-Vector properties.
            </p>
          </div>

          {/* Results Info */}
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            {validated.q ? (
              <p>
                Found {result.pagination.totalItems} result{result.pagination.totalItems !== 1 ? 's' : ''} for &quot;{validated.q}&quot;
              </p>
            ) : (
              <p>
                Showing {result.pagination.totalItems} formula{result.pagination.totalItems !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          <FormulaCatalog
            formulas={result.formulas}
            pagination={result.pagination}
            isLoading={false}
          />
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
