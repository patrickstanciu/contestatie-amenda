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

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [
    totalUsers,
    totalContestatii,
    totalGenerate,
    totalDescarcate,
    byTip,
    byStatus,
    last7Days,
    newUsersLast7Days,
    users,
    recentContestatii,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.contestatie.count(),
    prisma.contestatie.count({ where: { status: { in: ["generat", "descarcat"] } } }),
    prisma.contestatie.count({ where: { status: "descarcat" } }),
    prisma.contestatie.groupBy({ by: ["tip"], _count: { _all: true } }),
    prisma.contestatie.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.contestatie.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.user.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        _count: { select: { contestatii: true } },
      },
    }),
    prisma.contestatie.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        tip: true,
        status: true,
        createdAt: true,
        user: { select: { email: true, name: true } },
      },
    }),
  ]);

  const convGenerare = totalContestatii > 0 ? Math.round((totalGenerate / totalContestatii) * 100) : 0;
  const convDescarcare = totalGenerate > 0 ? Math.round((totalDescarcate / totalGenerate) * 100) : 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">📊 Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-sm">Vizibil doar pentru {adminEmail}</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KpiCard label="Utilizatori totali" value={totalUsers} sub={`+${newUsersLast7Days} în 7 zile`} />
        <KpiCard label="Contestații create" value={totalContestatii} sub={`${last7Days} în 7 zile`} />
        <KpiCard label="Generate cu AI" value={totalGenerate} sub={`${convGenerare}% din total`} />
        <KpiCard label="PDF descărcate" value={totalDescarcate} sub={`${convDescarcare}% din generate`} />
      </div>

      {/* Distribution cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* By tip */}
        <Card>
          <CardHeader><CardTitle className="text-base">Distribuție pe tip</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[...byTip]
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
            <div className="grid grid-cols-2 gap-3">
              {[...byStatus].map(({ status, _count }) => (
                <div key={status} className="text-center rounded-lg border border-border p-4">
                  <p className="text-2xl font-bold">{_count._all}</p>
                  <p className="text-sm text-muted-foreground capitalize mt-1">{status}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent activity */}
      <Card>
        <CardHeader><CardTitle className="text-base">Ultimele 20 contestații</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 font-medium text-muted-foreground">Utilizator</th>
                  <th className="pb-2 font-medium text-muted-foreground">Tip</th>
                  <th className="pb-2 font-medium text-muted-foreground">Status</th>
                  <th className="pb-2 font-medium text-muted-foreground">Data</th>
                </tr>
              </thead>
              <tbody>
                {recentContestatii.map((c) => (
                  <tr key={c.id} className="border-b border-border last:border-0">
                    <td className="py-2 pr-4 text-muted-foreground">{c.user?.email ?? "—"}</td>
                    <td className="py-2 pr-4">{TIP_LABELS[c.tip] ?? c.tip}</td>
                    <td className="py-2 pr-4">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="py-2 text-muted-foreground whitespace-nowrap">
                      {new Date(c.createdAt).toLocaleDateString("ro-RO", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Users table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Utilizatori ({users.length}{totalUsers > 50 ? ` din ${totalUsers}` : ""})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 font-medium text-muted-foreground">Email</th>
                  <th className="pb-2 font-medium text-muted-foreground">Nume</th>
                  <th className="pb-2 font-medium text-muted-foreground text-right">Contestații</th>
                  <th className="pb-2 font-medium text-muted-foreground">Înregistrat</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-border last:border-0">
                    <td className="py-2 pr-4 font-medium">{u.email}</td>
                    <td className="py-2 pr-4 text-muted-foreground">{u.name ?? "—"}</td>
                    <td className="py-2 pr-4 text-right">
                      <span className={`font-semibold ${u._count.contestatii > 0 ? "text-primary" : "text-muted-foreground"}`}>
                        {u._count.contestatii}
                      </span>
                    </td>
                    <td className="py-2 text-muted-foreground whitespace-nowrap">
                      {new Date(u.createdAt).toLocaleDateString("ro-RO", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

function StatusBadge({ status }: Readonly<{ status: string }>) {
  const cfg: Record<string, string> = {
    draft: "bg-muted text-muted-foreground",
    generat: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
    descarcat: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${cfg[status] ?? "bg-muted text-muted-foreground"}`}>
      {status}
    </span>
  );
}
