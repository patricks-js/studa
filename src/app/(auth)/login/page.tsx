import Image from "next/image";
import Link from "next/link";

import { LoginForm } from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <Card className="w-full max-w-md pb-4">
      <CardHeader className="gap-2 text-center">
        <Image
          src="/logo.svg"
          alt="Logo do Studa.ai"
          width={48}
          height={48}
          className="mx-auto mb-4"
        />
        <CardTitle>Entre no Studa.ai</CardTitle>
        <CardDescription>
          Bem-vindo de volta! Entre na sua conta para continuar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="border-t pt-4!">
        <p className="mx-auto text-muted-foreground text-sm">
          Ainda não tem uma conta?{" "}
          <Button
            variant="link"
            asChild
            className="p-0.5"
          >
            <Link href="/signup">Criar conta</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
