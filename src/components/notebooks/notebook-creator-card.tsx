"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { createNotebookAction } from "@/actions/notebooks/create-notebook-action";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { notebookInsertSchema } from "@/db/schema";

type FormValues = z.infer<typeof notebookInsertSchema>;

export function NotebookCreatorCard() {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(notebookInsertSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function handleCloseModal() {
    setIsOpen(false);
  }

  async function onSubmit(values: FormValues) {
    await createNotebookAction(values);
    form.reset();
  }

  return (
    <Dialog
      modal
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <div className="flex h-full min-h-40 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed p-6 transition-colors duration-200 hover:border-secondary hover:bg-secondary/30">
          <p className="inline-flex items-center gap-1 font-medium text-muted-foreground">
            <Icons.add className="size-5 text-muted-foreground" />
            Adicionar novo notebook
          </p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo módulo</DialogTitle>
          <DialogDescription>
            Crie um novo módulo para o seu perfil.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id={`${id}-module-form`}
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
                      placeholder="Título do módulo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Descrição do módulo"
                      {...field}
                      value={field.value ?? ""}
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
            onClick={handleCloseModal}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            form={`${id}-module-form`}
            onClick={handleCloseModal}
          >
            Criar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
