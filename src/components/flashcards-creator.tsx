"use client";

import { generateFlashcardsAction } from "@/actions/actions";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { Icons } from "./icons";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

type Props = {
  moduleId: string;
};

export function FlashcardsCreator({ moduleId }: Props) {
  const { executeAsync, hasErrored, hasSucceeded, isPending } = useAction(
    generateFlashcardsAction,
    {},
  );

  if (hasErrored) {
    toast.error("Algo deu errado ao gerar os flashcards");
  }

  return (
    <HoverBorderGradient
      containerClassName="[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 rounded-md font-medium text-sm"
      as="button"
      onClick={async () => {
        await executeAsync({ moduleId });
      }}
      className="flex items-center gap-2 bg-white text-black dark:bg-black dark:text-white"
    >
      <Icons.stars />
      Gerar flashcards
    </HoverBorderGradient>
  );
}
