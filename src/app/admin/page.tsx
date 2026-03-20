import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

const TIP_LABELS: Record<string, string> = {
  anaf: "ANAF",
  politie_rutiera: "Poliție Rutieră",
  primarie: "Primărie",
  itm: "ITM",
  isctr: "ISCTR",
  altele: "Altele",
};

export default async function AdminStatsPage() {
  const session = await auth();

  if (!session?.user?.id) redirect("/login");

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail || session.user.email !== adminEmail) notFound();

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const [
    totalUsers,
    totalContestatii,
    totalGenerate,
    totalDescarcate,
    byTip,
    byStatus,
    last7Days,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.contestatie.count(),
    prisma.contestatie.count({ where: { status: { in: ["generat", "descarcat"] } } }),
    prisma.contestatie.count({ where: { status: "descarcat" } }),
    prisma.contestatie.groupBy({ by: ["tip"], _count: { _all: true } }),
    prisma.contestatie.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.contestatie.count({
      where: { createdAt: { gte: sevenDaysAgo } },
    }),
  ]);

  const convGenerare = totalContestatii > 0 ? Math.round((totalGenerate / totalContestatii) * 100) : 0;
  const convDescarcare = totalGenerate > 0 ? Math.round((totalDescarcate / totalGenerate) * 100) : 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">📊 Admin Stats</h1>
        <p className="text-muted-foreground mt-1 text-sm">Date agregate — nu conțin informații personale.</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KpiCard label="Utilizatori" value={totalUsers} />
        <KpiCard label="Contestații create" value={totalContestatii} />
        <KpiCard label="Generate cu AI" value={totalGenerate} sub={`${convGenerare}% din total`} />
        <KpiCard label="PDF descărcate" value={totalDescarcate} sub={`${convDescarcare}% din generate`} />
      </div>

      {/* Last 7 days */}
      <Card>
        <CardHeader><CardTitle className="text-base">Ultimele 7 zile</CardTitle></CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{last7Days}</p>
          <p className="text-sm text-muted-foreground mt-1">contestații create</p>
        </CardContent>
      </Card>

      {/* By tip */}
      <Card>
        <CardHeader><CardTitle className="text-base">Distribuție pe tip</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {byTip
            .sort((a, b) => b._count._all - a._count._all)
            .map(({ tip, _count }) => {
              const pct = totalContestatii > 0 ? Math.round((_count._all / totalContestatii) * 100) : 0;
              return (
                <div key={tip} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{TIP_LABELS[tip] ?? tip}</span>
                    <span className="text-muted-foreground">{_count._all} ({pct}%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
        </CardContent>
      </Card>

      {/* By status */}
      <Card>
        <CardHeader><CardTitle className="text-base">Distribuție pe status</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {byStatus.map(({ status, _count }) => (
              <div key={status} className="text-center rounded-lg border border-border p-4">
                <p className="text-2xl font-bold">{_count._all}</p>
                <p className="text-sm text-muted-foreground capitalize mt-1">{status}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function KpiCard({ label, value, sub }: Readonly<{ label: string; value: number; sub?: string }>) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm font-medium mt-1">{label}</p>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </CardContent>
    </Card>
  );
}
