"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deleteContestatia } from "@/app/actions/delete-contestatie";

export function DeleteContestatieButton({ id }: Readonly<{ id: string }>) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!window.confirm("Ești sigur că vrei să ștergi această contestație? Acțiunea este ireversibilă.")) return;
    setLoading(true);
    try {
      await deleteContestatia(id);
      toast.success("Contestația a fost ștearsă.");
    } catch {
      toast.error("Eroare la ștergere. Încearcă din nou.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={loading}
      onClick={handleDelete}
      className="text-destructive hover:text-destructive hover:bg-destructive/10"
    >
      {loading ? "..." : "Șterge"}
    </Button>
  );
}
