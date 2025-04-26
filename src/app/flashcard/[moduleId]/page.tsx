import { FlashcardViewer } from "@/components/flashcard-viewer";
import { db } from "@/db";
import { flashcardsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

type Params = {
  params: Promise<{ moduleId: string }>;
};

export default async function FlashcardsPage({ params }: Params) {
  const { moduleId } = await params;

  const flashcards = await db
    .select()
    .from(flashcardsTable)
    .where(eq(flashcardsTable.moduleId, moduleId));

  return (
    <div className="py-10">
      <h1 className="mb-8 text-center font-bold text-3xl">Seus Flashcards</h1>

      <FlashcardViewer flashcards={flashcards} />
    </div>
  );
}
