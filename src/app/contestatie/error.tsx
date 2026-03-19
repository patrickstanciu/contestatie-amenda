"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ContestatieError({ error, reset }: Readonly<ErrorProps>) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="text-5xl mb-4">📄</div>
      <h1 className="text-2xl font-bold tracking-tight mb-2">
        Eroare la încărcarea contestației
      </h1>
      <p className="text-muted-foreground max-w-md mb-6">
        Nu am putut încărca contestația. Documentul poate fi indisponibil sau a apărut o eroare temporară.
      </p>
      <div className="flex gap-3">
        <Button onClick={reset}>Încearcă din nou</Button>
        <Button variant="outline" render={<Link href="/dashboard" />}>
          Înapoi la Dashboard
        </Button>
      </div>
    </div>
  );
}
