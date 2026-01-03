import { FormulaItem } from './formula-item';
import { PaginationInfo } from './pagination-info';

export interface SearchResponse {
    formulas: FormulaItem[];
    pagination: PaginationInfo;
}
