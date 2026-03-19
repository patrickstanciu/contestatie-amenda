"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";
import { stripMarkdown } from "@/lib/strip-markdown";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
    suma: string;
    emitent: string;
    temeiLegal: string;
    descriereFapta: string;
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

  const motiveLista = [
    ...motiveSelectate,
    ...(motiveCustom.trim() ? [motiveCustom.trim()] : []),
  ]
    .map((m, i) => `${i + 1}. ${m}`)
    .join("\n");

  return `Generează corpul unei contestații administrative formale în limba română, pe baza datelor de mai jos.

DATELE CAZULUI:
- Petent: ${datePersonale.numePrenume}, CNP ${datePersonale.cnp}, ${datePersonale.adresa}, jud. ${datePersonale.judet}
- Autoritate emitentă: ${TIP_LABELS[tip] ?? tip} — ${dateAmenda.emitent}
- Nr. proces verbal: ${dateAmenda.nrProcesVerbal}, data: ${dateAmenda.dataAmenda}, suma: ${dateAmenda.suma} RON
- Temei legal invocat: ${dateAmenda.temeiLegal || "nedeclacat"}
- Fapta reținută: ${dateAmenda.descriereFapta}
- Motive de contestare:
${motiveLista}

INSTRUCȚIUNI DE FORMAT — respectă-le cu strictețe:
- NU include antet, adrese sau titlul "CONTESTAȚIE" — acestea sunt adăugate automat.
- NU folosi markdown (fără **, fără #, fără _), HTML sau alte sintaxe de formatare.
- Titlurile de secțiune se scriu CU MAJUSCULE pe o linie separată, urmate de o linie goală.
- Paragrafele se separă printr-o linie goală.
- Textul trebuie să fie plain text, gata de inclus într-un document oficial.

STRUCTURA CORPULUI (în această ordine):
1. Introducere — identificarea actului contestat
2. TEMEI LEGAL — OG 2/2001, Legea 554/2004 după caz
3. MOTIVE DE FAPT ȘI DE DREPT — argumentează fiecare motiv detaliat și separat
4. PETIT — anularea procesului verbal și restituirea sumei (dacă e cazul)
5. PROBE SOLICITATE
6. Mențiune scutire taxă de timbru (art. 7 OUG 80/2013)

Folosește limbaj juridic formal, clar și profesional. Documentul trebuie să fie complet și gata de depus.`;
}

export async function genereazaContestatia(
  input: ContestatieInput
): Promise<{ id: string }> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Neautentificat. Te rugăm să te autentifici.");
  }

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

  const textGenerat = stripMarkdown(
    completion.choices[0]?.message?.content?.trim() ?? ""
  );

  const contestatie = await prisma.contestatie.create({
    data: {
      userId: session.user.id,
      tip: input.tip,
      datePersonale: input.datePersonale,
      dateAmenda: input.dateAmenda,
      motiveCustom: input.motiveCustom || null,
      motivePredefinite: input.motiveSelectate,
      textGenerat,
      status: "generat",
    },
  });

  return { id: contestatie.id };
}
