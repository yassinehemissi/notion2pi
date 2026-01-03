-- CreateTable
CREATE TABLE "formulas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "formula_name" TEXT NOT NULL,
    "latex" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "fullFormulaSevenVector" TEXT NOT NULL,
    "operators" TEXT NOT NULL,
    "baby_definition" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "formula_chunks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "formula_id" INTEGER NOT NULL,
    "chunk_order" INTEGER NOT NULL,
    "chunk" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "seven_vector" TEXT NOT NULL,
    "baby_definition" TEXT,
    CONSTRAINT "formula_chunks_formula_id_fkey" FOREIGN KEY ("formula_id") REFERENCES "formulas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "formulas_slug_key" ON "formulas"("slug");
