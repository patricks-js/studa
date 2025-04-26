import { pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const usersTable = pgTable("users", (t) => ({
  id: t.text().primaryKey().notNull(),
  name: t.text().notNull(),
  email: t.text().unique().notNull(),
  emailVerified: t.boolean("email_verified").notNull(),
  image: t.text(),
  createdAt: t.timestamp("created_at").notNull(),
  updatedAt: t.timestamp("updated_at").notNull(),
}));

export const modulesTable = pgTable("modules", (t) => ({
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

export const resourcesTable = pgTable("resources", (t) => ({
  id: t.uuid().defaultRandom().primaryKey().notNull(),
  moduleId: t
    .uuid("module_id")
    .references(() => modulesTable.id, { onDelete: "cascade" })
    .notNull(),
  title: t.text().notNull(),
  type: t.text({ enum: ["text", "file", "link"] }).notNull(),
  content: t.text(),
  url: t.text(),
  createdAt: t.timestamp("created_at").defaultNow().notNull(),
}));

export const resourceInsertSchema = createInsertSchema(resourcesTable, {
  content: (schema) => schema.max(2001).optional(),
  url: (schema) => schema.url().optional(),
});

export const flashcardsTable = pgTable("flashcards", (t) => ({
  id: t.uuid().defaultRandom().primaryKey().notNull(),
  moduleId: t
    .uuid("module_id")
    .references(() => modulesTable.id, { onDelete: "cascade" })
    .notNull(),
  question: t.text().notNull(),
  answer: t.text().notNull(),
  createdByAI: t.boolean("created_by_ai").default(false).notNull(),
  createdAt: t.timestamp("created_at").defaultNow().notNull(),
}));

export const sessionsTable = pgTable("sessions", (t) => ({
  id: t.text().primaryKey(),
  expiresAt: t.timestamp("expires_at").notNull(),
  token: t.text().unique().notNull(),
  createdAt: t.timestamp("created_at").notNull(),
  updatedAt: t.timestamp("updated_at").notNull(),
  ipAddress: t.text("ip_address"),
  userAgent: t.text("user_agent"),
  userId: t
    .text("user_id")
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
}));

export const accountsTable = pgTable("accounts", (t) => ({
  id: t.text().primaryKey(),
  accountId: t.text("account_id").notNull(),
  providerId: t.text("provider_id").notNull(),
  userId: t
    .text("user_id")
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
  accessToken: t.text("access_token"),
  refreshToken: t.text("refresh_token"),
  idToken: t.text("id_token"),
  accessTokenExpiresAt: t.timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: t.timestamp("refresh_token_expires_at"),
  scope: t.text(),
  password: t.text(),
  createdAt: t.timestamp("created_at").notNull(),
  updatedAt: t.timestamp("updated_at").notNull(),
}));

export const verificationsTable = pgTable("verifications", (t) => ({
  id: t.text().primaryKey(),
  identifier: t.text().notNull(),
  value: t.text().notNull(),
  expiresAt: t.timestamp("expires_at").notNull(),
  createdAt: t.timestamp("created_at"),
  updatedAt: t.timestamp("updated_at"),
}));
