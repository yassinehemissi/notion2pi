import { SevenVector } from './seven-vector';

export interface FormulaChunk {
    chunk: string;
    displayName: string;
    sevenVector: SevenVector;
    babyDefinition: string | null;
}
