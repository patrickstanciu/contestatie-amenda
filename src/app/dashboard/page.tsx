export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { DashboardTable, type ContestatieRow } from "@/components/dashboard-table";
import { FeedbackCard } from "@/components/feedback-card";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const contestatii = await prisma.contestatie.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  type PrismaContestatie = Awaited<ReturnType<typeof prisma.contestatie.findMany>>[number];
  const rows: ContestatieRow[] = contestatii.map((c: PrismaContestatie) => ({
    id: c.id,
    tip: c.tip,
    status: c.status,
    createdAt: c.createdAt.toISOString(),
    textGenerat: c.textGenerat,
    datePersonale: c.datePersonale as ContestatieRow["datePersonale"],
    dateAmenda: c.dateAmenda as ContestatieRow["dateAmenda"],
  }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">Contestațiile tale administrative</p>
        </div>
        <Button render={<Link href="/contestatie/noua" />}>+ Contestație nouă</Button>
      </div>

      {rows.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 px-4 space-y-6">
          <div className="text-6xl">📄</div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Nu ai generat nicio contestație</h2>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto">
              Generează prima ta contestație administrativă în câteva minute cu ajutorul inteligenței artificiale.
            </p>
          </div>
          <Button render={<Link href="/contestatie/noua" />} size="lg">
            + Contestație nouă
          </Button>
        </div>
      ) : (
        <DashboardTable rows={rows} />
      )}

      {/* Feedback */}
      <div className="mt-10 max-w-lg mx-auto">
        <FeedbackCard />
      </div>
    </div>
  );
}
