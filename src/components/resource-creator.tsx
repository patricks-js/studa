"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createResourceAction } from "@/actions/actions";
import { Icons } from "./icons";
import { ResourceTextEntry } from "./resource-text-entry";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const schema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  moduleId: string;
};

export function ResourceCreator({ moduleId }: Props) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  async function onSubmit(values: FormValues) {
    await createResourceAction({
      moduleId,
      type: "text",
      title: values.title,
      content: values.content,
    });

    form.reset();
    setIsOpen(false);
  }

  return (
    <Dialog
      modal
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button>
          <Icons.add />
          Adicionar recurso
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo recurso</DialogTitle>

          <DialogDescription>
            Você pode colar texto diretamente ou fazer upload de um arquivo{" "}
            <em>.txt</em> ou <em>.md</em>.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id={`${id}-form`}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Resumo de História"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Conteúdo{" "}
                    <span className="text-muted-foreground text-sm tracking-tight">
                      (opcional)
                    </span>
                  </FormLabel>

                  <FormControl>
                    <ResourceTextEntry
                      placeholder="Cole aqui um texto de até 2000 palavras..."
                      className="min-h-[160px]"
                      field={field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => {
              form.reset();
              setIsOpen(false);
            }}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            form={`${id}-form`}
          >
            Adicionar recurso
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
