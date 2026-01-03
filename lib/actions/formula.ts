'use server';

import { getAllFormulas as dbGetAllFormulas, getFormulaBySlug as dbGetFormulaBySlug, searchFormulas as dbSearchFormulas } from '../db/models/formula';
import { SearchParamsSchema } from '../validators/search';
import { NotFoundError } from '../errors';

export async function getFormulas() {
    return await dbGetAllFormulas();
}

export async function getFormula(slug: string) {
    const formula = await dbGetFormulaBySlug(slug);
    if (!formula) {
        throw new NotFoundError(`Formula with slug ${slug}`);
    }
    return formula;
}

export async function searchFormulasAction(formData: FormData | Record<string, any>) {
    const data = formData instanceof FormData
        ? Object.fromEntries(formData.entries())
        : formData;

    const validated = SearchParamsSchema.parse(data);
    const offset = (validated.page - 1) * validated.limit;

    const result = await dbSearchFormulas(validated.q, validated.limit, offset);

    const totalPages = Math.ceil(result.total / validated.limit);

    return {
        formulas: result.formulas,
        pagination: {
            currentPage: validated.page,
            totalPages,
            totalItems: result.total,
            itemsPerPage: validated.limit,
            hasNext: validated.page < totalPages,
            hasPrev: validated.page > 1,
        }
    };
}
