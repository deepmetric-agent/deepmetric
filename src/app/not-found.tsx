import Link from "next/link";
import { Activity } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <Activity className="mb-6 h-16 w-16 text-primary/30" />
      <h1 className="mb-2 text-6xl font-black">404</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        La página que buscas no existe o ha sido movida.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
