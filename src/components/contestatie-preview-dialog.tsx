"use client";

import { useState } from "react";
import { Dialog } from "@base-ui/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PDFDownloadButton } from "@/components/pdf/ContestatiePDF";
import { stripMarkdown } from "@/lib/strip-markdown";

interface Props {
  text: string | null;
  datePersonale: {
    numePrenume: string;
    cnp: string;
    adresa: string;
    judet: string;
    telefon: string;
    email: string;
  };
  emitent: string;
  contestatieId: string;
}

export function ContestatiePreviewDialog({ text, datePersonale, emitent, contestatieId }: Readonly<Props>) {
  const [copied, setCopied] = useState(false);

  if (!text) return null;

  const clean = stripMarkdown(text);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(clean);
      setCopied(true);
      toast.success("Text copiat în clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Nu s-a putut copia.");
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger render={<Button variant="outline" size="sm">👁️ Previzualizează</Button>} />

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-in fade-in-0" />

        <Dialog.Popup className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
              <div>
                <h2 className="font-semibold text-base">Previzualizare contestație</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Citește, copiază sau descarcă PDF</p>
              </div>
              <Dialog.Close
                render={
                  <button className="text-muted-foreground hover:text-foreground transition-colors text-xl leading-none">
                    ✕
                  </button>
                }
              />
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 px-6 py-5">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
                {clean}
              </pre>
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-border shrink-0">
              <p className="text-[10px] text-muted-foreground hidden sm:block">
                Verifică documentul înainte de a-l trimite.
              </p>
              <div className="flex gap-2 ml-auto">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  {copied ? "✅ Copiat!" : "📋 Copiază text"}
                </Button>
                <PDFDownloadButton
                  text={clean}
                  datePersonale={datePersonale}
                  emitent={emitent}
                  contestatieId={contestatieId}
                />
              </div>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
