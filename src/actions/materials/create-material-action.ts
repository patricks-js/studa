"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/db";
import {
  materialInsertSchema,
  materialsTable,
  notebooksTable,
} from "@/db/schema";
import { type ActionResult, authActionClient } from "@/lib/safe-action";
import { and, eq } from "drizzle-orm";

const createFromTextSchema = materialInsertSchema.pick({
  notebookId: true,
  title: true,
  rawContent: true,
});

export const createMaterialFromTextAction = authActionClient
  .schema(createFromTextSchema)
  .action(
    async ({
      ctx: { userId },
      parsedInput,
    }): Promise<
      ActionResult<{ id: string; processedTextContent: string | null }>
    > => {
      const [notebookFound] = await db
        .select({ id: notebooksTable.id })
        .from(notebooksTable)
        .where(
          and(
            eq(notebooksTable.userId, userId),
            eq(notebooksTable.id, parsedInput.notebookId),
          ),
        );

      if (!notebookFound) {
        throw new Error("Notebook not found");
      }

      const [result] = await db
        .insert(materialsTable)
        .values({
          notebookId: notebookFound.id,
          title: parsedInput.title,
          type: "text",
          rawContent: parsedInput.rawContent,
          processedTextContent: parsedInput.rawContent,
        })
        .returning({
          id: materialsTable.id,
          processedTextContent: materialsTable.processedTextContent,
        });

      if (!result || !result.id) {
        return {
          success: false,
          error: "Failed to create notebook",
        };
      }

      revalidatePath("/(sidebar)", "layout");

      return {
        success: true,
        data: result,
      };
    },
  );
