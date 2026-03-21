"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";
import { stripMarkdown } from "@/lib/strip-markdown";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 60_000,
  maxRetries: 2,
});

export type ContestatieInput = {
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
    dataComunicare?: string;
    suma: string;
    emitent: string;
    temeiLegal: string;
    descriereFapta: string;
    nrPermis?: string;
    nrInmatriculare?: string;
  };
  motiveSelectate: string[];
  motiveCustom: string;
};

const TIP_LABELS: Record<string, string> = {
  anaf: "ANAF (Agenția Națională de Administrare Fiscală)",
  politie_rutiera: "Poliția Rutieră",
  primarie: "Primăria",
  itm: "ITM (Inspectoratul Teritorial de Muncă)",
  isctr: "ISCTR (Inspectoratul de Stat pentru Controlul în Transportul Rutier)",
  altele: "Autoritate administrativă",
};

function buildPrompt(input: ContestatieInput): string {
  const { tip, datePersonale, dateAmenda, motiveSelectate, motiveCustom } =
      input;

  const esteANAF = tip === "anaf";

  const denumireAct = esteANAF
      ? "Contestație Administrativă"
      : "Plângere Contravențională";

  const destinatar = esteANAF
      ? `unității emitente ${dateAmenda.emitent}`
      : "Judecătoriei competente potrivit legii";

  const temeiuriSuplimentare: Record<string, string> = {
    anaf:
        "Codul de procedură fiscală (Legea 207/2015)",
    politie_rutiera:
        "OUG 195/2002 privind circulația pe drumurile publice și HG 1391/2006",
    primarie:
        "Codul administrativ (OUG 57/2019) și OG 2/2001",
    itm:
        "Codul muncii (Legea 53/2003) și Legea 108/1999",
    isctr:
        "OG 27/2011 privind transporturile rutiere și Legea 38/2003",
    altele:
        "OG 2/2001 privind regimul juridic al contravențiilor și Legea 554/2004",
  };

  const temeiSpecific =
      temeiuriSuplimentare[tip] ?? temeiuriSuplimentare.altele;

  const motiveLista = [
    ...motiveSelectate,
    ...(motiveCustom.trim() ? [motiveCustom.trim()] : []),
  ]
      .map((m, i) => `${i + 1}. ${m}`)
      .join("\n");

  return `Generează corpul unei ${denumireAct} formale în limba română, adresată ${destinatar}, redactată într-un stil juridic clar, coerent și profesionist.

DATELE CAZULUI:
- Petent: ${datePersonale.numePrenume}, CNP ${datePersonale.cnp}, ${datePersonale.adresa}, jud. ${datePersonale.judet}
- Autoritate emitentă: ${TIP_LABELS[tip] ?? tip} — ${dateAmenda.emitent}
- Nr. proces-verbal: ${dateAmenda.nrProcesVerbal}, data: ${dateAmenda.dataAmenda}
- Data comunicării: ${dateAmenda.dataComunicare || "nespecificată"}
- Suma amenzii: ${dateAmenda.suma} RON
- Temei legal invocat în procesul-verbal: ${dateAmenda.temeiLegal || "nespecificat"}
- Fapta reținută: ${dateAmenda.descriereFapta}${dateAmenda.nrInmatriculare ? `\n- Nr. înmatriculare vehicul: ${dateAmenda.nrInmatriculare}` : ""}${dateAmenda.nrPermis ? `\n- Nr. permis de conducere: ${dateAmenda.nrPermis}` : ""}
- Motive invocate:
${motiveLista}

INSTRUCȚIUNI JURIDICE:
1. Analizează fiecare motiv și încadrează-l juridic corect (ex: vicii de formă, lipsa temeiniciei, prescripție, lipsa probelor).
2. În cazul viciilor de formă, poți invoca dispozițiile relevante din OG 2/2001 (ex. art. 16-17), dacă sunt aplicabile.
3. În cazul prescripției, tratează distinct această cauză conform normelor legale aplicabile.
4. Utilizează legislația generală: OG 2/2001 și Legea 554/2004, precum și legislația specifică: ${temeiSpecific}.
5. Poți face referire la jurisprudență relevantă (inclusiv CEDO, de exemplu cauza Anghel v. România) doar dacă este pertinentă pentru argumentație.
6. Nu presupune automat culpa sau nevinovăția — argumentează pe baza datelor furnizate.

INSTRUCȚIUNI DE REDACTARE:
- Nu include titlul documentului, antet sau date de adresare.
- Nu folosi markdown, simboluri speciale sau formatare HTML.
- Folosește doar text simplu (plain text).
- Titlurile secțiunilor se scriu CU MAJUSCULE, pe linie separată, urmate de o linie goală.
- Paragrafele se separă printr-o linie liberă.
- Evită repetițiile și formulările inutile.

STRUCTURA DOCUMENTULUI:
1. INTRODUCERE — identificarea procesului-verbal contestat
2. TEMEI LEGAL — OG 2/2001, Legea 554/2004 și legislația specifică aplicabilă
3. MOTIVE DE FAPT ȘI DE DREPT — dezvoltă fiecare motiv separat, clar și argumentat
4. PETIT:
   - solicitarea principală: anularea procesului-verbal și, dacă este cazul, restituirea sumei
   - solicitare subsidiară: înlocuirea sancțiunii cu avertisment, dacă instanța apreciază că sunt îndeplinite condițiile legale
5. PROBE — indică tipuri de probe relevante (înscrisuri, înregistrări, etc.)
6. MENȚIUNI FINALE — inclusiv aspecte privind taxa de timbru, dacă este aplicabil

IMPORTANT:
Textul trebuie să fie redactat ca un model orientativ, bazat exclusiv pe informațiile furnizate, și poate necesita adaptare în funcție de circumstanțele concrete ale cauzei.

Redactează documentul complet, coerent și pregătit pentru utilizare.`;
}

