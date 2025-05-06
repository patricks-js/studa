import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";

import { materialsTable } from "./materials";
import { usersTable } from "./users";

export const notebooksTable = pgTable("notebooks", (t) => ({
  id: t.uuid().defaultRandom().primaryKey().notNull(),
  userId: t
    .text("user_id")
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
  title: t.text().notNull(),
  description: t.text(),
  createdAt: t.timestamp("created_at").defaultNow().notNull(),
  updatedAt: t.timestamp("updated_at").defaultNow().notNull(),
  lastVisited: t.timestamp("last_visited").defaultNow().notNull(),
}));

export const notebookInsertSchema = createInsertSchema(notebooksTable);
export const notebookUpdateSchema = createUpdateSchema(notebooksTable);

export const notebooksRelations = relations(
  notebooksTable,
  ({ one, many }) => ({
    user: one(usersTable, {
      fields: [notebooksTable.userId],
      references: [usersTable.id],
    }),
    materials: many(materialsTable),
  }),
);
