'use client';

import { useSearchParams } from 'next/navigation';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FloatingFormulas } from '@/components/floating-formulas';
import { FormulaHeader } from '@/components/formula/formula-header';
import { LaTeXRenderer } from '@/components/latex-renderer';
import { LoadingSpinner } from '@/components/loading-spinner';
import { AppFooter } from '@/components/app-footer';
import { useSearch } from '@/hooks/use-search';
import Link from 'next/link';

export default function FormulaPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const {
    searchQuery,
    formulas,
    pagination,
    currentPage,
    isLoading,
    error,
    handleSearchChange,
    handlePageChange
  } = useSearch({ initialQuery, limit: 9 });

  return (
    <div className="min-h-screen w-full overflow-hidden flex flex-col relative">
      <FloatingFormulas />
      <FormulaHeader />

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white">
              Formula Catalog
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our collection of mathematical formulas with detailed analysis and 7-Vector properties
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search formulas by name, category, or LaTeX content..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg bg-white dark:bg-white/5 border-gray-300 dark:border-white/10"
              />
              {isLoading && (
                <LoadingSpinner size="sm" className="absolute right-3 top-1/2 transform -translate-y-1/2 py-0" />
              )}
            </div>
          </div>

          {/* Results Info */}
          {pagination && !isLoading && (
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              {searchQuery ? (
                <p>
                  Found {pagination.totalItems} result{pagination.totalItems !== 1 ? 's' : ''} for &quot;{searchQuery}&quot;
                </p>
              ) : (
                <p>
                  Showing {pagination.totalItems} formula{pagination.totalItems !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <LoadingSpinner size="lg" text="Loading formulas..." />
          )}

          {/* Formula Grid */}
          {!isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formulas.map((formula) => (
                <Link key={formula.slug} href={`/formula/${formula.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {formula.formula}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {formula.category}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-4 text-center">
                        <LaTeXRenderer className="text-lg">
                          {formula.latex}
                        </LaTeXRenderer>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {/* No Results */}
          {!isLoading && formulas.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto mb-4" />
                <p className="text-lg">No formulas found</p>
                <p className="text-sm">
                  {searchQuery ? `Try a different search term` : 'No formulas available'}
                </p>
              </div>
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && !isLoading && (
            <div className="flex items-center justify-center space-x-4 pt-8">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!pagination.hasPrev}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex items-center space-x-2">
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  let pageNum;
                  if (pagination.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= pagination.totalPages - 2) {
                    pageNum = pagination.totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={pageNum === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                      className="w-10 h-10"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!pagination.hasNext}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
