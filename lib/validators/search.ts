import { z } from 'zod';

export const SearchParamsSchema = z.object({
    q: z.string().optional().default(''),
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(100).optional().default(12),
});

export type SearchParamsInput = z.infer<typeof SearchParamsSchema>;
