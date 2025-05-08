"use server";

import { generateObject } from "ai";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import {
  deckInsertSchema,
  decksTable,
  flashcardsTable,
  materialInsertSchema,
  notebooksTable,
} from "@/db/schema";
import { mistral } from "@/lib/ai";
import { env } from "@/lib/env";
import { authActionClient } from "@/lib/safe-action";
import { parseFlashcards } from "@/lib/utils";
import { createMaterialFromTextAction } from "../materials/create-material-action";
import { flashcardGeneratorPrompt } from "../prompts";

const createFromTextSchema = materialInsertSchema.pick({
  notebookId: true,
  title: true,
  rawContent: true,
});

export const createDeckAction = authActionClient
  .schema(deckInsertSchema)
  .action(async ({ ctx: { userId }, parsedInput }) => {
    const [notebookFound] = await db
      .select({ id: notebooksTable.id })
      .from(notebooksTable)
      .where(eq(notebooksTable.userId, userId));

    if (!notebookFound) {
      throw new Error("Notebook not found");
    }

    const [result] = await db
      .insert(decksTable)
      .values({
        notebookId: notebookFound.id,
        title: parsedInput.title,
        description: parsedInput.description,
        materialId: parsedInput.materialId,
        createdByAI: parsedInput.createdByAI,
      })
      .returning({
        id: decksTable.id,
      });

    if (!result || !result.id) {
      return {
        success: false,
        error: "Failed to create deck",
      };
    }

    return {
      success: true,
      data: result,
    };
  });

export const processTextAndGenerateFlashcardsAction = authActionClient
  .schema(createFromTextSchema)
  .action(async ({ ctx: { userId }, parsedInput }) => {
    const createMaterialResult = await createMaterialFromTextAction({
      notebookId: parsedInput.notebookId,
      title: "Flashcards gerados",
      rawContent: parsedInput.rawContent,
    });

    if (!createMaterialResult?.data?.success) {
      return {
        success: false,
        error: "Failed to create flashcards: 1",
      };
    }

    const { object: flashcards, usage } = await generateObject({
      model: mistral(env.AI_MODEL),
      output: "no-schema",
      system: flashcardGeneratorPrompt,
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      prompt: createMaterialResult.data.data?.processedTextContent!,
    });

    const parsedFlashcards = parseFlashcards(flashcards);

    const createDeckResult = await createDeckAction({
      title: "New Deck",
      notebookId: parsedInput.notebookId,
      createdByAI: true,
      materialId: createMaterialResult.data.data?.id,
      description: "Created by AI",
    });

    if (!createDeckResult?.data?.success) {
      return {
        success: false,
        error: "Failed to create flashcards: 2",
      };
    }

    const createdFlashcards = await db.insert(flashcardsTable).values(
      parsedFlashcards.map((f) => ({
        question: f.question,
        answer: f.answer,
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        deckId: createDeckResult?.data?.data?.id!,
      })),
    );

    if (!createdFlashcards || createdFlashcards.length <= 0) {
      return {
        success: false,
        error: "Failed to create flashcards: 3",
      };
    }

    revalidatePath("/(app)", "layout");

    return {
      success: true,
    };
  });
