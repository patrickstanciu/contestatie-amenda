import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NextStepsCardProps {
  tip: string;
  dataComunicare?: string;
  emitent: string;
}

const TERMENE: Record<string, number> = {
  anaf: 30,
  politie_rutiera: 15,
  primarie: 15,
  itm: 15,
  isctr: 15,
  altele: 15,
};

const UNDE_DEPUI: Record<string, { titlu: string; detaliu: string }> = {
  anaf: {
    titlu: "La organul fiscal emitent",
    detaliu: "Depui direct la unitatea ANAF care a emis actul (nu la instanță). Poți depune și prin e-mail cu confirmare de primire sau prin poștă cu scrisoare recomandată.",
  },
  politie_rutiera: {
    titlu: "La Judecătoria competentă",
    detaliu: "Judecătoria în a cărei rază teritorială a fost constatată contravenția (locul faptei, nu domiciliul tău).",
  },
  primarie: {
    titlu: "La Judecătoria competentă",
    detaliu: "Judecătoria în a cărei rază teritorială se află sediul Primăriei emitente.",
  },
  itm: {
    titlu: "La Judecătoria competentă",
    detaliu: "Judecătoria în a cărei rază teritorială se află sediul ITM emitent.",
  },
  isctr: {
    titlu: "La Judecătoria competentă",
    detaliu: "Judecătoria în a cărei rază teritorială a fost constatată contravenția.",
  },
  altele: {
    titlu: "La organul emitent sau Judecătoria competentă",
    detaliu: "Verifică actul administrativ — acesta indică de obicei unde se depune contestația și în ce termen.",
  },
};

const CUM_DEPUI: Record<string, { fizic: string; online?: string }> = {
  anaf: {
    fizic: "La sediul ANAF, la registratură — cere ștampilă cu dată pe exemplarul tău.",
    online: "Prin SPV (Spațiul Privat Virtual) la adresa https://www.anaf.ro/anaf/internet/RO/spv",
  },
  politie_rutiera: {
    fizic: "La registratura judecătoriei — depui în 2 exemplare și ceri ștampilă pe al tău.",
    online: "Prin portalul instanțelor: https://portal.just.ro (secțiunea Cereri online)",
  },
  primarie: {
    fizic: "La registratura judecătoriei — depui în 2 exemplare și ceri ștampilă pe al tău.",
    online: "Prin portalul instanțelor: https://portal.just.ro (secțiunea Cereri online)",
  },
  itm: {
    fizic: "La registratura judecătoriei — depui în 2 exemplare și ceri ștampilă pe al tău.",
    online: "Prin portalul instanțelor: https://portal.just.ro (secțiunea Cereri online)",
  },
  isctr: {
    fizic: "La registratura judecătoriei — depui în 2 exemplare și ceri ștampilă pe al tău.",
    online: "Prin portalul instanțelor: https://portal.just.ro (secțiunea Cereri online)",
  },
  altele: {
    fizic: "La registratura organului competent — cere ștampilă cu dată pe exemplarul tău.",
  },
};

function calculeazaDeadline(dataComunicare: string | undefined, termeniZile: number) {
  if (!dataComunicare) return null;
  const data = new Date(dataComunicare);
  if (isNaN(data.getTime())) return null;
  data.setDate(data.getDate() + termeniZile);
  return data;
}

