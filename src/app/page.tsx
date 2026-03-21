import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { articles } from "@/lib/articles";

export default async function HomePage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-4 py-20 sm:py-28 text-center bg-gradient-to-b from-accent/40 via-background to-background">
        <div className="mx-auto max-w-3xl space-y-7">
          {/* Free badge — very prominent */}
          <div className="flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700 px-4 py-1.5 text-sm font-semibold">
              🎁 100% Gratuit — fără abonament, fără card
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              ⚖️ Contestații administrative generate cu AI
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Contestă amenda în{" "}
            <span className="text-primary">3 minute</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Completezi un formular simplu, AI-ul redactează contestația în limbaj juridic profesional, tu o descarci și o trimiți.{" "}
            <strong className="text-foreground">Scutit de taxă de timbru.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-1">
            <Button render={<Link href="/login" />} size="lg" className="text-base px-8 shadow-md">
              Generează contestația acum — gratuit →
            </Button>
          </div>
          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground">
            <span>⚡ Gata în 3 minute</span>
            <span>📄 Export PDF</span>
            <span>📊 Estimare șanse de câștig</span>
            <span>🏛️ Instanță detectată automat</span>
            <span>🔒 Date securizate</span>
          </div>
        </div>
      </section>

      <Separator />

      {/* Features grid */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Tot ce ai nevoie, inclus gratuit</h2>
            <p className="mt-3 text-muted-foreground text-lg">
              Nu plătești nimic. Nicio funcționalitate ascunsă după un paywall.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Feature: AI generation */}
            <div className="rounded-xl border border-border bg-card p-6 space-y-3">
              <div className="text-3xl">🤖</div>
              <h3 className="font-semibold text-base">Generare AI profesională</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                GPT-5.4-mini redactează o contestație în limbaj juridic formal, adaptată tipului de amendă și motivelor selectate.
              </p>
            </div>

            {/* Feature: Estimare sanse — highlighted */}
            <div className="rounded-xl border-2 border-primary/40 bg-primary/5 p-6 space-y-3 relative">
              <div className="absolute -top-3 right-4 text-xs font-semibold bg-primary text-primary-foreground px-2.5 py-0.5 rounded-full">
                Unic
              </div>
              <div className="text-3xl">📊</div>
              <h3 className="font-semibold text-base">Estimare șanse de câștig</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Analizăm motivele selectate și îți arătăm o probabilitate estimată de succes (Ridicate / Medii / Reduse), cu bara de progres și explicații clare.
              </p>
              {/* Mini preview */}
              <div className="rounded-lg bg-background border border-border p-3 space-y-2 mt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Probabilitate estimată</span>
                  <span className="text-xs font-semibold text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/40 px-2 py-0.5 rounded-full">🟢 Ridicate</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-green-500" style={{ width: "73%" }} />
                </div>
                <p className="text-xs text-muted-foreground">73% — Vicii procedurale clare detectate</p>
              </div>
            </div>

            {/* Feature: PDF */}
            <div className="rounded-xl border border-border bg-card p-6 space-y-3">
              <div className="text-3xl">📄</div>
              <h3 className="font-semibold text-base">Export PDF gata de trimis</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Contestația este formatată automat ca PDF cu toate câmpurile completate, gata să fie tipărită sau trimisă prin poștă/email.
              </p>
            </div>

            {/* Feature: Termen */}
            <div className="rounded-xl border border-border bg-card p-6 space-y-3">
              <div className="text-3xl">📅</div>
              <h3 className="font-semibold text-base">Calcul termen de contestare</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Introduci data procesului verbal și îți arătăm dacă mai ești în termen legal (15 zile pentru contravenții, 30 pentru ANAF). Avertizare clară dacă termenul a expirat.
              </p>
            </div>

            {/* Feature: Instanta */}
            <div className="rounded-xl border border-border bg-card p-6 space-y-3">
              <div className="text-3xl">🏛️</div>
              <h3 className="font-semibold text-base">Instanță detectată automat</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Pe baza județului tău, detectăm automat judecătoria competentă, cu adresa exactă și linkul către portalul instanței pentru depunere online.
              </p>
            </div>

            {/* Feature: Editor */}
            <div className="rounded-xl border border-border bg-card p-6 space-y-3">
              <div className="text-3xl">✏️</div>
              <h3 className="font-semibold text-base">Editor text înainte de descărcare</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Poți modifica textul generat direct în browser înainte să îl descarci. Sau îl copiezi în clipboard cu un singur click.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Free callout banner */}
      <section className="py-12 px-4 bg-green-50 dark:bg-green-950/30 border-y border-green-100 dark:border-green-900">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <div className="text-4xl">🎁</div>
          <h2 className="text-2xl font-bold tracking-tight text-green-900 dark:text-green-100">
            ContestațieAI este complet gratuit
          </h2>
          <p className="text-green-800 dark:text-green-300 text-base leading-relaxed max-w-xl mx-auto">
            Fără abonament lunar, fără card de credit, fără costuri ascunse.
            Generezi contestația, o descarci PDF și o trimiți — tot procesul este gratuit.
            Contestațiile sunt scutite de taxă de timbru prin lege (OUG 80/2013).
          </p>
          <Button render={<Link href="/login" />} size="lg" className="bg-green-700 hover:bg-green-800 text-white text-base px-10 shadow-md mt-2">
            Încearcă gratuit acum →
          </Button>
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
                desc: "Introduci datele personale, detaliile amenzii și alegi motivele de contestare din lista predefinită sau scrii propria motivare.",
                emoji: "✏️",
              },
              {
                step: "2",
                title: "AI generează + analizează",
                desc: "GPT-5.4-mini redactează contestația profesională, iar sistemul îți estimează șansele de succes și calculează termenul legal.",
                emoji: "⚡",
              },
              {
                step: "3",
                title: "Editezi și descarci PDF",
                desc: "Verifici textul, îl modifici dacă vrei, apoi descarci PDF-ul gata de trimis la instanța detectată automat.",
                emoji: "✅",
              },
            ].map(({ step, title, desc, emoji }) => (
              <div key={step} className="flex flex-col items-center text-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold shadow-md">
                  {step}
                </div>
                <div className="text-3xl">{emoji}</div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
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

      {/* Blog teaser */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Ghiduri și articole utile</h2>
              <p className="mt-1 text-muted-foreground">Tot ce trebuie să știi despre contestarea amenzilor</p>
            </div>
            <Button render={<Link href="/blog" />} variant="outline" size="sm">
              Vezi toate articolele →
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group rounded-xl border border-border bg-card p-5 hover:border-primary/50 hover:shadow-sm transition-all space-y-3"
              >
                <div className="text-3xl">{article.emoji}</div>
                <div>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {article.category}
                  </span>
                </div>
                <h3 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-3">
                  {article.title}
                </h3>
                <p className="text-xs text-muted-foreground">{article.readTime} min citire</p>
              </Link>
            ))}
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

