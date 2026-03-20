import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Verifică email-ul | ContestațieAI",
};

export default function VerifyRequestPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center space-y-6">

        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-4xl">
            📧
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Verifică email-ul</h1>
          <p className="text-muted-foreground">
            Ți-am trimis un link de autentificare. Deschide email-ul și apasă pe link pentru a te conecta.
          </p>
        </div>

        {/* Steps */}
        <div className="rounded-xl border border-border bg-muted/30 p-5 text-left space-y-3">
          {[
            { step: "1", text: "Deschide aplicația de email" },
            { step: "2", text: 'Caută un email de la ContestațieAI (poate fi în Spam)' },
            { step: "3", text: "Apasă pe butonul \"Autentifică-te\"" },
          ].map(({ step, text }) => (
            <div key={step} className="flex items-start gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                {step}
              </span>
              <p className="text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-xs text-muted-foreground">
          Link-ul este valabil <strong className="text-foreground">24 de ore</strong> și poate fi folosit o singură dată.
        </p>

        {/* Back to login */}
        <Button render={<Link href="/login" />} variant="outline" className="w-full">
          ← Înapoi la autentificare
        </Button>

      </div>
    </div>
  );
}
