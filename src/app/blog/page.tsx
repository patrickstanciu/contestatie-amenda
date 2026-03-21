import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Blog — Ghiduri despre contestarea amenzilor | ContestațieAI",
  description:
    "Ghiduri practice și articole juridice despre contestarea amenzilor în România: termene, motive, proceduri. Informații actualizate pentru 2026.",
  keywords: [
    "contestatie amenda blog",
    "ghid contestatie amenda",
    "cum contesti amenda",
    "termen contestatie",
    "motive contestatie amenda",
  ],
  alternates: {
    canonical: "https://www.contestatieamenda.ro/blog",
  },
  openGraph: {
    title: "Blog — Ghiduri despre contestarea amenzilor",
    description:
      "Ghiduri practice și articole juridice despre contestarea amenzilor în România.",
    url: "https://www.contestatieamenda.ro/blog",
    siteName: "ContestațieAI",
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Blog — Ghiduri despre contestarea amenzilor | ContestațieAI",
    description:
      "Ghiduri practice și articole juridice despre contestarea amenzilor în România.",
  },
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ro-RO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-4 py-16 sm:py-20 text-center bg-gradient-to-b from-accent/40 via-background to-background">
        <div className="mx-auto max-w-2xl space-y-5">
          <div className="text-5xl">📝</div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Blog — Ghiduri despre contestarea amenzilor
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Articole juridice practice scrise în limbaj clar, cu referințe la
            legislația română actualizată. Tot ce trebuie să știi înainte să
            contești o amendă.
          </p>
        </div>
      </section>

      <Separator />

      {/* Articles grid */}
      <section className="py-14 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all flex flex-col overflow-hidden"
              >
                {/* Card top */}
                <div className="p-6 flex flex-col gap-4 flex-1">
                  {/* Emoji + category */}
                  <div className="flex items-center justify-between">
                    <span className="text-4xl">{article.emoji}</span>
                    <Badge variant="secondary">{article.category}</Badge>
                  </div>
                  {/* Title */}
                  <h2 className="font-semibold text-base leading-snug group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>
                  {/* Intro excerpt */}
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {article.intro}
                  </p>
                </div>
                {/* Card footer */}
                <div className="px-6 py-3 border-t border-border bg-muted/30 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>🕐 {article.readTime} min lectură</span>
                  <span>·</span>
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* CTA */}
      <section className="py-14 px-4 bg-green-50 dark:bg-green-950/30 border-y border-green-100 dark:border-green-900">
        <div className="mx-auto max-w-2xl text-center space-y-4">
          <div className="text-4xl">⚖️</div>
          <h2 className="text-2xl font-bold tracking-tight text-green-900 dark:text-green-100">
            Gata să contești?
          </h2>
          <p className="text-green-800 dark:text-green-300 text-base max-w-md mx-auto">
            Generează contestația acum cu AI — document profesional în 5 minute,
            complet gratuit, scutit de taxă de timbru.
          </p>
          <Button
            render={<Link href="/login" />}
            size="lg"
            className="bg-green-700 hover:bg-green-800 text-white text-base px-10 shadow-md mt-2"
          >
            Generează contestația acum — gratuit →
          </Button>
        </div>
      </section>
    </div>
  );
}
