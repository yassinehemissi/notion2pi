'use client';

import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { GlassPanel } from '../../atoms/glass-panel';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { generateFormulaAction } from '@/lib/actions';

export function FormulaGenerator() {
    const [description, setDescription] = useState('');
    const [isPending, setIsPending] = useState(false);

    const router = useRouter();

    const handleGenerate = async () => {
        if (!description.trim()) {
            toast("Validation Error", {
                description: "Please enter a description",
            });
            return;
        }

        setIsPending(true);
        try {
            const result = await generateFormulaAction(description.trim());

            toast("Formula Generated!", {
                description: `Successfully created ${result.formula}`,
            });

            router.push(`/formula/${result.slug}`);
        } catch (err) {
            toast("Generation Failed", {
                description: err instanceof Error ? err.message : "An unexpected error occurred",

            });
        } finally {
            setIsPending(false);
        }
    };

    return (
        <GlassPanel hover className="w-full p-6 sm:p-8 md:p-10">
            <div className="space-y-6">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mb-1">
                            Explore Formulas
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Browse existing formulas or generate new ones with AI (generation is only available in a <a target='_blank' className='text-gray-500 underline hover:text-black dark:hover:text-white transition-colors' href='https://github.com/yassinehemissi/notion2pi/'>local environment with configured API keys</a>).
                        </p>
                    </div>
                    <Sparkles className="h-6 w-6 text-gray-400" />
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <Textarea
                            placeholder="e.g., 'The quadratic formula for solving ax² + bx + c = 0' or 'Einstein's mass-energy equivalence'"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full resize-none bg-white dark:bg-white/5 border-gray-300 dark:border-white/10"
                        />

                        <Button
                            onClick={handleGenerate}
                            disabled={process.env.NODE_ENV == "production" || isPending || !description.trim()}
                            className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 text-white"
                        >
                            {isPending ? (
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
        </GlassPanel>
    );
}
