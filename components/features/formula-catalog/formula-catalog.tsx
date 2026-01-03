'use client';

import { FormulaItem, PaginationInfo } from '@/types';
import { FormulaCard } from '../../molecules/formula-card';
import { Pagination } from '../../molecules/pagination';
import { LoadingSpinner } from '../../atoms/loading-spinner';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FormulaCatalogProps {
    formulas: FormulaItem[];
    pagination: PaginationInfo | null;
    isLoading?: boolean;
}

export function FormulaCatalog({
    formulas,
    pagination,
    isLoading = false,
}: FormulaCatalogProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`/browse?${params.toString()}`);
    };

    if (isLoading) {
        return <LoadingSpinner size="lg" text="Loading formulas..." />;
    }

    if (formulas.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                    <Search className="h-12 w-12 mx-auto mb-4" />
                    <p className="text-lg">No formulas found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {formulas.map((formula) => (
                    <FormulaCard
                        key={formula.slug}
                        formula={formula}
                    />
                ))}
            </div>

            {pagination && (
                <Pagination
                    pagination={pagination}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}
