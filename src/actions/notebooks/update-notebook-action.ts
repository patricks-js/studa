"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/db";
import { notebooksTable, notebookUpdateSchema } from "@/db/schema";
import type { Notebook } from "@/lib/definitions";
import { type ActionResult, authActionClient } from "@/lib/safe-action";

const schema = notebookUpdateSchema.extend({
  notebookId: z.string().uuid(),
});

export const updateNotebookAction = authActionClient
  .schema(schema)
  .action(
    async ({
      ctx: { userId },
      parsedInput,
    }): Promise<ActionResult<Notebook>> => {
      const [notebook] = await db
        .update(notebooksTable)
        .set({
          title: parsedInput.title,
          description: parsedInput.description,
          updatedAt: new Date(),
          lastVisited: new Date(),
        })
        .where(
          and(
            eq(notebooksTable.userId, userId),
            eq(notebooksTable.id, parsedInput.notebookId),
          ),
        )
        .returning();

      if (!notebook) {
        return {
          success: false,
          error: "Notebook not found",
        };
      }

      revalidatePath("/(sidebar)", "layout");

      return {
        success: true,
        data: notebook,
      };
    },
  );
