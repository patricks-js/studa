"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { processTextAndGenerateFlashcardsAction } from "@/actions/flashcards/create-deck-action";
import { Icons } from "@/components/icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type Props = {
  notebookId: string;
};

const formSchema = z.object({
  content: z.string().min(1).max(2000),
});

type FormValues = z.infer<typeof formSchema>;

export function AddMaterialForm({ notebookId }: Props) {
  const {
    execute: createMaterialFromText,
    isPending: isLoading,
    result,
  } = useAction(processTextAndGenerateFlashcardsAction);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  function onSubmit(values: FormValues) {
    createMaterialFromText({
      notebookId,
      title: "Flashcards gerados",
      rawContent: values.content.trim(),
    });

    if (!result.data?.success && result.data?.error) {
      toast.error(result.data?.error || "Ocorreu um erro ao gerar flashcards.");
      return;
    }

    if (result.data?.success) {
      toast.success("Flashcards gerados com sucesso!");
    }

    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Cole aqui um resumo, notas de aula, artigo, etc. para gerar flashcards."
                  disabled={isLoading}
                  className="min-h-[200px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end gap-4">
          <HoverBorderGradient
            containerClassName="[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 rounded-md font-medium text-sm"
            as="button"
            className="flex items-center gap-2 bg-white text-black dark:bg-black dark:text-white"
          >
            {isLoading ? (
              // Opcional: Ícone de carregamento
              <Icons.loader className="mr-2 size-4 animate-spin" />
            ) : (
              <Icons.stars />
            )}
            {isLoading ? "Gerando..." : "Gerar Flashcards"}
          </HoverBorderGradient>
        </div>
      </form>
    </Form>
  );
}
