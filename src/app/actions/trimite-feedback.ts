"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  rating: z.number().int().min(1).max(5),
  mesaj: z.string().max(1000).optional(),
});

export async function trimiteFeedback(input: { rating: number; mesaj?: string }) {
  const session = await auth();
  const parsed = schema.safeParse(input);
  if (!parsed.success) throw new Error("Date invalide");

  await prisma.feedback.create({
    data: {
      rating: parsed.data.rating,
      mesaj: parsed.data.mesaj?.trim() || null,
      userId: session?.user?.id ?? null,
    },
  });
}
