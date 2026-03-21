"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "cookie-consent";

type ConsentValue = "granted" | "denied";

function updateGtagConsent(value: ConsentValue) {
  if (typeof window === "undefined" || !("gtag" in window)) return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).gtag("consent", "update", {
    analytics_storage: value,
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  });
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      setTimeout(() => setVisible(true), 0);
    } else {
      updateGtagConsent(saved as ConsentValue);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, "granted");
    updateGtagConsent("granted");
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem(STORAGE_KEY, "denied");
    updateGtagConsent("denied");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4">
      <div className="mx-auto max-w-3xl bg-card border border-border rounded-xl shadow-lg px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-muted-foreground flex-1">
          🍪 Folosim cookie-uri pentru autentificare și, dacă ești de acord, pentru statistici anonime care ne ajută să îmbunătățim site-ul.{" "}
          <Link href="/cookies" className="underline underline-offset-4 hover:text-foreground transition-colors">
            Detalii
          </Link>
        </p>
        <div className="flex gap-2 shrink-0">
          <Button size="sm" variant="outline" onClick={handleDecline}>
            Refuz
          </Button>
          <Button size="sm" onClick={handleAccept}>
            Acceptă
          </Button>
        </div>
      </div>
    </div>
  );
}
