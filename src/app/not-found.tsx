import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pagina nu a fost găsită | ContestațieAI",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center space-y-6">
      <div className="space-y-3">
        <p className="text-8xl font-extrabold text-primary/20 tracking-tighter select-none">404</p>
        <div className="text-4xl">⚖️</div>
        <h1 className="text-2xl font-bold tracking-tight">Pagina nu a fost găsită</h1>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Pagina pe care o cauți nu există sau a fost mutată. Verifică adresa URL sau întoarce-te acasă.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button render={<Link href="/" />} size="lg">
          Înapoi la pagina principală
        </Button>
        <Button render={<Link href="/dashboard" />} size="lg" variant="outline">
          Dashboard
        </Button>
      </div>
    </div>
  );
}
