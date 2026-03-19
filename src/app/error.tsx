"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: Readonly<ErrorProps>) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="text-5xl mb-4">⚠️</div>
      <h1 className="text-2xl font-bold tracking-tight mb-2">
        A apărut o eroare
      </h1>
      <p className="text-muted-foreground max-w-md mb-6">
        Ceva nu a mers cum trebuie. Poți încerca din nou sau reveni la pagina principală.
      </p>
      <div className="flex gap-3">
        <Button onClick={reset}>Încearcă din nou</Button>
        <Button variant="outline" onClick={() => (window.location.href = "/dashboard")}>
          Dashboard
        </Button>
      </div>
      {error.digest && (
        <p className="mt-6 text-xs text-muted-foreground">
          Cod eroare: {error.digest}
        </p>
      )}
    </div>
  );
}
