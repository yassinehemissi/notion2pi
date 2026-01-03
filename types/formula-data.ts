import { FormulaChunk } from './formula-chunk';
import { SevenVector } from './seven-vector';

export interface FormulaData {
    meta: {
        formula: string;
        latex: string;
        slug: string;
        category: string;
    };
    fullFormulaSevenVector: SevenVector;
    subFormulas: FormulaChunk[];
    operators: string[];
}
