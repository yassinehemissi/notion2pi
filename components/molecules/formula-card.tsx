import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LaTeXRenderer } from '../atoms/latex-renderer';
import { FormulaListItem } from '@/types';

interface FormulaCardProps {
    formula: FormulaListItem & { latex?: string };
    onMouseEnter?: () => void;
}

export function FormulaCard({ formula, onMouseEnter }: FormulaCardProps) {
    return (
        <Link
            href={`/formula/${formula.slug}`}
            onMouseEnter={onMouseEnter}
        >
            <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {formula.formula}
                    </CardTitle>
                    <CardDescription className="text-sm">
                        {formula.category}
                    </CardDescription>
                </CardHeader>
                {formula.latex && (
                    <CardContent>
                        <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-4 text-center">
                            <LaTeXRenderer className="text-lg" inline>
                                {formula.latex}
                            </LaTeXRenderer>
                        </div>
                    </CardContent>
                )}
            </Card>
        </Link>
    );
}
