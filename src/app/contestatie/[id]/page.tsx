import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { stripMarkdown } from "@/lib/strip-markdown";
import { maskCnp } from "@/lib/mask-cnp";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PDFDownloadButton } from "@/components/pdf/ContestatiePDF";
import { ContestatieTextEditor } from "@/components/contestatie-text-editor";
import { NextStepsCard } from "@/components/next-steps-card";
import { SanseEstimativeCard } from "@/components/sanse-estimative-card";

export const dynamic = "force-dynamic";

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

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ContestatieDetailPage({ params }: PageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { id } = await params;

  const contestatie = await prisma.contestatie.findUnique({
    where: { id },
  });

  if (!contestatie || contestatie.userId !== session.user.id) {
    notFound();
  }

  const datePersonale = contestatie.datePersonale as {
    numePrenume: string;
    cnp: string;
    adresa: string;
    judet: string;
    telefon: string;
    email: string;
  };

  const dateAmenda = contestatie.dateAmenda as {
    nrProcesVerbal: string;
    dataAmenda: string;
    dataComunicare?: string;
    suma: string;
    emitent: string;
    temeiLegal: string;
    descriereFapta: string;
  };

  const textCurat = contestatie.textGenerat
    ? stripMarkdown(contestatie.textGenerat)
    : null;

  const statusInfo = STATUS_BADGE[contestatie.status] ?? {
    label: contestatie.status,
    variant: "secondary" as const,
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Contestație {TIP_LABELS[contestatie.tip] ?? contestatie.tip}
            </h1>
            <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
          </div>
          <p className="text-muted-foreground text-m">
            Generată la{" "}
            {new Date(contestatie.createdAt).toLocaleDateString("ro-RO", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div className="flex gap-2">
          <Button render={<Link href="/dashboard" />} variant="outline" size="sm">
            ← Dashboard
          </Button>

          {contestatie.textGenerat && (
            <PDFDownloadButton
              text={textCurat}
              datePersonale={datePersonale}
              emitent={dateAmenda.emitent}
              contestatieId={contestatie.id}
            />
          )}
        </div>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Date personale</CardTitle>
          </CardHeader>
          <CardContent className="text-m space-y-1.5 text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">Nume:</span>{" "}
              {datePersonale.numePrenume}
            </p>
            <p>
              <span className="font-medium text-foreground">CNP:</span>{" "}
              <span className="font-mono">{maskCnp(datePersonale.cnp)}</span>
            </p>
            <p>
              <span className="font-medium text-foreground">Adresă:</span>{" "}
              {datePersonale.adresa}, jud. {datePersonale.judet}
            </p>
            <p>
              <span className="font-medium text-foreground">Telefon:</span>{" "}
              {datePersonale.telefon}
            </p>
            <p>
              <span className="font-medium text-foreground">Email:</span>{" "}
              {datePersonale.email}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Detalii amendă</CardTitle>
          </CardHeader>
          <CardContent className="text-m space-y-1.5 text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">Nr. PV:</span>{" "}
              {dateAmenda.nrProcesVerbal}
            </p>
            <p>
              <span className="font-medium text-foreground">Data amenzii:</span>{" "}
              {dateAmenda.dataAmenda
                ? new Date(dateAmenda.dataAmenda).toLocaleDateString("ro-RO")
                : "-"}
            </p>
            {dateAmenda.dataComunicare && (
              <p>
                <span className="font-medium text-foreground">Data comunicării:</span>{" "}
                {new Date(dateAmenda.dataComunicare).toLocaleDateString("ro-RO")}
              </p>
            )}
            <p>
              <span className="font-medium text-foreground">Sumă:</span>{" "}
              {dateAmenda.suma} RON
            </p>
            <p>
              <span className="font-medium text-foreground">Emitent:</span>{" "}
              {dateAmenda.emitent}
            </p>
            {dateAmenda.temeiLegal && (
              <p>
                <span className="font-medium text-foreground">
                  Temei legal:
                </span>{" "}
                {dateAmenda.temeiLegal}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Șanse estimative */}
      {contestatie.motivePredefinite.length > 0 && (
        <SanseEstimativeCard
          motiveSelectate={contestatie.motivePredefinite}
          motiveCustom={contestatie.motiveCustom}
        />
      )}

      {/* Generated text */}
      {textCurat ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Contestația generată</CardTitle>
              <CardDescription>
                Document redactat de AI — verifică înainte de a trimite
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <ContestatieTextEditor id={contestatie.id} initialText={textCurat} />
            </CardContent>
          </Card>

          <NextStepsCard
            tip={contestatie.tip}
            dataComunicare={dateAmenda.dataComunicare}
            emitent={dateAmenda.emitent}
            judet={datePersonale.judet}
          />
        </>
      ) : (
        <Card className="flex flex-col items-center justify-center py-16 text-center">
          <CardHeader>
            <div className="text-4xl mb-2">⏳</div>
            <CardTitle>Contestația nu a fost generată încă</CardTitle>
            <CardDescription>
              Aceasta este un draft. Revino la formular pentru a finaliza
              generarea.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button render={<Link href="/contestatie/noua" />}>
              Generează contestație
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
