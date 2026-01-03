import { prisma } from '../client';
import { FormulaData } from '../../../types';

export const createFormula = async (data: FormulaData) => {
    return await prisma.formula.create({
        data: {
            slug: data.meta.slug,
            formulaName: data.meta.formula,
            latex: data.meta.latex,
            category: data.meta.category,
            fullFormulaSevenVector: JSON.stringify(data.fullFormulaSevenVector),
            operators: JSON.stringify(data.operators),
            babyDefinition: data.fullFormulaSevenVector.babyDefinition,
            chunks: {
                create: data.subFormulas.map((chunk, index) => ({
                    chunkOrder: index,
                    chunk: chunk.chunk,
                    displayName: chunk.displayName,
                    sevenVector: JSON.stringify(chunk.sevenVector),
                    babyDefinition: chunk.babyDefinition,
                })),
            },
        },
    });
};

export const getFormulaBySlug = async (slug: string) => {
    const formula = await prisma.formula.findUnique({
        where: { slug },
        include: {
            chunks: {
                orderBy: { chunkOrder: 'asc' },
            },
        },
    });

    if (!formula) return null;

    return {
        meta: {
            formula: formula.formulaName,
            latex: formula.latex,
            slug: formula.slug,
            category: formula.category,
        },
        fullFormulaSevenVector: {
            ...JSON.parse(formula.fullFormulaSevenVector),
            babyDefinition: formula.babyDefinition,
        },
        operators: JSON.parse(formula.operators),
        subFormulas: (formula.chunks as any[]).map((chunk) => ({
            chunk: chunk.chunk,
            displayName: chunk.displayName,
            sevenVector: JSON.parse(chunk.sevenVector),
            babyDefinition: chunk.babyDefinition,
        })),
    };
};
export const getAllFormulas = async () => {
    const formulas = await prisma.formula.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
            slug: true,
            formulaName: true,
            category: true,
        },
    });

    return formulas.map((f: { slug: string; formulaName: string; category: string }) => ({
        slug: f.slug,
        formula: f.formulaName,
        category: f.category
    }));
};

export const searchFormulas = async (query: string, limit: number, offset: number) => {
    const where = query
        ? {
            OR: [
                { formulaName: { contains: query } },
                { category: { contains: query } },
                { latex: { contains: query } },
            ],
        }
        : {};

    const [formulas, total] = await Promise.all([
        prisma.formula.findMany({
            where,
            take: limit,
            skip: offset,
            orderBy: { createdAt: 'desc' },
            select: {
                slug: true,
                formulaName: true,
                category: true,
                latex: true,
            },
        }),
        prisma.formula.count({ where }),
    ]);

    return {
        formulas: formulas.map((f: { slug: string; formulaName: string; category: string; latex: string }) => ({
            slug: f.slug,
            formula: f.formulaName,
            category: f.category,
            latex: f.latex
        })),
        total,
    };
};
