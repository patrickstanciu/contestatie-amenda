import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface LandingPageConfig {
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  emoji: string;
  intro: string;
  motiveTitle: string;
  motive: string[];
  termen: string;
  unde: string;
  faq: { q: string; a: string }[];
  tip: string;
}

export function generateLandingMetadata(config: LandingPageConfig): Metadata {
  return {
    title: config.metaTitle,
    description: config.metaDescription,
    keywords: config.keywords,
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      url: `https://www.contestatieamenda.ro`,
      siteName: "ContestațieAI",
      locale: "ro_RO",
      type: "website",
    },
  };
}

export function LandingPage({ config }: Readonly<{ config: LandingPageConfig }>) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 space-y-12">
        {/* Hero */}
        <section className="text-center space-y-5">
          <div className="text-5xl">{config.emoji}</div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{config.title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {config.intro}
          </p>
          <Button render={<Link href="/login" />} size="lg" className="text-base px-8">
            Generează contestația acum
          </Button>
        </section>

        {/* Motive */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">{config.motiveTitle}</h2>
          <ul className="space-y-2">
            {config.motive.map((m) => (
              <li key={m} className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-0.5">✓</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Termen + unde */}
        <section className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-muted/30 p-5 space-y-2">
            <p className="font-semibold">⏰ Termen legal</p>
            <p className="text-sm text-muted-foreground">{config.termen}</p>
          </div>
          <div className="rounded-xl border border-border bg-muted/30 p-5 space-y-2">
            <p className="font-semibold">📍 Unde depui</p>
            <p className="text-sm text-muted-foreground">{config.unde}</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Întrebări frecvente</h2>
          <div className="space-y-4">
            {config.faq.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-border p-5 space-y-2">
                <p className="font-semibold">{q}</p>
                <p className="text-sm text-muted-foreground">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA bottom */}
        <section className="text-center space-y-4 py-6 border-t border-border">
          <p className="font-semibold text-lg">Gata să contești amenda?</p>
          <p className="text-muted-foreground text-sm">Generezi contestația în 3 minute, complet gratuit.</p>
          <Button render={<Link href="/login" />} size="lg" className="text-base px-8">
            Începe acum — e gratuit
          </Button>
        </section>
      </div>
    </>
  );
}
