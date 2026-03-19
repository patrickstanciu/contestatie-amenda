"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type DatePersonaleInput = {
  numePrenume: string;
  cnp: string;
  adresa: string;
  judet: string;
  telefon: string;
  email: string;
};

export async function getDatePersonale(): Promise<DatePersonaleInput | null> {
  const session = await auth();
  if (!session?.user?.id) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { datePersonale: true },
  });

  return (user?.datePersonale as DatePersonaleInput) ?? null;
}

export async function saveDatePersonale(data: DatePersonaleInput): Promise<void> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Neautentificat.");

  await prisma.user.update({
    where: { id: session.user.id },
    data: { datePersonale: data },
  });

  revalidatePath("/account");
}
