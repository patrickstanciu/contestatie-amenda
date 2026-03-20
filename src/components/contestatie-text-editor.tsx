"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateContestatieText } from "@/app/actions/update-contestatie";

interface ContestatieTextEditorProps {
  id: string;
  initialText: string;
}

export function ContestatieTextEditor({ id, initialText }: Readonly<ContestatieTextEditorProps>) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const [draft, setDraft] = useState(initialText);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Text copiat în clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Nu s-a putut copia.");
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      await updateContestatieText(id, draft);
      setText(draft);
      setEditing(false);
      toast.success("Contestația a fost salvată.");
    } catch {
      toast.error("Eroare la salvare. Încearcă din nou.");
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    setDraft(text);
    setEditing(false);
  }

  return (
    <div className="space-y-3">
      {editing ? (
        <>
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="min-h-[500px] font-sans text-sm leading-relaxed resize-y"
            autoFocus
          />
          <div className="flex gap-2">
            <Button size="sm" disabled={saving} onClick={handleSave}>
              {saving ? "Se salvează..." : "Salvează"}
            </Button>
            <Button size="sm" variant="outline" disabled={saving} onClick={handleCancel}>
              Anulează
            </Button>
          </div>
        </>
      ) : (
        <>
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
            {text}
          </pre>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleCopy}>
              {copied ? "✅ Copiat!" : "📋 Copiază"}
            </Button>
            <Button size="sm" variant="outline" onClick={() => setEditing(true)}>
              ✏️ Editează
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
