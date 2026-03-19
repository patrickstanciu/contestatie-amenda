"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";

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

  return `Generează o contestație administrativă formală în limba română cu următoarele date:

**PETENT:**
- Nume și prenume: ${datePersonale.numePrenume}
- CNP: ${datePersonale.cnp}
- Adresă: ${datePersonale.adresa}, județul ${datePersonale.judet}
- Telefon: ${datePersonale.telefon}
- Email: ${datePersonale.email}

**AUTORITATE EMITENTĂ:**
- ${TIP_LABELS[tip] ?? tip}
- Emitent specific: ${dateAmenda.emitent}

**PROCESUL VERBAL CONTESTAT:**
- Număr proces verbal: ${dateAmenda.nrProcesVerbal}
- Data amenzii: ${dateAmenda.dataAmenda}
- Suma amenzii: ${dateAmenda.suma} RON
- Temei legal invocat: ${dateAmenda.temeiLegal || "nedeclacat"}
- Descrierea faptei reținute: ${dateAmenda.descriereFapta}

**MOTIVE DE CONTESTARE:**
${motiveLista}

Redactează contestația urmând structura:
1. Antet cu datele petentului și ale autorității destinatare
2. Titlu: "CONTESTAȚIE" (centrat, bold)
3. Introducere: identificarea actului contestat
4. Temei legal al contestației (OG 2/2001, Legea 554/2004 după caz)
5. Motive de fapt și de drept — argumentează fiecare motiv în mod detaliat și separat
6. Petit — solicită anularea procesului verbal și restituirea sumei achitate (dacă este cazul)
7. Probe solicitate
8. Mențiune că este scutit de taxă de timbru conform art. 7 din OUG 80/2013
9. Semnătură și dată

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
    model: "gpt-4o",
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
    max_tokens: 3000,
  });

  const textGenerat =
    completion.choices[0]?.message?.content?.trim() ?? "";

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
