'use server';

import { generateFormulaData } from '../ai/generate';
import { createFormula } from '../db/models/formula';
import { CreateFormulaSchema } from '../validators/formula';
import { ValidationError, AIError } from '../errors';
import { revalidatePath } from 'next/cache';

const stopUsage = true

export async function generateFormulaAction(description: string) {
    try {

        if (stopUsage) {
            console.error('Currently the api is deactivated so i don"t go bankrupt ');
            throw new Error('An unexpected error occurred while generating the formula');
        }
        // 1. Validate input
        const validated = CreateFormulaSchema.safeParse({ description });
        if (!validated.success) {
            throw new ValidationError(validated.error.message);
        }

        // 2. Generate with AI
        let formulaData;
        try {
            formulaData = await generateFormulaData(validated.data.description);
        } catch (error) {
            console.error('AI Generation Error:', error);
            throw new AIError();
        }

        // 3. Save to DB
        const saved = await createFormula(formulaData);

        // 4. Revalidate cache
        revalidatePath('/');
        revalidatePath('/browse');

        return {
            slug: saved.slug,
            formula: saved.formulaName,
            success: true
        };
    } catch (error) {
        if (error instanceof ValidationError || error instanceof AIError) {
            throw error;
        }
        console.error('Unexpected error in generateFormulaAction:', error);
        throw new Error('An unexpected error occurred while generating the formula');
    }
}
