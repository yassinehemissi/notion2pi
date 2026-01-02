import Database from 'better-sqlite3';
import path from 'path';
import { FormulaData } from '@/app/formula/data';

// Database path
const dbPath = path.join(process.cwd(), 'formulas.db');
const db = new Database(dbPath);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Create tables
const createTables = () => {
  // Main formulas table
  db.exec(`
    CREATE TABLE IF NOT EXISTS formulas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      formula_name TEXT NOT NULL,
      latex TEXT NOT NULL,
      category TEXT NOT NULL,
      full_formula_7vector TEXT NOT NULL,
      operators TEXT NOT NULL,
      baby_definition TEXT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Formula chunks/subformulas table
  db.exec(`
    CREATE TABLE IF NOT EXISTS formula_chunks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      formula_id INTEGER NOT NULL,
      chunk_order INTEGER NOT NULL,
      chunk TEXT NOT NULL,
      display_name TEXT NOT NULL,
      seven_vector TEXT NOT NULL,
      baby_definition TEXT NULL,
      FOREIGN KEY (formula_id) REFERENCES formulas (id) ON DELETE CASCADE
    )
  `);

  // Create indexes for better performance
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_formulas_slug ON formulas(slug);
    CREATE INDEX IF NOT EXISTS idx_formula_chunks_formula_id ON formula_chunks(formula_id);
  `);

  // Add baby_definition column if it doesn't exist (for existing databases)
  try {
    db.exec(`ALTER TABLE formula_chunks ADD COLUMN baby_definition TEXT NULL`);
  } catch (error) {
    // Column already exists, ignore error
  }

  // Add baby_definition column to formulas table if it doesn't exist
  try {
    db.exec(`ALTER TABLE formulas ADD COLUMN baby_definition TEXT NULL`);
  } catch (error) {
    // Column already exists, ignore error
  }
};

// Initialize database
createTables();


// Database operations
export const saveFormula = (formulaData: FormulaData): number => {
  const insertFormula = db.prepare(`
    INSERT INTO formulas (slug, formula_name, latex, category, full_formula_7vector, operators, baby_definition)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const insertChunk = db.prepare(`
    INSERT INTO formula_chunks (formula_id, chunk_order, chunk, display_name, seven_vector, baby_definition)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const result = insertFormula.run(
    formulaData.meta.slug,
    formulaData.meta.formula,
    formulaData.meta.latex,
    formulaData.meta.category,
    JSON.stringify(formulaData.fullFormula7Vector),
    JSON.stringify(formulaData.operators),
    formulaData.fullFormula7Vector.babyDefinition
  );

  const formulaId = result.lastInsertRowid as number;

  formulaData.subFormulas.forEach((chunk, index) => {
    insertChunk.run(
      formulaId,
      index,
      chunk.chunk,
      chunk.displayName,
      JSON.stringify(chunk["7Vector"]),
      chunk.babyDefinition
    );
  });

  return formulaId;
};

export const getFormulaBySlug = (slug: string): FormulaData | null => {
  const getFormula = db.prepare(`
    SELECT * FROM formulas WHERE slug = ?
  `);

  const getChunks = db.prepare(`
    SELECT * FROM formula_chunks WHERE formula_id = ? ORDER BY chunk_order
  `);

  const formula = getFormula.get(slug) as any;
  if (!formula) return null;

  const chunks = getChunks.all(formula.id) as any[];

  return {
    meta: {
      formula: formula.formula_name,
      latex: formula.latex,
      slug: formula.slug,
      category: formula.category
    },
    fullFormula7Vector: {
      ...JSON.parse(formula.full_formula_7vector),
      babyDefinition: formula.baby_definition || null
    },
    operators: JSON.parse(formula.operators),
    subFormulas: chunks.map(chunk => ({
      chunk: chunk.chunk,
      displayName: chunk.display_name,
      "7Vector": JSON.parse(chunk.seven_vector),
      babyDefinition: chunk.baby_definition || null
    }))
  };
};

export const getAllFormulas = (): Array<{slug: string, formula: string, category: string}> => {
  const getAll = db.prepare(`
    SELECT slug, formula_name as formula, category FROM formulas ORDER BY created_at DESC
  `);

  return getAll.all() as Array<{slug: string, formula: string, category: string}>;
};

export const searchFormulas = (query: string, limit: number = 20, offset: number = 0): {
  formulas: Array<{slug: string, formula: string, category: string, latex: string}>,
  total: number
} => {
  const searchQuery = `%${query.toLowerCase()}%`;
  
  const searchStmt = db.prepare(`
    SELECT slug, formula_name as formula, category, latex 
    FROM formulas 
    WHERE LOWER(formula_name) LIKE ? 
       OR LOWER(category) LIKE ? 
       OR LOWER(latex) LIKE ?
    ORDER BY 
      CASE 
        WHEN LOWER(formula_name) LIKE ? THEN 1
        WHEN LOWER(category) LIKE ? THEN 2
        ELSE 3
      END,
      created_at DESC
    LIMIT ? OFFSET ?
  `);

  const countStmt = db.prepare(`
    SELECT COUNT(*) as total
    FROM formulas 
    WHERE LOWER(formula_name) LIKE ? 
       OR LOWER(category) LIKE ? 
       OR LOWER(latex) LIKE ?
  `);

  const formulas = searchStmt.all(
    searchQuery, searchQuery, searchQuery, // WHERE conditions
    searchQuery, searchQuery, // ORDER BY conditions
    limit, offset
  ) as Array<{slug: string, formula: string, category: string, latex: string}>;

  const result = countStmt.get(searchQuery, searchQuery, searchQuery) as {total: number};

  return {
    formulas,
    total: result.total
  };
};

export const getFormulasWithPagination = (limit: number = 20, offset: number = 0): {
  formulas: Array<{slug: string, formula: string, category: string, latex: string}>,
  total: number
} => {
  const getFormulas = db.prepare(`
    SELECT slug, formula_name as formula, category, latex 
    FROM formulas 
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `);

  const getCount = db.prepare(`
    SELECT COUNT(*) as total FROM formulas
  `);

  const formulas = getFormulas.all(limit, offset) as Array<{slug: string, formula: string, category: string, latex: string}>;
  const result = getCount.get() as {total: number};

  return {
    formulas,
    total: result.total
  };
};

export default db;