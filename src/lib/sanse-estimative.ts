export type NivelSanse = "ridicate" | "medii" | "reduse";

export interface EvaluareSanse {
  nivel: NivelSanse;
  scor: number; // 0-100
  motivePuternice: string[];
  motiveSlabe: string[];
  explicatie: string;
}

// Scor per motiv: 3 = puternic, 2 = mediu, 1 = slab
const SCOR_MOTIV: Record<string, number> = {
  // ── Puternice (3) — vicii procedurale clare, instanțele le admit frecvent ──
  "Termenul de înmânare a procesului verbal a fost depășit": 3,
  "Prescripție extinctivă": 3,
  "Nu eram eu la volan la momentul constatării": 3,
  "Eroare de calcul în actul administrativ": 3,
  "Procesul verbal nu a fost semnat de agentul constatator": 3,

  // ── Medii (2) — valide, dar depind de probe ──
  "Aparatul radar nu era omologat sau verificat metrologic": 2,
  "Procesul verbal conține erori materiale": 2,
  "Procedura nu a fost respectată": 2,
  "Procedura de control nu a fost respectată": 2,
  "Nu am fost notificat în prealabil": 2,
  "Nu am primit înștiințarea prealabilă": 2,
  "Indicatorul de viteză/semnalizare nu era vizibil": 2,
  "Actul administrativ este nelegal": 2,
  "Actul administrativ este nelegal întocmit": 2,
  "Lipsa contradicționalității": 2,
  "Fapta nu constituie contravenție conform legislației muncii": 2,

  // ── Slabe (1) — argumentare generică, greu de probat ──
  "Semnalizarea rutieră lipsea sau era ambiguă": 1,
  "Actul administrativ este emis cu exces de putere": 1,
  "Fapta nu constituie contravenție": 1,
  "Actul administrativ este nelegal (generic)": 1,
};

const EXPLICATII: Record<NivelSanse, string> = {
  ridicate:
    "Contestația se bazează pe vicii procedurale sau erori formale clare, pe care instanțele le admit în mod frecvent.",
  medii:
    "Argumentele sunt valide, dar succesul depinde de probele pe care le poți prezenta în instanță.",
  reduse:
    "Motivele invocate sunt generice și greu de probat fără dovezi concrete. Consultă un avocat pentru a evalua situația.",
};

export function evalueazaSanse(
  motiveSelectate: string[],
  motiveCustom?: string | null
): EvaluareSanse {
  const motivePuternice: string[] = [];
  const motiveSlabe: string[] = [];
  let scorTotal = 0;
  let nrMotive = 0;

  for (const motiv of motiveSelectate) {
    const scor = SCOR_MOTIV[motiv];
    if (scor !== undefined) {
      scorTotal += scor;
      nrMotive++;
      if (scor === 3) motivePuternice.push(motiv);
      else if (scor === 1) motiveSlabe.push(motiv);
    } else {
      // motiv predefinit fără scor explicit → tratăm ca mediu
      scorTotal += 2;
      nrMotive++;
    }
  }

  // motiv custom fără selecție → nu putem evalua, dar adăugăm puțin
  if (motiveCustom?.trim() && nrMotive === 0) {
    scorTotal = 2;
    nrMotive = 1;
  }

  if (nrMotive === 0) {
    return {
      nivel: "reduse",
      scor: 20,
      motivePuternice: [],
      motiveSlabe: [],
      explicatie: EXPLICATII.reduse,
    };
  }

  const scorMediu = scorTotal / nrMotive;

  // Dacă există cel puțin un motiv puternic → ridicate
  const areMotivPuternic = motivePuternice.length > 0;
  // Scor mediu ≥ 2.5 → ridicate, ≥ 1.5 → medii, < 1.5 → reduse
  let nivel: NivelSanse;
  let scorAfișat: number;

  if (areMotivPuternic || scorMediu >= 2.5) {
    nivel = "ridicate";
    scorAfișat = Math.min(90, 65 + motivePuternice.length * 8);
  } else if (scorMediu >= 1.5) {
    nivel = "medii";
    scorAfișat = Math.round(40 + scorMediu * 10);
  } else {
    nivel = "reduse";
    scorAfișat = Math.round(10 + scorMediu * 10);
  }

  return {
    nivel,
    scor: scorAfișat,
    motivePuternice,
    motiveSlabe,
    explicatie: EXPLICATII[nivel],
  };
}
