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
      FOREIGN KEY (formula_id) REFERENCES formulas (id) ON DELETE CASCADE
    )
  `);

  // Create indexes for better performance
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_formulas_slug ON formulas(slug);
    CREATE INDEX IF NOT EXISTS idx_formula_chunks_formula_id ON formula_chunks(formula_id);
  `);
};

// Initialize database
createTables();

// Insert static formulas if they don't exist
const insertStaticFormulas = () => {
  const staticFormulas = [
    {
      slug: 'normal-distribution',
      formula_name: 'Normal Distribution Density Function',
      latex: 'f(x)=\\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}',
      category: 'Probability Theory',
      full_formula_7vector: JSON.stringify({
        Role: "Probability density",
        Domain: "ℝ → ℝ≥0",
        Binding: "x free, μ,σ parameters",
        Variance: "σ scales width",
        Geometric: "Bell curve",
        Invariant: "Total area = 1",
        Limits: "σ→0 → Dirac; σ→∞ → flat",
        narrative: "The normal distribution density function represents the iconic bell curve that appears throughout nature and statistics. It transforms any real input x into a non-negative probability density, with the curve's width controlled by σ and center positioned at μ. This fundamental function maintains unit area under its curve, making it a proper probability distribution that approaches extreme forms as σ varies."
      }),
      operators: JSON.stringify(["\\times"]),
      chunks: [
        {
          chunk: "\\frac{1}{\\sigma\\sqrt{2\\pi}}",
          display_name: "1/(σ√(2π))",
          seven_vector: JSON.stringify({
            Role: "Normalising constant",
            Domain: "ℝ>0",
            Binding: "depends on σ",
            Variance: "Inverse scale",
            Geometric: "Peak height",
            Invariant: "Keeps area = 1",
            Limits: "σ→0 → ∞; σ→∞ → 0",
            narrative: "This normalizing constant acts as the gatekeeper of probability, ensuring the bell curve maintains unit area regardless of its width. As σ shrinks, this term grows larger to compensate for the narrowing curve, while expanding σ reduces the peak height. It's the mathematical embodiment of conservation - what's lost in width is gained in height."
          })
        },
        {
          chunk: "e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}",
          display_name: "e^(-(x-μ)²/(2σ²))",
          seven_vector: JSON.stringify({
            Role: "Exponential decay",
            Domain: "ℝ",
            Binding: "x free",
            Variance: "Quadratic penalty",
            Geometric: "Bell wings",
            Invariant: "Symmetry around μ",
            Limits: "±∞ → 0",
            narrative: "The exponential decay term creates the signature bell shape through its quadratic penalty function. Distance from the mean μ is squared and scaled by σ², then negated in the exponent, causing rapid decay as we move away from center. This mathematical structure ensures perfect symmetry around μ while the wings gracefully approach zero at the extremes."
          })
        }
      ]
    },
    {
      slug: 'pythagorean-theorem',
      formula_name: 'Pythagorean Theorem',
      latex: 'a^2 + b^2 = c^2',
      category: 'Geometry',
      full_formula_7vector: JSON.stringify({
        Role: "Geometric relationship",
        Domain: "ℝ>0 → ℝ>0",
        Binding: "a,b sides, c hypotenuse",
        Variance: "Scale invariant",
        Geometric: "Right triangle",
        Invariant: "Sum of squares",
        Limits: "a,b→0 → c→0; a→∞ → c→a",
        narrative: "The Pythagorean theorem establishes the fundamental relationship between the sides of a right triangle. It states that the square of the hypotenuse (the side opposite the right angle) is equal to the sum of the squares of the other two sides. This relationship has been known for over 2500 years and forms the foundation of Euclidean geometry, with applications ranging from basic construction to advanced physics and engineering."
      }),
      operators: JSON.stringify(["+", "="]),
      chunks: [
        {
          chunk: "a^2",
          display_name: "a²",
          seven_vector: JSON.stringify({
            Role: "First leg squared",
            Domain: "ℝ>0",
            Binding: "a is side length",
            Variance: "Quadratic growth",
            Geometric: "Area of square on side a",
            Invariant: "Always positive",
            Limits: "a→0 → 0; a→∞ → ∞",
            narrative: "The square of the first leg represents the area of a square constructed on side 'a' of the right triangle. This geometric interpretation was fundamental to the ancient Greek understanding of the theorem, where they visualized actual squares built on each side of the triangle. The quadratic relationship means that doubling the side length quadruples the area."
          })
        },
        {
          chunk: "b^2",
          display_name: "b²",
          seven_vector: JSON.stringify({
            Role: "Second leg squared",
            Domain: "ℝ>0",
            Binding: "b is side length",
            Variance: "Quadratic growth",
            Geometric: "Area of square on side b",
            Invariant: "Always positive",
            Limits: "b→0 → 0; b→∞ → ∞",
            narrative: "The square of the second leg represents the area of a square constructed on side 'b' of the right triangle. Together with a², this term forms half of the fundamental equation. The geometric significance is that the combined areas of the squares on the two legs exactly equals the area of the square on the hypotenuse, providing a visual proof of the theorem."
          })
        },
        {
          chunk: "c^2",
          display_name: "c²",
          seven_vector: JSON.stringify({
            Role: "Hypotenuse squared",
            Domain: "ℝ>0",
            Binding: "c is hypotenuse length",
            Variance: "Quadratic growth",
            Geometric: "Area of square on hypotenuse",
            Invariant: "Equals a² + b²",
            Limits: "c→max(a,b) when other→0",
            narrative: "The square of the hypotenuse represents the area of the largest square in the Pythagorean construction. This term is always equal to the sum of the squares of the other two sides, making it the cornerstone of the theorem. The hypotenuse is always the longest side of a right triangle, and its square provides the geometric balance that makes the theorem universally true."
          })
        }
      ]
    },
    {
      slug: 'jarque-bera-test',
      formula_name: 'Jarque-Bera Test Statistic',
      latex: 'JB = \\frac{n}{6}\\left(S^2 + \\frac{(K-3)^2}{4}\\right)',
      category: 'Statistics',
      full_formula_7vector: JSON.stringify({
        Role: "Normality test statistic",
        Domain: "ℝ⁺ → ℝ≥0",
        Binding: "n sample size, S skewness, K kurtosis",
        Variance: "Increases with deviation from normality",
        Geometric: "Chi-squared distribution under null hypothesis",
        Invariant: "Always non-negative",
        Limits: "JB→0 for normal data; JB→∞ for non-normal",
        narrative: "The Jarque-Bera test statistic measures how much the skewness and kurtosis of sample data deviate from those of a normal distribution. Under the null hypothesis of normality, JB follows a chi-squared distribution with 2 degrees of freedom. Values close to zero suggest normality, while large values indicate departure from normality, making it a powerful tool for testing distributional assumptions in statistical analysis."
      }),
      operators: JSON.stringify(["=", "\\times", "(", "+", ")"]),
      chunks: [
        {
          chunk: "JB",
          display_name: "JB",
          seven_vector: JSON.stringify({
            Role: "Test statistic result",
            Domain: "ℝ≥0",
            Binding: "JB is the computed test statistic",
            Variance: "Varies with sample characteristics",
            Geometric: "Distance from normality",
            Invariant: "Always non-negative",
            Limits: "JB→0 for perfect normality",
            narrative: "The Jarque-Bera statistic quantifies the overall departure from normality by combining information about both skewness and kurtosis. A value of zero indicates perfect normality, while larger values suggest increasing evidence against the normality assumption."
          })
        },
        {
          chunk: "\\frac{n}{6}",
          display_name: "n/6",
          seven_vector: JSON.stringify({
            Role: "Sample size scaling factor",
            Domain: "ℝ⁺ → ℝ⁺",
            Binding: "n is sample size",
            Variance: "Linear in sample size",
            Geometric: "Scaling coefficient",
            Invariant: "Always positive",
            Limits: "n→∞ increases sensitivity",
            narrative: "The scaling factor n/6 adjusts the test statistic based on sample size, ensuring that larger samples provide more statistical power to detect deviations from normality. This factor is derived from the asymptotic distribution theory of sample moments and ensures the test statistic follows a chi-squared distribution under the null hypothesis."
          })
        },
        {
          chunk: "S^2",
          display_name: "S²",
          seven_vector: JSON.stringify({
            Role: "Squared skewness component",
            Domain: "ℝ → ℝ≥0",
            Binding: "S is sample skewness",
            Variance: "Quadratic in skewness",
            Geometric: "Asymmetry penalty",
            Invariant: "Always non-negative",
            Limits: "S²→0 for symmetric data",
            narrative: "The squared skewness term penalizes departures from symmetry in the data distribution. Skewness measures the asymmetry of the distribution - positive skewness indicates a longer right tail, while negative skewness indicates a longer left tail. Squaring ensures that both positive and negative skewness contribute equally to the test statistic."
          })
        },
        {
          chunk: "\\frac{(K-3)^2}{4}",
          display_name: "(K-3)²/4",
          seven_vector: JSON.stringify({
            Role: "Excess kurtosis component",
            Domain: "ℝ → ℝ≥0",
            Binding: "K is sample kurtosis",
            Variance: "Quadratic in excess kurtosis",
            Geometric: "Tail heaviness penalty",
            Invariant: "Zero when K=3 (normal)",
            Limits: "(K-3)²→0 for normal kurtosis",
            narrative: "The excess kurtosis term measures how much the tail behavior of the data deviates from that of a normal distribution, which has kurtosis K=3. Values above 3 indicate heavy tails (leptokurtic), while values below 3 indicate light tails (platykurtic). The factor of 4 in the denominator provides appropriate weighting relative to the skewness term in the overall test statistic."
          })
        }
      ]
    }
  ];

  const insertFormula = db.prepare(`
    INSERT OR IGNORE INTO formulas (slug, formula_name, latex, category, full_formula_7vector, operators)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const insertChunk = db.prepare(`
    INSERT INTO formula_chunks (formula_id, chunk_order, chunk, display_name, seven_vector)
    VALUES (?, ?, ?, ?, ?)
  `);

  const getFormulaId = db.prepare('SELECT id FROM formulas WHERE slug = ?');

  for (const formula of staticFormulas) {
    const result = insertFormula.run(
      formula.slug,
      formula.formula_name,
      formula.latex,
      formula.category,
      formula.full_formula_7vector,
      formula.operators
    );

    if (result.changes > 0) {
      const formulaId = result.lastInsertRowid;
      formula.chunks.forEach((chunk, index) => {
        insertChunk.run(
          formulaId,
          index,
          chunk.chunk,
          chunk.display_name,
          chunk.seven_vector
        );
      });
    }
  }
};

// Initialize static formulas
insertStaticFormulas();

// Database operations
export const saveFormula = (formulaData: FormulaData): number => {
  const insertFormula = db.prepare(`
    INSERT INTO formulas (slug, formula_name, latex, category, full_formula_7vector, operators)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const insertChunk = db.prepare(`
    INSERT INTO formula_chunks (formula_id, chunk_order, chunk, display_name, seven_vector)
    VALUES (?, ?, ?, ?, ?)
  `);

  const result = insertFormula.run(
    formulaData.meta.slug,
    formulaData.meta.formula,
    formulaData.meta.latex,
    formulaData.meta.category,
    JSON.stringify(formulaData.fullFormula7Vector),
    JSON.stringify(formulaData.operators)
  );

  const formulaId = result.lastInsertRowid as number;

  formulaData.subFormulas.forEach((chunk, index) => {
    insertChunk.run(
      formulaId,
      index,
      chunk.chunk,
      chunk.displayName,
      JSON.stringify(chunk["7Vector"])
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
    fullFormula7Vector: JSON.parse(formula.full_formula_7vector),
    operators: JSON.parse(formula.operators),
    subFormulas: chunks.map(chunk => ({
      chunk: chunk.chunk,
      displayName: chunk.display_name,
      "7Vector": JSON.parse(chunk.seven_vector)
    }))
  };
};

export const getAllFormulas = (): Array<{slug: string, formula: string, category: string}> => {
  const getAll = db.prepare(`
    SELECT slug, formula_name as formula, category FROM formulas ORDER BY created_at DESC
  `);

  return getAll.all() as Array<{slug: string, formula: string, category: string}>;
};

export default db;