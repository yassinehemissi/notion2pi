'use client';

import { Bookmark, Copy, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassPanel } from '../../atoms/glass-panel';
import { MixedLatexText } from '../../atoms/mixed-latex-text';
import { FormulaData } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface FormulaPropertiesProps {
    formulaData: FormulaData;
}

export function FormulaProperties({ formulaData }: FormulaPropertiesProps) {
    const { toast } = useToast();

    const handleCopyLatex = async () => {
        try {
            await navigator.clipboard.writeText(formulaData.meta.latex);
            toast({
                title: "LaTeX Copied!",
                description: "Formula LaTeX has been copied to clipboard",
            });
        } catch (err) {
            toast({
                title: "Copy Failed",
                description: "Failed to copy LaTeX to clipboard",
                variant: "destructive",
            });
        }
    };

    const handleShare = async () => {
        const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
        try {
            await navigator.clipboard.writeText(currentUrl);
            toast({
                title: "Link Copied!",
                description: "Formula page link has been copied to clipboard",
            });
        } catch (err) {
            toast({
                title: "Share Failed",
                description: "Failed to copy link to clipboard",
                variant: "destructive",
            });
        }
    };

    return (
        <GlassPanel className="p-6 max-w-2xl mx-auto">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h2 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-1">
                        Full Formula Properties
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Category: {formulaData.meta.category}
                    </p>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-white/10"
                >
                    <Bookmark className="h-5 w-5" />
                </Button>
            </div>

            <div className="space-y-3 text-sm mb-4">
                {Object.entries(formulaData.fullFormulaSevenVector)
                    .filter(([key]) => key !== 'narrative' && key !== 'babyDefinition')
                    .map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400 font-medium">{key}:</span>
                            <span className="text-gray-900 dark:text-white text-right max-w-[60%]">
                                <MixedLatexText>{value as string}</MixedLatexText>
                            </span>
                        </div>
                    ))}
            </div>

            {formulaData.fullFormulaSevenVector.babyDefinition && (
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800/30">
                    <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg">👶</span>
                        <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">Baby Fast Definition</h4>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                        <MixedLatexText>{formulaData.fullFormulaSevenVector.babyDefinition}</MixedLatexText>
                    </p>
                </div>
            )}

            <div className="mb-4 p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    <MixedLatexText>{formulaData.fullFormulaSevenVector.narrative}</MixedLatexText>
                </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
                <div className="flex space-x-3">
                    <Button
                        variant="ghost"
                        onClick={handleCopyLatex}
                        className="flex items-center space-x-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 rounded-lg text-sm"
                    >
                        <Copy className="h-4 w-4" />
                        <span>Copy LaTeX</span>
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={handleShare}
                        className="flex items-center space-x-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 rounded-lg text-sm"
                    >
                        <Share className="h-4 w-4" />
                        <span>Share</span>
                    </Button>
                </div>
            </div>
        </GlassPanel>
    );
}
