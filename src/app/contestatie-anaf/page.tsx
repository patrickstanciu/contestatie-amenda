import { LandingPage, generateLandingMetadata } from "@/components/landing-page";

const config = {
  tip: "anaf",
  emoji: "🏛️",
  title: "Contestație Decizie ANAF — Model Generat cu AI",
  metaTitle: "Contestație ANAF | ContestațieAI",
  metaDescription: "Contestă o decizie ANAF în 5 minute. Generăm automat o contestație fiscală profesională — impozite, TVA, amenzi fiscale, decizii de impunere.",
  keywords: ["contestatie ANAF", "contestatie decizie impunere", "contestatie amenda fiscala", "contestatie TVA", "model contestatie ANAF"],
  intro: "Ai primit o decizie de impunere, o amendă fiscală sau un act administrativ fiscal de la ANAF cu care nu ești de acord? Poți contesta în termen de 30 de zile. ContestațieAI generează automat contestația fiscală, conform Codului de procedură fiscală.",
  motiveTitle: "Motive frecvente pentru contestarea deciziilor ANAF",
  motive: [
    "Eroare de calcul în actul administrativ fiscal",
    "Procedura de notificare prealabilă nu a fost respectată",
    "Prescripție extinctivă — termenul legal de impunere a expirat",
    "Lipsa contradicționalității în procedura de control",
    "Actul administrativ fiscal este nelegal sau nemotivat",
    "Dublă impunere sau impunere pentru aceeași perioadă",
  ],
  termen: "30 de zile de la data comunicării actului administrativ fiscal (Legea 207/2015, Art. 270). Contestația se depune la organul fiscal emitent, nu la instanță.",
  unde: "Contestația se depune la unitatea ANAF care a emis actul. Poți depune fizic, prin poștă cu confirmare de primire, sau prin Spațiul Privat Virtual (SPV) la anaf.ro.",
  faq: [
    {
      q: "Care este termenul pentru contestarea unei decizii ANAF?",
      a: "30 de zile de la data comunicării actului administrativ fiscal, conform Art. 270 din Codul de procedură fiscală (Legea 207/2015). Termenul se calculează de la data la care ai primit actul.",
    },
    {
      q: "Unde se depune contestația la ANAF?",
      a: "Contestația se depune la organul fiscal emitent al actului contestat — nu la instanță. Dacă ANAF respinge contestația, poți ataca decizia la instanța de contencios administrativ.",
    },
    {
      q: "Suspendă contestația obligația de plată?",
      a: "Nu automat. Poți solicita separat suspendarea executării actului administrativ fiscal (Art. 278 Cod procedură fiscală), de obicei cu o garanție bancară.",
    },
    {
      q: "Trebuie avocat pentru o contestație ANAF?",
      a: "Nu este obligatoriu, dar recomandat pentru sume mari. ContestațieAI generează un document de bază solid — pentru cazuri complexe, consultă un consultant fiscal sau avocat.",
    },
  ],
};

export const metadata = generateLandingMetadata(config);

export default function ContestatieAnafPage() {
  return <LandingPage config={config} />;
}
