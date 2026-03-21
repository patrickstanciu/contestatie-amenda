import { LandingPage, generateLandingMetadata } from "@/components/landing-page";

const config = {
  tip: "politie_rutiera",
  emoji: "🚗",
  title: "Contestație Amendă Radar — Model Generat cu AI",
  metaTitle: "Contestație Amendă Radar | ContestațieAI",
  metaDescription: "Contestă amenda de la radar în 3 minute. Generăm automat o plângere contravențională profesională pe baza motivelor tale — aparatul neomologat, vitezoze neclare, erori în PV.",
  keywords: ["contestatie amenda radar", "contestatie amenda viteza", "plangere contraventionala radar", "contestatie radar neomologat", "model contestatie amenda"],
  intro: "Ai primit o amendă pentru viteză sau alt motiv constatat cu radar? Poți contesta procesul verbal în termen de 15 zile. ContestațieAI generează automat o plângere contravențională profesională, adaptată motivelor tale specifice.",
  motiveTitle: "Motive frecvente pentru contestarea amenzilor de radar",
  motive: [
    "Aparatul radar nu era omologat sau verificat metrologic",
    "Indicatorul de viteză sau semnalizarea nu era vizibil/ă",
    "Procesul verbal conține erori materiale (dată, oră, loc)",
    "Termenul de înmânare a procesului verbal a fost depășit",
    "Nu erai tu la volan la momentul constatării faptei",
    "Semnalizarea rutieră lipsea sau era ambiguă",
  ],
  termen: "15 zile de la data comunicării procesului verbal (OG 2/2001, Art. 31). Termenul se calculează de la data la care ai primit PV-ul, nu de la data faptei.",
  unde: "Plângerea se depune la Judecătoria competentă din raza locului unde a fost constatată contravenția. Poți depune fizic sau online prin portal.just.ro.",
  faq: [
    {
      q: "Merită să contești o amendă de radar?",
      a: "Da, mai ales dacă există vicii procedurale (termen depășit, PV incomplet, radar neomologat). Instanțele admit frecvent contestațiile bazate pe erori formale. Chiar dacă nu câștigi, nu riști nimic — contestația suspendă obligația de plată până la soluționare.",
    },
    {
      q: "Cât durează o contestație la amendă?",
      a: "Judecătoriile soluționează de obicei în 3-6 luni. Pe durata procesului, amenda este suspendată — nu ești obligat să plătești.",
    },
    {
      q: "Trebuie să plătesc amenda dacă o contest?",
      a: "Nu. Depunerea plângerii contravenţionale suspendă executarea sancţiunii până la soluţionarea definitivă a cauzei (OG 2/2001, Art. 32).",
    },
    {
      q: "Trebuie să merg în instanță?",
      a: "Depinde de judecătorie. Unele cazuri se soluționează fără prezență, altele necesită un termen. ContestațieAI generează documentul — prezența în instanță e opțional/ă în funcție de caz.",
    },
    {
      q: "Cât costă să contest o amendă?",
      a: "Plângerile contravenționale sunt scutite de taxă de timbru (OUG 80/2013). Nu plătești nimic la instanță. ContestațieAI este gratuit pentru generarea documentului.",
    },
  ],
};

export const metadata = generateLandingMetadata(config);

export default function ContestatiRadarPage() {
  return <LandingPage config={config} />;
}
