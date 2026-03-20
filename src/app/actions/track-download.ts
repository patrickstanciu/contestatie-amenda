"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function trackDownload(contestatieId: string) {
  const session = await auth();
  if (!session?.user?.id) return;

  await prisma.contestatie.updateMany({
    where: { id: contestatieId, userId: session.user.id },
    data: { status: "descarcat" },
  });
}
