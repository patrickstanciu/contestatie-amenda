import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function HomePage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-4 py-24 sm:py-32 text-center bg-gradient-to-b from-muted/50 to-background">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="inline-flex items-center rounded-full border border-border bg-muted px-4 py-1.5 text-m text-muted-foreground">
            🤖 Powered by GPT-5.4-mini
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
            Contestă orice amendă administrativă cu{" "}
            <span className="text-primary">AI</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Generăm contestații administrative profesionale în câteva minute.
            Completezi un formular simplu, AI-ul redactează documentul legal, tu
            îl descarci și îl trimiți.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button render={<Link href="/login" />} size="lg" className="text-base px-8">
              Generează o contestație
            </Button>
            <Button render={<Link href="/login" />} size="lg" variant="outline" className="text-base px-8">
              Intră în cont
            </Button>
          </div>
        </div>
      </section>

      <Separator />

      {/* Features */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">De ce ContestațieAI?</h2>
            <p className="mt-3 text-muted-foreground text-lg">
              Tot ce ai nevoie pentru a contesta o amendă, într-un singur loc.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="text-4xl mb-2">📋</div>
                <CardTitle>Formular simplu</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-m leading-relaxed">
                  Completezi un formular pas cu pas cu datele tale și ale
                  amenzii. Fără jargon juridic, fără complicații.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="text-4xl mb-2">🤖</div>
                <CardTitle>Generat cu GPT-5.4-mini</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-m leading-relaxed">
                  Modelul GPT-5.4-mini redactează o contestație juridică formală,
                  adaptată tipului de amendă și motivelor tale.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="text-4xl mb-2">📄</div>
                <CardTitle>Export PDF</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-m leading-relaxed">
                  Descarcă contestația gata formatată ca PDF, pregătită pentru
                  a fi trimisă autorității competente.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator />

      {/* How it works */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Cum funcționează?</h2>
            <p className="mt-3 text-muted-foreground text-lg">
              Trei pași simpli și contestația ta este gata.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Completezi formularul",
                desc: "Introduci datele tale personale, detaliile amenzii și alegi motivele de contestare.",
                emoji: "✏️",
              },
              {
                step: "2",
                title: "AI generează contestația",
                desc: "GPT-5.4-mini redactează o contestație profesională în limbaj juridic formal, conform legislației române.",
                emoji: "⚡",
              },
              {
                step: "3",
                title: "Descarci PDF-ul",
                desc: "Documentul final este disponibil instant pentru descărcare și trimitere.",
                emoji: "✅",
              },
            ].map(({ step, title, desc, emoji }) => (
              <div key={step} className="flex flex-col items-center text-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold shadow-md">
                  {step}
                </div>
                <div className="text-3xl">{emoji}</div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-muted-foreground text-m leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button render={<Link href="/login" />} size="lg" className="text-base px-10">
              Începe acum — e gratuit
            </Button>
          </div>
        </div>
      </section>

      <Separator />

      {/* SEO internal links */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight">Tipuri de contestații</h2>
            <p className="mt-2 text-muted-foreground">Ghiduri detaliate pentru fiecare tip de amendă</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: "/contestatie-radar", emoji: "🚗", title: "Contestație Amendă Radar", desc: "Radar neomologat, termen depășit, erori în PV" },
              { href: "/contestatie-anaf", emoji: "🏛️", title: "Contestație Decizie ANAF", desc: "Decizii de impunere, amenzi fiscale, TVA" },
              { href: "/contestatie-primarie", emoji: "🏙️", title: "Contestație Amendă Primărie", desc: "Parcare, salubritate, contravenții administrative" },
              { href: "/contestatie-itm", emoji: "👷", title: "Contestație Amendă ITM", desc: "Control muncă, legislația muncii" },
            ].map(({ href, emoji, title, desc }) => (
              <Link key={href} href={href} className="group rounded-xl border border-border p-5 hover:border-primary/50 hover:bg-muted/30 transition-all space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{emoji}</span>
                  <span className="font-semibold group-hover:text-primary transition-colors">{title}</span>
                </div>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* FAQ with JSON-LD */}
      <section className="py-16 px-4 bg-muted/20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                { "@type": "Question", name: "Cât costă să contest o amendă?", acceptedAnswer: { "@type": "Answer", text: "Plângerile contravenționale sunt scutite de taxă de timbru (OUG 80/2013). ContestațieAI este gratuit pentru generarea documentului." } },
                { "@type": "Question", name: "În cât timp trebuie să contest o amendă?", acceptedAnswer: { "@type": "Answer", text: "15 zile de la data comunicării procesului verbal pentru contravenții (OG 2/2001), sau 30 de zile pentru actele ANAF (Legea 207/2015)." } },
                { "@type": "Question", name: "Trebuie să plătesc amenda dacă o contest?", acceptedAnswer: { "@type": "Answer", text: "Nu. Depunerea plângerii contravenţionale suspendă executarea sancţiunii până la soluţionarea definitivă a cauzei." } },
                { "@type": "Question", name: "Merită să contest o amendă?", acceptedAnswer: { "@type": "Answer", text: "Da, mai ales dacă există vicii procedurale. Instanțele admit frecvent contestațiile bazate pe erori formale. Nu riști nimic — contestația nu atrage costuri suplimentare." } },
              ],
            }),
          }}
        />
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-center mb-8">Întrebări frecvente</h2>
          <div className="space-y-4">
            {[
              { q: "Cât costă să contest o amendă?", a: "Plângerile contravenționale sunt scutite de taxă de timbru (OUG 80/2013). ContestațieAI este gratuit pentru generarea documentului." },
              { q: "În cât timp trebuie să contest o amendă?", a: "15 zile de la data comunicării procesului verbal pentru contravenții (OG 2/2001), sau 30 de zile pentru actele ANAF (Legea 207/2015)." },
              { q: "Trebuie să plătesc amenda dacă o contest?", a: "Nu. Depunerea plângerii contravenţionale suspendă executarea sancţiunii până la soluţionarea definitivă a cauzei (OG 2/2001, Art. 32)." },
              { q: "Merită să contest o amendă?", a: "Da, mai ales dacă există vicii procedurale. Instanțele admit frecvent contestațiile bazate pe erori formale. Nu riști nimic — contestația nu atrage costuri suplimentare." },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-border bg-background p-5 space-y-2">
                <p className="font-semibold">{q}</p>
                <p className="text-sm text-muted-foreground">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

