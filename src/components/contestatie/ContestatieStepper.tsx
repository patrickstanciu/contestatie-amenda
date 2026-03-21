"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { getDatePersonale } from "@/app/actions/account";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { genereazaContestatia } from "@/app/actions/genereaza-contestatie";
import { calculeazaTermen } from "@/lib/calculeaza-termen";

// ── Types ─────────────────────────────────────────────────────────────────────

type FormData = {
  tip: string;
  datePersonale: {
    numePrenume: string;
    cnp: string;
    adresa: string;
    judet: string;
    telefon: string;
    email: string;
  };
  dateAmenda: {
    nrProcesVerbal: string;
    dataAmenda: string;
    dataComunicare: string;
    suma: string;
    emitent: string;
    temeiLegal: string;
    descriereFapta: string;
    nrPermis: string;
    nrInmatriculare: string;
  };
  motiveSelectate: string[];
  motiveCustom: string;
};

// ── Constants ─────────────────────────────────────────────────────────────────

const TIPURI = [
  { id: "anaf", label: "ANAF", emoji: "🏛️" },
  { id: "politie_rutiera", label: "Poliție Rutieră", emoji: "🚔" },
  { id: "primarie", label: "Primărie", emoji: "🏤" },
  { id: "itm", label: "ITM", emoji: "👷" },
  { id: "isctr", label: "ISCTR", emoji: "🚛" },
  { id: "altele", label: "Altele", emoji: "📋" },
];

const EMITENTI: Record<string, string> = {
  anaf: "ANAF — Agenția Națională de Administrare Fiscală",
  politie_rutiera: "Inspectoratul de Poliție Județean — Poliție Rutieră",
  primarie: "Primăria",
  itm: "Inspectoratul Teritorial de Muncă",
  isctr: "Inspectoratul de Stat pentru Controlul în Transportul Rutier",
  altele: "",
};

const MOTIVE_PREDEFINITE: Record<string, string[]> = {
  anaf: [
    "Nu am fost notificat în prealabil",
    "Procedura nu a fost respectată",
    "Prescripție extinctivă",
    "Eroare de calcul în actul administrativ",
    "Lipsa contradicționalității",
  ],
  politie_rutiera: [
    "Aparatul radar nu era omologat sau verificat metrologic",
    "Indicatorul de viteză/semnalizare nu era vizibil",
    "Semnalizarea rutieră lipsea sau era ambiguă",
    "Nu eram eu la volan la momentul constatării",
    "Procesul verbal conține erori materiale",
    "Termenul de înmânare a procesului verbal a fost depășit",
  ],
  primarie: [
    "Actul administrativ este emis cu exces de putere",
    "Nu am primit înștiințarea prealabilă",
    "Fapta nu constituie contravenție",
    "Procesul verbal este nelegal întocmit",
  ],
  itm: [
    "Procedura de control nu a fost respectată",
    "Fapta nu constituie contravenție conform legislației muncii",
    "Actul administrativ este nelegal",
    "Prescripție extinctivă",
  ],
  isctr: [
    "Procedura nu a fost respectată",
    "Fapta nu constituie contravenție",
    "Procesul verbal conține erori materiale",
    "Prescripție extinctivă",
  ],
  altele: [
    "Procedura nu a fost respectată",
    "Fapta nu constituie contravenție",
    "Procesul verbal conține erori materiale",
    "Prescripție extinctivă",
    "Actul administrativ este nelegal",
  ],
};

const JUDETE = [
  "Alba", "Arad", "Argeș", "Bacău", "Bihor", "Bistrița-Năsăud", "Botoșani",
  "Brăila", "Brașov", "București", "Buzău", "Călărași", "Caraș-Severin",
  "Cluj", "Constanța", "Covasna", "Dâmbovița", "Dolj", "Galați", "Giurgiu",
  "Gorj", "Harghita", "Hunedoara", "Ialomița", "Iași", "Ilfov", "Maramureș",
  "Mehedinți", "Mureș", "Neamț", "Olt", "Prahova", "Sălaj", "Satu Mare",
  "Sibiu", "Suceava", "Teleorman", "Timiș", "Tulcea", "Vâlcea", "Vaslui", "Vrancea",
];

// ── Zod Schemas ───────────────────────────────────────────────────────────────

const step1Schema = z.object({
  tip: z.string().min(1, "Selectează tipul de contestație"),
});