export async function genereazaContestatia(
  input: ContestatieInput
): Promise<{ id: string; fallback?: boolean }> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Neautentificat. Te rugăm să te autentifici.");
  }

  // Rate limiting: max 5 generări per utilizator pe zi (DB-based)
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const recentCount = await prisma.contestatie.count({
    where: {
      userId: session.user.id,
      createdAt: { gte: startOfDay },
      status: { not: "draft" },
    },
  });
  if (recentCount >= 5) {
    throw new Error("Ai atins limita de 5 contestații generate pe zi. Revino mâine.");
  }

  let textGenerat: string | null = null;
  let usedFallback = false;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-5.4-mini",
      messages: [
        {
          role: "system",
          content:
            "Ești un avocat expert în drept administrativ român. Redactezi contestații administrative profesionale, corecte din punct de vedere legal, în limba română. Folosești un limbaj juridic formal și precis. Contestațiile respectă legislația română în vigoare.",
        },
        {
          role: "user",
          content: buildPrompt(input),
        },
      ],
      temperature: 0.3,
      max_completion_tokens: 3000,
    });

    const rawText = completion.choices[0]?.message?.content?.trim();
    if (!rawText) throw new Error("Modelul AI nu a returnat niciun conținut.");
    textGenerat = stripMarkdown(rawText);
  } catch (err) {
    // For 401/429 (config/quota errors) — fail hard, don't save
    if (err instanceof OpenAI.APIError) {
      if (err.status === 401) throw new Error("Cheie API OpenAI invalidă. Verifică configurarea.");
      if (err.status === 429) throw new Error("Limita de utilizare OpenAI a fost atinsă. Încearcă din nou în câteva minute.");
    }
    // For 5xx / timeout / network — save draft with fallback template so user doesn't lose data
    usedFallback = true;
    textGenerat = null;
  }

  const contestatie = await prisma.contestatie.create({
    data: {
      userId: session.user.id,
      tip: input.tip,
      datePersonale: input.datePersonale,
      dateAmenda: input.dateAmenda,
      motiveCustom: input.motiveCustom || null,
      motivePredefinite: input.motiveSelectate,
      textGenerat,
      status: usedFallback ? "draft" : "generat",
    },
  });

  return { id: contestatie.id, fallback: usedFallback };
}
