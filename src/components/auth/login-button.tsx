"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Github, LogOut } from "lucide-react";

export function LoginButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Button variant="ghost" size="sm" disabled>
        <span className="h-4 w-4 animate-pulse rounded-full bg-muted-foreground/30" />
      </Button>
    );
  }

  if (session) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => signOut()}
        className="gap-2"
      >
        <LogOut className="h-4 w-4" />
        Salir
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => signIn("github")}
      className="gap-2"
    >
      <Github className="h-4 w-4" />
      Iniciar sesión
    </Button>
  );
}
