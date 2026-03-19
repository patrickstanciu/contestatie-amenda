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
    dataComunicare?: string;
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
  const esteANAF = tip === 'anaf';

  const denumireAct = esteANAF ? "Contestație Administrativă" : "Plângere Contravențională";
  const destinatar = esteANAF ? `unității emitente ${dateAmenda.emitent}` : "Judecătoriei competente";

  const temeiuriSuplimentare: Record<string, string> = {
    anaf: "Codul de Procedură Fiscală (Legea 207/2015), Art. 336-339",
    politie_rutiera: "OUG 195/2002 privind circulația pe drumurile publice, HG 1391/2006",
    primarie: "Legea 215/2001 a administrației publice locale, OG 2/2001",
    itm: "Legea 108/1999 (Codul Muncii), Legea 252/2003 privind registrul de evidență a salariaților",
    isctr: "OG 27/2011 privind transporturile rutiere, Legea 38/2003",
    altele: "OG 2/2001 privind regimul juridic al contravențiilor, Legea 554/2004",
  };
  const temeiSpecific = temeiuriSuplimentare[tip] ?? temeiuriSuplimentare.altele;

  const motiveLista = [
    ...motiveSelectate,
    ...(motiveCustom.trim() ? [motiveCustom.trim()] : []),
  ]
      .map((m, i) => `${i + 1}. ${m}`)
      .join("\n");

  return `Generează corpul unei ${denumireAct} formale în limba română, adresată către ${destinatar}.

DATELE CAZULUI:
- Petent: ${datePersonale.numePrenume}, CNP ${datePersonale.cnp}, ${datePersonale.adresa}, jud. ${datePersonale.judet}
- Autoritate emitentă: ${TIP_LABELS[tip] ?? tip} — ${dateAmenda.emitent}
- Nr. proces verbal: ${dateAmenda.nrProcesVerbal}, data: ${dateAmenda.dataAmenda}
- Data comunicării (primirii PV): ${dateAmenda.dataComunicare || "nespecificată"}
- Suma amenzii: ${dateAmenda.suma} RON
- Temei legal invocat în PV: ${dateAmenda.temeiLegal || "nedeclarat"}
- Fapta reținută: ${dateAmenda.descriereFapta}
- Motive de contestare:
${motiveLista}

INSTRUCȚIUNI JURIDICE SPECIALE:
1. Dacă motivele includ erori de sistem sau prescripție, dezvoltă argumentația pe nulitatea absolută a procesului-verbal conform Art. 16 și 17 din OG 2/2001.
2. În secțiunea PETIT, solicită OBLIGATORIU, în mod subsidiar, înlocuirea amenzii cu AVERTISMENT conform Art. 7 din OG 2/2001, motivând prin buna credință a contribuabilului și lipsa pericolului social.
3. Invocă obligatoriu legislația specifică: ${temeiSpecific}.
4. Menționează jurisprudența CEDO (cauza Anghel v. România) privind prezumția de nevinovăție în materie contravențională (asimilitată materiei penale).

INSTRUCȚIUNI DE FORMAT — respectă-le cu strictețe:
- NU include antet, adrese sau titlul documentului — acestea sunt adăugate automat.
- NU folosi markdown (fără **, fără #, fără _), HTML sau alte sintaxe de formatare.
- Titlurile de secțiune se scriu CU MAJUSCULE pe o linie separată, urmate de o linie goală.
- Paragrafele se separă printr-o linie goală.
- Textul trebuie să fie plain text, gata de inclus într-un document oficial.

STRUCTURA CORPULUI (în această ordine):
1. INTRODUCERE — identificarea actului contestat (PV nr. ${dateAmenda.nrProcesVerbal})
2. TEMEI LEGAL — OG 2/2001, Legea 554/2004 și ${temeiSpecific}
3. MOTIVE DE FAPT ȘI DE DREPT — argumentează fiecare motiv detaliat și separat, incluzând referința la cauza Anghel v. România
4. PETIT — solicitarea principală (anulare PV, restituire sumă) și solicitarea subsidiară (înlocuire cu avertisment)
5. PROBE SOLICITATE (înscrisuri, log-uri tehnice, recipise, etc.)
6. MENȚIUNE SCUTIRE TAXĂ DE TIMBRU (art. 7 OUG 80/2013)

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
