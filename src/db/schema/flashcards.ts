import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";

import { materialsTable } from "./materials";
import { notebooksTable } from "./notebooks";

export const decksTable = pgTable("decks", (t) => ({
  id: t.uuid().defaultRandom().primaryKey().notNull(),
  notebookId: t
    .uuid("notebook_id")
    .references(() => notebooksTable.id, { onDelete: "cascade" })
    .notNull(),
  materialId: t
    .uuid("material_id")
    .references(() => materialsTable.id, { onDelete: "cascade" }),
  title: t.text().notNull(),
  description: t.text(),
  createdByAI: t.boolean("created_by_ai").default(false).notNull(),
  createdAt: t.timestamp("created_at").defaultNow().notNull(),
}));

export const flashcardsTable = pgTable("flashcards", (t) => ({
  id: t.uuid().defaultRandom().primaryKey().notNull(),
  deckId: t
    .uuid("deck_id")
    .references(() => decksTable.id, { onDelete: "cascade" })
    .notNull(),
  question: t.text().notNull(),
  answer: t.text().notNull(),
  createdAt: t.timestamp("created_at").defaultNow().notNull(),
}));

export const deckInsertSchema = createInsertSchema(decksTable);
export const deckUpdateSchema = createUpdateSchema(decksTable);

export const flashcardInsertSchema = createInsertSchema(flashcardsTable);

export const decksRelations = relations(decksTable, ({ one, many }) => ({
  notebook: one(notebooksTable, {
    fields: [decksTable.notebookId],
    references: [notebooksTable.id],
  }),
  flashcards: many(flashcardsTable),
}));

export const flashcardsRelations = relations(flashcardsTable, ({ one }) => ({
  deck: one(decksTable, {
    fields: [flashcardsTable.deckId],
    references: [decksTable.id],
  }),
}));