const step2Schema = z.object({
  numePrenume: z.string().min(3, "Introduceți numele și prenumele"),
  cnp: z.string().length(13, "CNP-ul trebuie să aibă 13 cifre").regex(/^\d+$/, "CNP invalid"),
  adresa: z.string().min(5, "Introduceți adresa completă"),
  judet: z.string().min(1, "Selectați județul"),
  telefon: z.string().min(10, "Număr de telefon invalid"),
  email: z.string().email("Adresă de email invalidă"),
});

const step3Schema = z.object({
  nrProcesVerbal: z.string().min(1, "Introduceți numărul procesului verbal"),
  dataAmenda: z.string().min(1, "Selectați data amenzii"),
  dataComunicare: z.string().optional(),
  suma: z.string().min(1, "Introduceți suma amenzii"),
  emitent: z.string().min(1, "Introduceți emitentul"),
  temeiLegal: z.string().optional(),
  descriereFapta: z.string().min(10, "Descrieți fapta reținută (min. 10 caractere)"),
});

const step4Schema = z.object({
  motiveSelectate: z.array(z.string()),
  motiveCustom: z.string(),
}).refine(
  (data) => data.motiveSelectate.length > 0 || data.motiveCustom.trim().length > 0,
  { message: "Selectați cel puțin un motiv sau introduceți un motiv personalizat", path: ["motiveSelectate"] }
);

// ── Initial state ─────────────────────────────────────────────────────────────

const INITIAL_FORM: FormData = {
  tip: "",
  datePersonale: {
    numePrenume: "",
    cnp: "",
    adresa: "",
    judet: "",
    telefon: "",
    email: "",
  },
  dateAmenda: {
    nrProcesVerbal: "",
    dataAmenda: "",
    dataComunicare: "",
    suma: "",
    emitent: "",
    temeiLegal: "",
    descriereFapta: "",
    nrPermis: "",
    nrInmatriculare: "",
  },
  motiveSelectate: [],
  motiveCustom: "",
};

// ── Main component ────────────────────────────────────────────────────────────

