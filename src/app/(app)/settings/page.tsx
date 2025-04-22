"use client";

import { AvatarImageUpload } from "@/components/avatar-image-upload";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export default function SettingsPage() {
  const { data: session } = authClient.useSession();

  return (
    <main className="mx-auto max-w-2xl space-y-6 pb-14">
      {/* Avatar */}
      <Card className="grid auto-rows-min grid-cols-2 overflow-hidden pb-0">
        <CardHeader>
          <CardTitle>Avatar</CardTitle>
          <CardDescription>
            Click on the avatar to upload a custom one from your files.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <AvatarImageUpload currentImage={session?.user.image} />
        </CardContent>

        <CardFooter className="col-span-2 row-start-2 border-t bg-muted py-6!">
          <p className="text-muted-foreground text-sm">
            Um avatar é opcional, mas fortemente recomendado.
          </p>
        </CardFooter>
      </Card>

      {/* Nome */}
      <Card className="overflow-hidden pb-0">
        <CardHeader>
          <CardTitle>Nome</CardTitle>
          <CardDescription>
            Por favor, insira seu nome completo ou nome de exibição.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2">
          <Input
            id="name"
            value={session?.user.name}
            maxLength={32}
          />
        </CardContent>

        <CardFooter className="justify-between border-t bg-muted py-4!">
          <p className="text-muted-foreground text-sm">
            Por favor, use no máximo 32 caracteres.
          </p>
          <Button>Salvar</Button>
        </CardFooter>
      </Card>

      {/* Email */}
      <Card className="overflow-hidden pb-0">
        <CardHeader>
          <CardTitle>Email</CardTitle>
          <CardDescription>
            Insira o endereço de e-mail que deseja usar para login.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2">
          <Input
            id="email"
            value={session?.user.email}
            type="email"
          />
        </CardContent>

        <CardFooter className="justify-between border-t bg-muted py-4!">
          <p className="text-muted-foreground text-sm">
            Por favor, use um endereço de e-mail válido.
          </p>
          <Button>Salvar</Button>
        </CardFooter>
      </Card>

      {/* Sessões */}
      <Card>
        <CardHeader>
          <CardTitle>Sessões</CardTitle>
          <CardDescription>
            Gerencie suas sessões ativas e revogue o acesso.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex items-center justify-between">
          <div className="flex w-full items-center justify-between gap-4 rounded-2xl border bg-card px-4 py-3 text-card-foreground shadow-sm">
            <span className="inline-flex items-center gap-4 font-medium">
              <Icons.desktop className="size-6" />
              Sessão atual
            </span>
            <Button variant="outline">Sair</Button>
          </div>
        </CardContent>
      </Card>

      {/* Excluir Conta */}
      <Card className="overflow-hidden border-destructive/30 pb-0">
        <CardHeader>
          <CardTitle>Excluir Conta</CardTitle>
          <CardDescription>
            Remova permanentemente sua conta e todos os seus dados. Essa ação
            não pode ser desfeita.
          </CardDescription>
        </CardHeader>

        <CardFooter className="justify-end border-destructive/30 border-t bg-destructive/10 py-4!">
          <Button variant="destructive">Excluir Conta</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
