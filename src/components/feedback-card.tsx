"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { trimiteFeedback } from "@/app/actions/trimite-feedback";

const EMOJIS: { value: number; emoji: string; label: string }[] = [
  { value: 1, emoji: "😞", label: "Foarte slab" },
  { value: 2, emoji: "😕", label: "Slab" },
  { value: 3, emoji: "😐", label: "Ok" },
  { value: 4, emoji: "🙂", label: "Bun" },
  { value: 5, emoji: "🤩", label: "Excelent" },
];

export function FeedbackCard() {
  const [rating, setRating] = useState<number | null>(null);
  const [mesaj, setMesaj] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  async function handleSubmit() {
    if (!rating) return;
    setStatus("loading");
    try {
      await trimiteFeedback({ rating, mesaj: mesaj.trim() || undefined });
      setStatus("done");
    } catch {
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30">
        <CardContent className="pt-6 text-center space-y-2">
          <p className="text-2xl">🙏</p>
          <p className="font-semibold text-green-800 dark:text-green-300">Mulțumim pentru feedback!</p>
          <p className="text-sm text-muted-foreground">Ne ajuți să îmbunătățim serviciul.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Cum ți s-a părut aplicația?</CardTitle>
        <p className="text-sm text-muted-foreground">Feedback-ul tău ne ajută să îmbunătățim ContestațieAI.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Emoji rating */}
        <div className="flex justify-center gap-2">
          {EMOJIS.map(({ value, emoji, label }) => (
            <button
              key={value}
              onClick={() => setRating(value)}
              title={label}
              className={`flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition-all text-2xl
                ${rating === value
                  ? "bg-primary/10 ring-2 ring-primary scale-110"
                  : "hover:bg-muted hover:scale-105"
                }`}
            >
              {emoji}
              <span className="text-xs text-muted-foreground">{label}</span>
            </button>
          ))}
        </div>

        {/* Optional message — shown after rating */}
        {rating !== null && (
          <div className="space-y-3">
            <Textarea
              placeholder="Opțional: spune-ne mai multe despre experiența ta..."
              value={mesaj}
              onChange={(e) => setMesaj(e.target.value)}
              rows={3}
              maxLength={1000}
            />
            <Button
              onClick={handleSubmit}
              disabled={status === "loading"}
              className="w-full"
            >
              {status === "loading" ? "Se trimite..." : "Trimite feedback"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
