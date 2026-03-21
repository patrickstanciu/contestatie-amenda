import { LandingPage, generateLandingMetadata } from "@/components/landing-page";

const config = {
  tip: "primarie",
  emoji: "🏙️",
  title: "Contestație Amendă Primărie — Model Generat cu AI",
  metaTitle: "Contestație Amendă Primărie | ContestațieAI",
  metaDescription: "Contestă o amendă de la Primărie în 3 minute. Parcare, salubritate, construcții neautorizate — generăm plângerea contravențională profesional.",
  keywords: ["contestatie amenda primarie", "contestatie amenda parcare", "plangere contraventionala primarie", "contestatie amenda salubritate", "model contestatie primarie"],
  intro: "Ai primit o amendă de la Primărie pentru parcare, salubritate, construcții sau alte contravenții administrative? Poți contesta în termen de 15 zile. ContestațieAI generează automat plângerea contravențională.",
  motiveTitle: "Motive frecvente pentru contestarea amenzilor de la Primărie",
  motive: [
    "Procesul verbal este nelegal întocmit (lipsă semnătură, date incomplete)",
    "Fapta nu constituie contravenție conform regulamentului local",
    "Nu ai primit înștiințarea prealabilă obligatorie",
    "Actul administrativ este emis cu exces de putere",
    "Termenul de înmânare a procesului verbal a fost depășit",
    "Prescripție extinctivă",
  ],
  termen: "15 zile de la data comunicării procesului verbal (OG 2/2001, Art. 31). Dacă nu ai primit PV-ul în mână, termenul curge de la data afișării.",
  unde: "Plângerea se depune la Judecătoria în a cărei rază teritorială se află sediul Primăriei emitente. Poți depune fizic sau online prin portal.just.ro.",
  faq: [
    {
      q: "Pot contesta o amendă de parcare?",
      a: "Da. Amenzile de parcare sunt contravenții administrative și pot fi contestate în 15 zile. Motive frecvente: indicatoare lipsite, PV incomplet, agent necompetent.",
    },
    {
      q: "Ce se întâmplă dacă nu contest în 15 zile?",
      a: "Amenda devine executorie și poate fi pusă în executare silită. Nu mai poți contesta pe cale judiciară, dar poți face o contestație la executare dacă procedura de executare e viciată.",
    },
    {
      q: "Amenda se suspendă când depun contestație?",
      a: "Da. Depunerea plângerii contravenţionale suspendă executarea sancţiunii până la soluţionarea definitivă (OG 2/2001, Art. 32). Nu ești obligat să plătești pe durata procesului.",
    },
  ],
};

export const metadata = generateLandingMetadata(config);

export default function ContestatiePrimariePage() {
  return <LandingPage config={config} />;
}
