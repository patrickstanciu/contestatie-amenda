export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TIP_LABELS: Record<string, string> = {
  anaf: "ANAF",
  politie_rutiera: "Poliție Rutieră",
  primarie: "Primărie",
  itm: "ITM",
  isctr: "ISCTR",
  altele: "Altele",
};

const STATUS_BADGE: Record<
  string,
  { label: string; variant: "secondary" | "default" | "outline" }
> = {
  draft: { label: "Draft", variant: "secondary" },
  generat: { label: "Generat", variant: "default" },
  descarcat: { label: "Descărcat", variant: "outline" },
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const contestatii = await prisma.contestatie.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Contestațiile tale administrative
          </p>
        </div>
        <Button render={<Link href="/contestatie/noua" />}>
          + Contestație nouă
        </Button>
      </div>

      {contestatii.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-20 text-center">
          <CardHeader>
            <div className="text-5xl mb-4">📄</div>
            <CardTitle>Nu ai generat nicio contestație</CardTitle>
            <CardDescription className="max-w-sm">
              Generează prima ta contestație administrativă în câteva minute cu
              ajutorul inteligenței artificiale.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button render={<Link href="/contestatie/noua" />} size="lg">
              Generează o contestație
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="px-6 py-4 font-medium">Tip</th>
                  <th className="px-6 py-4 font-medium">Dată</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {contestatii.map((c) => {
                  const statusInfo = STATUS_BADGE[c.status] ?? {
                    label: c.status,
                    variant: "secondary" as const,
                  };
                  return (
                    <tr
                      key={c.id}
                      className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium">
                        {TIP_LABELS[c.tip] ?? c.tip}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(c.createdAt).toLocaleDateString("ro-RO", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={statusInfo.variant}>
                          {statusInfo.label}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            render={<Link href={`/contestatie/${c.id}`} />}
                            variant="outline"
                            size="sm"
                          >
                            Vizualizează
                          </Button>
                          {c.status !== "draft" && (
                            <Button
                              render={<Link href={`/contestatie/${c.id}?download=1`} />}
                              variant="ghost"
                              size="sm"
                            >
                              Descarcă PDF
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