export function ContestatieStepper() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [disclaimerAcceptat, setDisclaimerAcceptat] = useState(false);

  useEffect(() => {
    getDatePersonale().then((saved) => {
      if (!saved) return;
      setFormData((prev) => ({ ...prev, datePersonale: saved }));
    });
  }, []);

  const totalSteps = 5;
  const progress = ((step - 1) / (totalSteps - 1)) * 100;

  // ── Helpers ──────────────────────────────────────────────────────────────────

  function setDatePersonale(field: keyof FormData["datePersonale"], value: string) {
    setFormData((prev) => ({
      ...prev,
      datePersonale: { ...prev.datePersonale, [field]: value },
    }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function setDateAmenda(field: keyof FormData["dateAmenda"], value: string) {
    setFormData((prev) => ({
      ...prev,
      dateAmenda: { ...prev.dateAmenda, [field]: value },
    }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function toggleMotiv(motiv: string) {
    setFormData((prev) => {
      const exists = prev.motiveSelectate.includes(motiv);
      return {
        ...prev,
        motiveSelectate: exists
          ? prev.motiveSelectate.filter((m) => m !== motiv)
          : [...prev.motiveSelectate, motiv],
      };
    });
    setErrors((prev) => ({ ...prev, motiveSelectate: "" }));
  }

  // ── Validation per step ───────────────────────────────────────────────────────

  function validateStep(s: number): boolean {
    setErrors({});

    if (s === 1) {
      const result = step1Schema.safeParse({ tip: formData.tip });
      if (!result.success) {
        const errs: Record<string, string> = {};
        result.error.issues.forEach((e) => { errs[e.path[0] as string] = e.message; });
        setErrors(errs);
        return false;
      }
    }

    if (s === 2) {
      const result = step2Schema.safeParse(formData.datePersonale);
      if (!result.success) {
        const errs: Record<string, string> = {};
        result.error.issues.forEach((e) => { errs[e.path[0] as string] = e.message; });
        setErrors(errs);
        return false;
      }
    }

    if (s === 3) {
      const result = step3Schema.safeParse(formData.dateAmenda);
      if (!result.success) {
        const errs: Record<string, string> = {};
        result.error.issues.forEach((e) => { errs[e.path[0] as string] = e.message; });
        setErrors(errs);
        return false;
      }
    }

    if (s === 4) {
      const result = step4Schema.safeParse({
        motiveSelectate: formData.motiveSelectate,
        motiveCustom: formData.motiveCustom,
      });
      if (!result.success) {
        const errs: Record<string, string> = {};
        result.error.issues.forEach((e) => { errs[e.path[0] as string] = e.message; });
        setErrors(errs);
        return false;
      }
    }

    return true;
  }

  function next() {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, totalSteps));
    }
  }

  function back() {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  }

  async function handleGenerate() {
    if (!validateStep(step)) return;
    setLoading(true);
    try {
      const result = await genereazaContestatia(formData);
      if (result.fallback) {
        toast.warning("Serviciul AI este temporar indisponibil. Datele tale au fost salvate ca draft — revino în câteva minute pentru a regenera.");
      } else {
        toast.success("Contestația a fost generată cu succes!");
      }
      router.push(`/contestatie/${result.id}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Eroare necunoscută";
      toast.error(`Eroare la generare: ${message}`);
    } finally {
      setLoading(false);
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────────

  const motive = MOTIVE_PREDEFINITE[formData.tip] ?? MOTIVE_PREDEFINITE.altele;

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-m text-muted-foreground">
          <span>Pasul {step} din {totalSteps}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          {["Tip", "Date personale", "Detalii amendă", "Motive", "Confirmare"].map(
            (label, i) => (
              <span
                key={label}
                className={step === i + 1 ? "font-semibold text-foreground" : ""}
              >
                {label}
              </span>
            )
          )}
        </div>
      </div>

      {/* Step 1 — Tip contestație */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Ce tip de contestație dorești să generezi?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {TIPURI.map(({ id, label, emoji }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      tip: id,
                      dateAmenda: {
                        ...prev.dateAmenda,
                        emitent: EMITENTI[id] ?? "",
                      },
                      motiveSelectate: [],
                    }));
                    setErrors({});
                  }}
                  className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-5 text-m font-medium transition-all hover:border-primary hover:bg-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    formData.tip === id
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  <span className="text-3xl">{emoji}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
            {errors.tip && (
              <p className="mt-3 text-m text-destructive">{errors.tip}</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 2 — Date personale */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Datele tale personale</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="numePrenume">Nume și prenume *</Label>
                <Input
                  id="numePrenume"
                  value={formData.datePersonale.numePrenume}
                  onChange={(e) => setDatePersonale("numePrenume", e.target.value)}
                  placeholder="Ion Popescu"
                  aria-invalid={!!errors.numePrenume}
                />
                {errors.numePrenume && (
                  <p className="text-xs text-destructive">{errors.numePrenume}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnp">CNP *</Label>
                <Input
                  id="cnp"
                  value={formData.datePersonale.cnp}
                  onChange={(e) => setDatePersonale("cnp", e.target.value)}
                  placeholder="1234567890123"
                  maxLength={13}
                  aria-invalid={!!errors.cnp}
                />
                {errors.cnp && (
                  <p className="text-xs text-destructive">{errors.cnp}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="adresa">Adresă completă *</Label>
              <Input
                id="adresa"
                value={formData.datePersonale.adresa}
                onChange={(e) => setDatePersonale("adresa", e.target.value)}
                placeholder="Str. Exemplu nr. 1, bl. A, ap. 5"
                aria-invalid={!!errors.adresa}
              />
              {errors.adresa && (
                <p className="text-xs text-destructive">{errors.adresa}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="judet">Județul *</Label>
              <Select
                value={formData.datePersonale.judet}
                onValueChange={(v) => setDatePersonale("judet", v ?? "")}
              >
                <SelectTrigger id="judet" aria-invalid={!!errors.judet}>
                  <SelectValue placeholder="Selectează județul" />
                </SelectTrigger>
                <SelectContent>
                  {JUDETE.map((j) => (
                    <SelectItem key={j} value={j}>
                      {j}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.judet && (
                <p className="text-xs text-destructive">{errors.judet}</p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="telefon">Telefon *</Label>
                <Input
                  id="telefon"
                  type="tel"
                  value={formData.datePersonale.telefon}
                  onChange={(e) => setDatePersonale("telefon", e.target.value)}
                  placeholder="0712345678"
                  aria-invalid={!!errors.telefon}
                />
                {errors.telefon && (
                  <p className="text-xs text-destructive">{errors.telefon}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.datePersonale.email}
                  onChange={(e) => setDatePersonale("email", e.target.value)}
                  placeholder="ion@exemplu.ro"
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3 — Detalii amendă */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Detaliile amenzii</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nrProcesVerbal">Nr. proces verbal *</Label>
                <Input
                  id="nrProcesVerbal"
                  value={formData.dateAmenda.nrProcesVerbal}
                  onChange={(e) => setDateAmenda("nrProcesVerbal", e.target.value)}
                  placeholder="ex. PV/12345/2024"
                  aria-invalid={!!errors.nrProcesVerbal}
                />
                {errors.nrProcesVerbal && (
                  <p className="text-xs text-destructive">{errors.nrProcesVerbal}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataAmenda">Data amenzii *</Label>
                <Input
                  id="dataAmenda"
                  type="date"
                  value={formData.dateAmenda.dataAmenda}
                  onChange={(e) => setDateAmenda("dataAmenda", e.target.value)}
                  aria-invalid={!!errors.dataAmenda}
                />
                {errors.dataAmenda && (
                  <p className="text-xs text-destructive">{errors.dataAmenda}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataComunicare">Data comunicării (opțional)</Label>
                <Input
                  id="dataComunicare"
                  type="date"
                  value={formData.dateAmenda.dataComunicare}
                  onChange={(e) => setDateAmenda("dataComunicare", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Data la care ți-a fost înmânat / comunicat procesul verbal
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="suma">Suma amenzii (RON) *</Label>
                <Input
                  id="suma"
                  type="number"
                  min="0"
                  value={formData.dateAmenda.suma}
                  onChange={(e) => setDateAmenda("suma", e.target.value)}
                  placeholder="500"
                  aria-invalid={!!errors.suma}
                />
                {errors.suma && (
                  <p className="text-xs text-destructive">{errors.suma}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="emitent">Emitent *</Label>
                <Input
                  id="emitent"
                  value={formData.dateAmenda.emitent}
                  onChange={(e) => setDateAmenda("emitent", e.target.value)}
                  placeholder="ex. IPJ Cluj — Poliție Rutieră"
                  aria-invalid={!!errors.emitent}
                />
                {errors.emitent && (
                  <p className="text-xs text-destructive">{errors.emitent}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="temeiLegal">Temei legal invocat (opțional)</Label>
              <Input
                id="temeiLegal"
                value={formData.dateAmenda.temeiLegal}
                onChange={(e) => setDateAmenda("temeiLegal", e.target.value)}
                placeholder="ex. Art. 102 alin. (3) lit. a) din OUG 195/2002"
              />
            </div>
            {/* Câmpuri extra pentru amenzi rutiere */}
            {formData.tip === "politie_rutiera" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <div className="col-span-full text-sm font-medium text-primary flex items-center gap-2">
                  🚔 Date suplimentare pentru amendă rutieră (opțional)
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nrInmatriculare">Nr. de înmatriculare vehicul</Label>
                  <Input
                    id="nrInmatriculare"
                    value={formData.dateAmenda.nrInmatriculare}
                    onChange={(e) => setDateAmenda("nrInmatriculare", e.target.value)}
                    placeholder="ex. CJ 01 ABC"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nrPermis">Nr. permis de conducere</Label>
                  <Input
                    id="nrPermis"
                    value={formData.dateAmenda.nrPermis}
                    onChange={(e) => setDateAmenda("nrPermis", e.target.value)}
                    placeholder="ex. 12345678"
                  />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="descriereFapta">Descrierea faptei reținute *</Label>
              <Textarea
                id="descriereFapta"
                value={formData.dateAmenda.descriereFapta}
                onChange={(e) => setDateAmenda("descriereFapta", e.target.value)}
                placeholder="Descrie pe scurt fapta pentru care ai fost amendat..."
                rows={4}
                aria-invalid={!!errors.descriereFapta}
              />
              {errors.descriereFapta && (
                <p className="text-xs text-destructive">{errors.descriereFapta}</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4 — Motive */}
      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Motivele contestației</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-3">
              <p className="text-m text-muted-foreground">
                Selectează motivele aplicabile cazului tău:
              </p>
              {motive.map((motiv) => (
                <div key={motiv} className="flex items-start gap-3">
                  <Checkbox
                    id={motiv}
                    checked={formData.motiveSelectate.includes(motiv)}
                    onCheckedChange={() => toggleMotiv(motiv)}
                  />
                  <Label htmlFor={motiv} className="text-m font-normal cursor-pointer leading-snug">
                    {motiv}
                  </Label>
                </div>
              ))}
              {errors.motiveSelectate && (
                <p className="text-xs text-destructive">{errors.motiveSelectate}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="motiveCustom">
                Motive suplimentare (opțional)
              </Label>
              <Textarea
                id="motiveCustom"
                value={formData.motiveCustom}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, motiveCustom: e.target.value }))
                }
                placeholder="Adaugă orice alte motive sau detalii specifice cazului tău..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 5 — Confirmare */}
      {step === 5 && (
        <Card>
          <CardHeader>
            <CardTitle>Confirmă datele și generează contestația</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 text-m">
            <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Tip contestație:</span>
                <Badge variant="outline">
                  {TIPURI.find((t) => t.id === formData.tip)?.emoji}{" "}
                  {TIPURI.find((t) => t.id === formData.tip)?.label}
                </Badge>
              </div>
              <div>
                <span className="font-semibold">Petent:</span>{" "}
                {formData.datePersonale.numePrenume}, {formData.datePersonale.adresa},{" "}
                jud. {formData.datePersonale.judet}
              </div>
              <div>
                <span className="font-semibold">Proces verbal:</span>{" "}
                {formData.dateAmenda.nrProcesVerbal} din{" "}
                {formData.dateAmenda.dataAmenda
                  ? new Date(formData.dateAmenda.dataAmenda).toLocaleDateString("ro-RO")
                  : "—"}
                {formData.dateAmenda.dataComunicare && (
                  <>, comunicat la {new Date(formData.dateAmenda.dataComunicare).toLocaleDateString("ro-RO")}</>
                )}
                , suma: {formData.dateAmenda.suma} RON
              </div>
              <div>
                <span className="font-semibold">Emitent:</span>{" "}
                {formData.dateAmenda.emitent}
              </div>
              {formData.motiveSelectate.length > 0 && (
                <div>
                  <span className="font-semibold">Motive selectate:</span>
                  <ul className="mt-1 list-inside list-disc space-y-0.5 text-muted-foreground">
                    {formData.motiveSelectate.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}
              {formData.motiveCustom.trim() && (
                <div>
                  <span className="font-semibold">Motive suplimentare:</span>{" "}
                  <span className="text-muted-foreground">{formData.motiveCustom}</span>
                </div>
              )}
            </div>
            {/* Expired term warning */}
            {(() => {
              const termen = calculeazaTermen(formData.tip, formData.dateAmenda.dataComunicare);
              if (termen.status !== "expirat") return null;
              const dateStr = termen.deadline?.toLocaleDateString("ro-RO", { day: "2-digit", month: "long", year: "numeric" });
              const zileTrecute = termen.zileRamase !== null ? Math.abs(termen.zileRamase) : 0;
              return (
                <div className="rounded-lg border-2 border-destructive bg-destructive/10 px-4 py-4 space-y-2">
                  <p className="font-bold text-destructive">🚨 Atenție: Termen legal depășit</p>
                  <p className="text-sm text-destructive/90">
                    Termenul de <strong>{termen.termeniZile} zile</strong> a expirat pe <strong>{dateStr}</strong> ({zileTrecute} {zileTrecute === 1 ? "zi" : "zile"} în urmă).
                  </p>
                  <div className="rounded-md bg-destructive/15 px-3 py-2 text-sm font-medium text-destructive">
                    ⚠️ Este posibil ca plângerea să fie respinsă ca tardivă. Consultă un avocat înainte de depunere — în unele cazuri există motive de repunere în termen.
                  </div>
                </div>
              );
            })()}
            <div className="flex items-start gap-3 rounded-lg border border-border p-4 bg-muted/20">
              <Checkbox
                id="disclaimer"
                checked={disclaimerAcceptat}
                onCheckedChange={(checked) => setDisclaimerAcceptat(checked === true)}
                className="mt-0.5"
              />
              <Label htmlFor="disclaimer" className="text-sm font-normal cursor-pointer leading-snug">
                Am înțeles că documentul este generat automat și poate necesita verificare sau adaptare înainte de a fi depus.
              </Label>
            </div>
            <p className="text-muted-foreground text-xs">
              Apasă <strong>Generează contestația</strong> pentru ca GPT-5.4-mini să redacteze
              documentul. Procesul poate dura 10–30 de secunde.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={back}
          disabled={step === 1 || loading}
        >
          ← Înapoi
        </Button>
        {step < totalSteps ? (
          <Button type="button" onClick={next}>
            Continuă →
          </Button>
        ) : (
          <Button type="button" onClick={handleGenerate} disabled={loading || !disclaimerAcceptat}>
            {loading ? "Se generează..." : "⚡ Generează contestația"}
          </Button>
        )}
      </div>
    </div>
  );
}
