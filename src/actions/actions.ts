"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { db } from "../db";
import { modulesTable } from "../db/schema";
import { auth } from "../lib/auth";
import { authActionClient } from "../lib/safe-action";
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
    })
    .from(modulesTable)
    .where(eq(modulesTable.userId, session.user.id));

  return modules;
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

    revalidatePath("/modules", "page");

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
