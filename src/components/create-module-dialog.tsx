"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { createNotebookAction } from "@/actions/notebooks/create-notebook-action";
import { createNotebookSchema } from "@/actions/schema";
import { useId } from "react";
import { Icons } from "./icons";
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

type FormValues = z.infer<typeof createNotebookSchema>;

export function CreateModuleDialog() {
  const id = useId();
  const form = useForm<FormValues>({
    resolver: zodResolver(createNotebookSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onSubmit(values: FormValues) {
    await createNotebookAction(values);
    form.reset();
  }

  return (
    <Dialog modal>
      <DialogTrigger asChild>
        <Button>
          <Icons.add />
          Novo modulo
        </Button>
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button variant="destructive">Cancelar</Button>
          <Button
            type="submit"
            form={`${id}-module-form`}
          >
            Criar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
