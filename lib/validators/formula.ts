import { z } from 'zod';

export const CreateFormulaSchema = z.object({
    description: z.string().min(3).max(500),
});

export type CreateFormulaInput = z.infer<typeof CreateFormulaSchema>;
