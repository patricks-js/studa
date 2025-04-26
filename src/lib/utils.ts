import type { JSONValue } from "ai";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const flashcardSchema = z.object({
  question: z.string().min(5).max(500),
  answer: z.string().min(1).max(1000),
});

const flashcardsSchema = z.array(flashcardSchema);

export function parseFlashcards(data: JSONValue) {
  const flashcards = flashcardsSchema.safeParse(data);

  if (!flashcards.success) {
    throw new Error("Invalid flashcards format");
  }

  return flashcards.data;
}
