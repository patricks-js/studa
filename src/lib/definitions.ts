import type {
  decksTable,
  flashcardsTable,
  materialsTable,
  notebooksTable,
} from "@/db/schema";

export type Flashcard = typeof flashcardsTable.$inferSelect;

export type Material = typeof materialsTable.$inferSelect;

export type Deck = typeof decksTable.$inferSelect &
  Partial<{
    flashcards: Flashcard[];
  }>;

export type Notebook = typeof notebooksTable.$inferSelect &
  Partial<{
    materials: Material[];
  }>;
