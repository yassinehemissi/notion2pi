'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PaginationInfo } from '@/types';

interface PaginationProps {
    pagination: PaginationInfo;
    onPageChange: (page: number) => void;
    className?: string;
}

export function Pagination({ pagination, onPageChange, className = "" }: PaginationProps) {
    if (pagination.totalPages <= 1) return null;

    return (
        <div className={`flex items-center justify-center space-x-4 pt-8 ${className}`}>
            <button
                onClick={() => onPageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPrev}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-white/5 dark:text-gray-300 dark:border-white/10 dark:hover:bg-white/10 transition-colors"
            >
                <ChevronLeft className="h-4 w-4" />
                Previous
            </button>

            <div className="flex items-center space-x-2">
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    let pageNum: number;
                    if (pagination.totalPages <= 5) {
                        pageNum = i + 1;
                    } else if (pagination.currentPage <= 3) {
                        pageNum = i + 1;
                    } else if (pagination.currentPage >= pagination.totalPages - 2) {
                        pageNum = pagination.totalPages - 4 + i;
                    } else {
                        pageNum = pagination.currentPage - 2 + i;
                    }

                    return (
                        <Button
                            key={pageNum}
                            variant={pageNum === pagination.currentPage ? "default" : "outline"}
                            size="sm"
                            onClick={() => onPageChange(pageNum)}
                            className="w-10 h-10"
                        >
                            {pageNum}
                        </Button>
                    );
                })}
            </div>

            <button
                onClick={() => onPageChange(pagination.currentPage + 1)}
                disabled={!pagination.hasNext}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-white/5 dark:text-gray-300 dark:border-white/10 dark:hover:bg-white/10 transition-colors"
            >
                Next
                <ChevronRight className="h-4 w-4" />
            </button>
        </div>
    );
}
