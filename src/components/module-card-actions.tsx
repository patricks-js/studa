"use client";

import { useAction } from "next-safe-action/hooks";
import { useState } from "react";

import { deleteModuleAction } from "@/actions/actions";
import { toast } from "sonner";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { CardAction } from "./ui/card";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Props = {
  moduleId: string;
};

export function ModuleCardActions({ moduleId }: Props) {
  const [open, setOpen] = useState(false);

  const { execute: deleteModule } = useAction(deleteModuleAction, {
    // onExecute() { // TODO: fix infinite loading
    //   toast.loading("Excluindo módulo...");
    // },
    onSuccess() {
      toast.success("Módulo excluído com sucesso.");
    },
    onError() {
      toast.error("Ocorreu um erro ao excluir o módulo.");
    },
  });

  return (
    <CardAction>
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
            >
              <Icons.dots />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Icons.edit className="size-4" />
              Editar
            </DropdownMenuItem>
            <DialogTrigger asChild>
              <DropdownMenuItem variant="destructive">
                <Icons.trash className="size-4" />
                Excluir
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir módulo</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o módulo?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => {
                deleteModule({ moduleId });
                setOpen((prev) => !prev);
              }}
            >
              Excluir
            </Button>
            <Button
              variant="outline"
              onClick={() => setOpen((prev) => !prev)}
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CardAction>
  );
}
