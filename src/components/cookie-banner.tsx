"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "cookie-notice-dismissed";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    }
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4">
      <div className="mx-auto max-w-3xl bg-card border border-border rounded-xl shadow-lg px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-muted-foreground flex-1">
          🍪 Folosim doar cookie-uri <strong className="text-foreground">esențiale</strong> pentru
          autentificare și preferințe. Nu folosim trackeri sau cookie-uri publicitare.{" "}
          <Link href="/cookies" className="underline underline-offset-4 hover:text-foreground transition-colors">
            Detalii
          </Link>
        </p>
        <Button size="sm" onClick={dismiss} className="shrink-0">
          Am înțeles
        </Button>
      </div>
    </div>
  );
}
