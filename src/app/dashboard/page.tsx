export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardTable, type ContestatieRow } from "@/components/dashboard-table";

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
        <Card className="flex flex-col items-center justify-center py-20 text-center">
          <CardHeader>
            <div className="text-5xl mb-4">📄</div>
            <CardTitle>Nu ai generat nicio contestație</CardTitle>
            <CardDescription className="max-w-sm">
              Generează prima ta contestație administrativă în câteva minute cu ajutorul inteligenței artificiale.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button render={<Link href="/contestatie/noua" />} size="lg">
              Generează o contestație
            </Button>
          </CardContent>
        </Card>
      ) : (
        <DashboardTable rows={rows} />
      )}
    </div>
  );
}
