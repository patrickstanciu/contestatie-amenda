"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteContestatia(id: string): Promise<void> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Neautentificat.");

  const contestatie = await prisma.contestatie.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!contestatie || contestatie.userId !== session.user.id) {
    throw new Error("Contestația nu a fost găsită.");
  }

  await prisma.contestatie.delete({ where: { id } });
  revalidatePath("/dashboard");
}
