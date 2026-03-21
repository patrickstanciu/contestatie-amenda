"use client";

import { useActionState } from "react";
import { useEffect, useRef } from "react";
import { trimiteContact, type ContactState } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" size="lg" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin mr-2" />
          Se trimite...
        </>
      ) : (
        "Trimite mesajul"
      )}
    </Button>
  );
}

const initial: ContactState = {};

export function ContactForm() {
  const [state, action] = useActionState(trimiteContact, initial);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state.success]);

  return (
    <form ref={formRef} action={action} className="space-y-5">
      {state.success && (
        <div className="flex items-center gap-2 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 px-4 py-3 text-sm text-green-700 dark:text-green-400">
          <CheckCircle2 className="size-4 shrink-0" />
          Mesajul a fost trimis! Îți răspundem în cel mult 24 de ore.
        </div>
      )}
      {state.error && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="nume">Nume</Label>
          <Input id="nume" name="nume" placeholder="Ion Popescu" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="tu@exemplu.ro"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="mesaj">Mesaj</Label>
        <Textarea
          id="mesaj"
          name="mesaj"
          placeholder="Cum te putem ajuta?"
          rows={5}
          required
        />
      </div>

      <SubmitButton />
    </form>
  );
}
