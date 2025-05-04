import { pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { notebooksTable } from "./notebooks";

export const decksTable = pgTable("decks", (t) => ({
  id: t.uuid().defaultRandom().primaryKey().notNull(),
  notebookId: t
    .uuid("notebook_id")
    .references(() => notebooksTable.id, { onDelete: "set null" })
    .notNull(),
  title: t.text().notNull(),
  description: t.text(),
  createdByAI: t.boolean("created_by_ai").default(false).notNull(),
  createdAt: t.timestamp("created_at").defaultNow().notNull(),
}));

export const deckInsertSchema = createInsertSchema(decksTable);

export const flashcardsTable = pgTable("flashcards", (t) => ({
  id: t.uuid().defaultRandom().primaryKey().notNull(),
  question: t.text().notNull(),
  answer: t.text().notNull(),
  deckId: t
    .uuid("deck_id")
    .references(() => decksTable.id, { onDelete: "cascade" })
    .notNull(),
}));

export const flashcardInsertSchema = createInsertSchema(flashcardsTable);
