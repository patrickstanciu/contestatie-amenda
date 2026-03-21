import { LandingPage, generateLandingMetadata } from "@/components/landing-page";

const config = {
  tip: "itm",
  emoji: "👷",
  title: "Contestație Amendă ITM — Model Generat cu AI",
  metaTitle: "Contestație Amendă ITM | ContestațieAI",
  metaDescription: "Contestă o amendă de la Inspectoratul Teritorial de Muncă în 3 minute. Generăm automat plângerea contravențională conform legislației muncii.",
  keywords: ["contestatie amenda ITM", "contestatie inspectorat munca", "plangere contraventionala ITM", "contestatie amenda legislatia muncii"],
  intro: "Ai primit o amendă de la ITM (Inspectoratul Teritorial de Muncă) în urma unui control? Poți contesta în termen de 15 zile. ContestațieAI generează plângerea contravențională conform Codului Muncii și legislației aplicabile.",
  motiveTitle: "Motive frecvente pentru contestarea amenzilor ITM",
  motive: [
    "Procedura de control nu a fost respectată (lipsa legitimației, proces verbal de control incomplet)",
    "Fapta nu constituie contravenție conform legislației muncii în vigoare",
    "Actul administrativ este nelegal — lipsă motivare",
    "Prescripție extinctivă",
    "Erori materiale în procesul verbal",
    "Contravenția a fost deja sancționată (non bis in idem)",
  ],
  termen: "15 zile de la data comunicării procesului verbal (OG 2/2001, Art. 31 coroborat cu Legea 108/1999).",
  unde: "Plângerea se depune la Judecătoria în a cărei rază teritorială se află sediul ITM emitent sau locul săvârșirii contravenției.",
  faq: [
    {
      q: "Pot contesta o amendă ITM primită în urma unui control?",
      a: "Da. Amenzile aplicate de ITM sunt contravenții și pot fi contestate la judecătorie în 15 zile. Verifică dacă procedura de control a fost respectată și dacă PV-ul e complet.",
    },
    {
      q: "Ce documente trebuie să atașez la contestație?",
      a: "Copia procesului verbal de contravenție, copia actelor de înregistrare a firmei, orice probe care contrazic constatările inspectorului (contracte, pontaje, fișe de instruire etc.).",
    },
    {
      q: "Contestația suspendă amenda?",
      a: "Da. Conform OG 2/2001, Art. 32, depunerea plângerii contravenţionale suspendă executarea sancţiunii până la soluţionarea cauzei.",
    },
  ],
};

export const metadata = generateLandingMetadata(config);

export default function ContestatieItmPage() {
  return <LandingPage config={config} />;
}