function DeadlineBadge({ deadline, termeniZile }: { deadline: Date; termeniZile: number }) {
  const azi = new Date();
  azi.setHours(0, 0, 0, 0);
  const diff = Math.ceil((deadline.getTime() - azi.getTime()) / (1000 * 60 * 60 * 24));

  const dateStr = deadline.toLocaleDateString("ro-RO", { day: "2-digit", month: "long", year: "numeric" });

  if (diff < 0) {
    return (
      <div className="rounded-md bg-destructive/10 border border-destructive/30 px-4 py-3">
        <p className="font-semibold text-destructive">⚠️ Termen depășit</p>
        <p className="text-sm text-destructive/80 mt-0.5">
          Termenul de {termeniZile} zile a expirat pe {dateStr}. Consultă un avocat — contestarea poate fi posibilă în circumstanțe speciale.
        </p>
      </div>
    );
  }

  if (diff <= 3) {
    return (
      <div className="rounded-md bg-orange-500/10 border border-orange-500/30 px-4 py-3">
        <p className="font-semibold text-orange-600 dark:text-orange-400">
          🔥 Urgent — mai ai {diff} {diff === 1 ? "zi" : "zile"}!
        </p>
        <p className="text-sm text-muted-foreground mt-0.5">Termen limită: {dateStr}</p>
      </div>
    );
  }

  return (
    <div className="rounded-md bg-green-500/10 border border-green-500/30 px-4 py-3">
      <p className="font-semibold text-green-700 dark:text-green-400">
        ✅ Mai ai {diff} zile
      </p>
      <p className="text-sm text-muted-foreground mt-0.5">
        Termen limită: {dateStr} ({termeniZile} zile de la comunicare)
      </p>
    </div>
  );
}

export function NextStepsCard({ tip, dataComunicare, emitent }: Readonly<NextStepsCardProps>) {
  const termeniZile = TERMENE[tip] ?? 15;
  const unde = UNDE_DEPUI[tip] ?? UNDE_DEPUI.altele;
  const cum = CUM_DEPUI[tip] ?? CUM_DEPUI.altele;
  const deadline = calculeazaDeadline(dataComunicare, termeniZile);

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📍</span>
          <span>Ce faci după?</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">

        {/* Termen */}
        <div className="space-y-2">
          <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">1. Termen limită</h3>
          {deadline ? (
            <DeadlineBadge deadline={deadline} termeniZile={termeniZile} />
          ) : (
            <div className="rounded-md bg-muted px-4 py-3 text-sm">
              <span className="font-medium">
                {termeniZile} zile de la data comunicării procesului verbal.
              </span>
              <p className="text-muted-foreground mt-0.5">
                Adaugă data comunicării în detaliile amenzii pentru a vedea termenul exact.
              </p>
            </div>
          )}
        </div>

        {/* Unde depui */}
        <div className="space-y-2">
          <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">2. Unde depui</h3>
          <div className="rounded-md bg-muted px-4 py-3 text-sm space-y-1">
            <p className="font-medium">{unde.titlu}</p>
            <p className="text-muted-foreground">{unde.detaliu}</p>
            {tip !== "anaf" && (
              <p className="text-muted-foreground">
                Poți verifica judecătoria competentă la{" "}
                <a href="https://portal.just.ro" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">
                  portal.just.ro
                </a>.
              </p>
            )}
          </div>
        </div>

        {/* Cum depui */}
        <div className="space-y-2">
          <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">3. Cum depui</h3>
          <div className="space-y-2">
            <div className="rounded-md bg-muted px-4 py-3 text-sm space-y-1">
              <p className="font-medium">📁 Fizic</p>
              <p className="text-muted-foreground">{cum.fizic}</p>
            </div>
            {cum.online && (
              <div className="rounded-md bg-muted px-4 py-3 text-sm space-y-1">
                <p className="font-medium">💻 Online</p>
                <p className="text-muted-foreground">{cum.online}</p>
              </div>
            )}
          </div>
        </div>

        {/* Ce atasezi */}
        <div className="space-y-2">
          <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">4. Ce atașezi</h3>
          <ul className="rounded-md bg-muted px-4 py-3 text-sm space-y-1 text-muted-foreground list-disc list-inside">
            <li>Contestația (acest document) — <span className="font-medium text-foreground">2 exemplare</span></li>
            <li>Copia procesului verbal contestat</li>
            <li>Dovada comunicării / înmânării PV</li>
            <li>Orice probe relevante (fotografii, înregistrări, chitanțe)</li>
          </ul>
        </div>

        {/* Timbru */}
        <div className="rounded-md border border-border bg-muted/50 px-4 py-3 text-sm flex gap-2">
          <span>💡</span>
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">Scutit de taxă de timbru</span> — conform Art. 7 din OUG 80/2013, contestațiile la procesele verbale contravenționale nu se timbrează.
          </p>
        </div>

        {emitent && (
          <p className="text-xs text-muted-foreground">
            Emitent: <span className="font-medium text-foreground">{emitent}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
