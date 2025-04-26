"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Flashcard = {
  id: string;
  question: string;
  answer: string;
};

type FlashcardViewerProps = {
  flashcards: Flashcard[];
};

export function FlashcardViewer({ flashcards }: FlashcardViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  const currentCard = flashcards[currentIndex];

  const handleNext = () => {
    setDirection(1);
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setDirection(-1);
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev === 0 ? flashcards.length - 1 : prev - 1));
  };

  if (!flashcards.length) {
    return <p>Nenhum flashcard disponível.</p>;
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="perspective-[1000px] relative h-[240px] w-full max-w-md overflow-hidden">
        <AnimatePresence
          mode="wait"
          custom={direction}
        >
          <motion.div
            key={`${currentCard.id}-${showAnswer}`}
            custom={direction}
            initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="backface-hidden absolute inset-0 flex flex-col items-center justify-center rounded-2xl border bg-secondary p-6 shadow-md"
          >
            <h2 className="mb-2 text-center text-muted-foreground text-sm">
              Flashcard {currentIndex + 1} de {flashcards.length}
            </h2>

            <div className="text-center font-medium text-lg">
              {showAnswer ? currentCard.answer : currentCard.question}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-4">
        {!showAnswer ? (
          <Button onClick={() => setShowAnswer(true)}>Mostrar resposta</Button>
        ) : (
          <>
            <Button
              onClick={handlePrevious}
              variant="secondary"
            >
              Anterior
            </Button>
            <Button onClick={handleNext}>Próximo</Button>
          </>
        )}
      </div>
    </div>
  );
}
