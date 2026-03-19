"use client";

import { useState } from "react";
import Link from "next/link";
import { stripMarkdown } from "@/lib/strip-markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PDFDownloadButton } from "@/components/pdf/ContestatiePDF";
import { DeleteContestatieButton } from "@/components/delete-contestatie-button";

const TIP_LABELS: Record<string, string> = {
  anaf: "ANAF",
  politie_rutiera: "Poliție Rutieră",
  primarie: "Primărie",
  itm: "ITM",
  isctr: "ISCTR",
  altele: "Altele",
};

const STATUS_BADGE: Record<string, { label: string; variant: "secondary" | "default" | "outline" }> = {
  draft: { label: "Draft", variant: "secondary" },
  generat: { label: "Generat", variant: "default" },
  descarcat: { label: "Descărcat", variant: "outline" },
};

export interface ContestatieRow {
  id: string;
  tip: string;
  status: string;
  createdAt: string;
  textGenerat: string | null;
  datePersonale: { numePrenume: string; cnp: string; adresa: string; judet: string; telefon: string; email: string };
  dateAmenda: { nrProcesVerbal: string; emitent: string; suma: string; dataAmenda: string; dataComunicare?: string; temeiLegal?: string; descriereFapta: string };
}

export function DashboardTable({ rows }: Readonly<{ rows: ContestatieRow[] }>) {
  const [query, setQuery] = useState("");

  const filtered = rows.filter((c) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      (TIP_LABELS[c.tip] ?? c.tip).toLowerCase().includes(q) ||
      c.dateAmenda.emitent.toLowerCase().includes(q) ||
      c.dateAmenda.nrProcesVerbal.toLowerCase().includes(q) ||
      (STATUS_BADGE[c.status]?.label ?? c.status).toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4">
      <Input
        placeholder="Caută după tip, emitent, nr. PV, status..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="max-w-sm"
      />

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="px-6 py-4 font-medium">Tip</th>
                <th className="px-6 py-4 font-medium">Nr. PV</th>
                <th className="px-6 py-4 font-medium">Dată</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">
                    Nicio contestație nu corespunde căutării.
                  </td>
                </tr>
              ) : (
                filtered.map((c) => {
                  const statusInfo = STATUS_BADGE[c.status] ?? { label: c.status, variant: "secondary" as const };
                  return (
                    <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors">
                      <td className="px-6 py-4 font-medium">{TIP_LABELS[c.tip] ?? c.tip}</td>
                      <td className="px-6 py-4 text-muted-foreground text-xs">{c.dateAmenda.nrProcesVerbal || "—"}</td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(c.createdAt).toLocaleDateString("ro-RO", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button render={<Link href={`/contestatie/${c.id}`} />} variant="outline" size="sm">
                            Vizualizează
                          </Button>
                          {c.textGenerat && (
                            <PDFDownloadButton
                              text={stripMarkdown(c.textGenerat)}
                              datePersonale={c.datePersonale}
                              emitent={c.dateAmenda.emitent}
                              contestatieId={c.id}
                            />
                          )}
                          <DeleteContestatieButton id={c.id} />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
