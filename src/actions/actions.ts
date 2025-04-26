"use server";

import { generateObject } from "ai";
import { and, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

import { mistral } from "@/lib/ai";
import { env } from "@/lib/env";
import { parseFlashcards } from "@/lib/utils";
import { db } from "../db";
import {
  flashcardsTable,
  modulesTable,
  resourceInsertSchema,
  resourcesTable,
} from "../db/schema";
import { auth } from "../lib/auth";
import { authActionClient } from "../lib/safe-action";
import { flashcardGeneratorPrompt } from "./prompts";
import { createModuleSchema, getModuleParamsSchema } from "./schema";

export async function getAllModulesAction() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const modules = await db
    .select({
      id: modulesTable.id,
      title: modulesTable.title,
      description: modulesTable.description,
      createdAt: modulesTable.createdAt,
      lastVisited: modulesTable.lastVisited,
    })
    .from(modulesTable)
    .orderBy(desc(modulesTable.createdAt))
    .where(eq(modulesTable.userId, session.user.id));

  return modules;
}

export const createResourceAction = authActionClient
  .schema(resourceInsertSchema)
  .action(async ({ ctx: { userId }, parsedInput }) => {
    const [moduleFound] = await db
      .select({ id: modulesTable.id })
      .from(modulesTable)
      .where(
        and(
          eq(modulesTable.userId, userId),
          eq(modulesTable.id, parsedInput.moduleId),
        ),
      );

    if (!moduleFound) {
      throw new Error("Module not found");
    }

    const [result] = await db
      .insert(resourcesTable)
      .values({
        moduleId: moduleFound.id,
        title: parsedInput.title,
        content: parsedInput.content,
        type: parsedInput.type,
      })
      .returning({
        id: resourcesTable.id,
      });

    if (!result) {
      throw new Error("Failed to create resource");
    }

    revalidatePath("/(app)", "layout");

    return result;
  });

export async function getAllResourcesByModuleIdAction(moduleId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const resources = await db
    .select({
      id: resourcesTable.id,
      title: resourcesTable.title,
      type: resourcesTable.type,
      content: resourcesTable.content,
      createdAt: resourcesTable.createdAt,
    })
    .from(resourcesTable)
    .where(eq(resourcesTable.moduleId, moduleId));

  return resources;
}

export const createModuleAction = authActionClient
  .schema(createModuleSchema)
  .action(async ({ ctx: { userId }, parsedInput }) => {
    const [result] = await db
      .insert(modulesTable)
      .values({
        userId,
        ...parsedInput,
      })
      .returning({
        id: modulesTable.id,
      });

    if (!result) {
      throw new Error("Failed to create module");
    }

    revalidatePath("/(app)", "layout");

    return result;
  });

export async function getModuleByIdAction(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const [moduleFound] = await db
    .select({
      id: modulesTable.id,
      title: modulesTable.title,
      description: modulesTable.description,
      createdAt: modulesTable.createdAt,
    })
    .from(modulesTable)
    .where(
      and(eq(modulesTable.userId, session.user.id), eq(modulesTable.id, id)),
    );

  if (!moduleFound) {
    throw new Error("Module not found");
  }

  return moduleFound;
}

export const deleteModuleAction = authActionClient
  .schema(getModuleParamsSchema)
  .action(async ({ ctx: { userId }, parsedInput }) => {
    await db
      .delete(modulesTable)
      .where(
        and(
          eq(modulesTable.userId, userId),
          eq(modulesTable.id, parsedInput.moduleId),
        ),
      );

    revalidatePath("/modules", "page");
  });

export async function getFlashcardDecksByModuleAction(moduleId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const flashcards = await db
    .select({
      id: flashcardsTable.id,
      question: flashcardsTable.question,
      answer: flashcardsTable.answer,
      createdAt: flashcardsTable.createdAt,
      createdByAI: flashcardsTable.createdByAI,
    })
    .from(flashcardsTable)
    .orderBy(desc(flashcardsTable.createdAt))
    .where(eq(flashcardsTable.moduleId, moduleId));

  const decks: Record<string, typeof flashcards> = {};

  for (const flashcard of flashcards) {
    const dateKey = flashcard.createdAt.toISOString();

    if (!decks[dateKey]) {
      decks[dateKey] = [];
    }

    decks[dateKey].push(flashcard);
  }

  console.log(decks);

  return decks;
}

export const generateFlashcardsAction = authActionClient
  .schema(z.object({ moduleId: z.string() }))
  .action(async ({ parsedInput }) => {
    const resources = await db
      .select({
        content: resourcesTable.content,
      })
      .from(resourcesTable)
      .where(eq(resourcesTable.moduleId, parsedInput.moduleId));

    if (resources.length === 0) {
      throw new Error("No resources found");
    }

    const fullContent = resources
      .map((r) => r.content ?? "")
      .filter(Boolean)
      .join("\n\n");

    const maxWords = 8000;
    const limitedContent = fullContent
      .split(/\s+/)
      .slice(0, maxWords)
      .join(" ");

    const { object: flashcards, usage } = await generateObject({
      model: mistral(env.AI_MODEL),
      output: "no-schema",
      system: flashcardGeneratorPrompt,
      prompt: limitedContent,
    });

    const parsedFlashcards = parseFlashcards(flashcards);

    await db.insert(flashcardsTable).values(
      parsedFlashcards.map((f) => ({
        createdByAI: true,
        moduleId: parsedInput.moduleId,
        question: f.question,
        answer: f.answer,
      })),
    );

    revalidatePath("/(app)", "layout");

    return {
      flashcards,
      tokens: {
        prompt: usage.promptTokens,
        completion: usage.completionTokens,
        total: usage.totalTokens,
      },
    };
  });
