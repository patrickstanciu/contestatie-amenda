import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/lib/articles";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  const url = `https://www.contestatieamenda.ro/blog/${article.slug}`;
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: [
      "contestatie amenda",
      article.category.toLowerCase(),
      article.slug.replace(/-/g, " "),
    ],
    alternates: { canonical: url },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      url,
      siteName: "ContestațieAI",
      locale: "ro_RO",
      type: "article",
      publishedTime: article.publishedAt,
    },
    twitter: {
      card: "summary",
      title: article.metaTitle,
      description: article.metaDescription,
    },
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("ro-RO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticlePage({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const articleUrl = `https://www.contestatieamenda.ro/blog/${article.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.publishedAt,
    author: {
      "@type": "Organization",
      name: "ContestațieAI",
      url: "https://www.contestatieamenda.ro",
    },
    publisher: {
      "@type": "Organization",
      name: "ContestațieAI",
      url: "https://www.contestatieamenda.ro",
    },
    url: articleUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleJsonLd, faqJsonLd]),
        }}
      />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="px-4 py-3 bg-muted/30 border-b border-border"
      >
        <ol className="mx-auto max-w-3xl flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          <li>
            <Link href="/" className="hover:text-foreground transition-colors">
              Acasă
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>
            <Link
              href="/blog"
              className="hover:text-foreground transition-colors"
            >
              Blog
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">
            {article.title}
          </li>
        </ol>
      </nav>

      {/* Article header */}
      <header className="px-4 py-10 sm:py-14 bg-gradient-to-b from-accent/30 via-background to-background">
        <div className="mx-auto max-w-3xl space-y-5">
          <div className="text-5xl sm:text-6xl">{article.emoji}</div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary">{article.category}</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            {article.title}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {article.intro}
          </p>
          <div className="flex items-center gap-3 text-sm text-muted-foreground pt-1">
            <span>🕐 {article.readTime} min lectură</span>
            <span>·</span>
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>
          </div>
        </div>
      </header>

      <Separator />

      {/* Article body */}
      <article className="px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-3xl space-y-10">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-4">
                <span className="mr-2">{section.emoji}</span>
                {section.heading}
              </h2>
              <div className="prose-like space-y-3 text-foreground/90 [&_p]:leading-relaxed [&_ul]:mt-2 [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_ul]:list-disc [&_ol]:mt-2 [&_ol]:space-y-1.5 [&_ol]:pl-5 [&_ol]:list-decimal [&_li]:leading-relaxed [&_strong]:font-semibold [&_em]:italic [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary/80">
                {section.content}
              </div>
            </section>
          ))}

          <Separator />

          {/* FAQ */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-6">
              ❓ Întrebări frecvente
            </h2>
            <div className="space-y-4">
              {article.faq.map(({ q, a }) => (
                <div
                  key={q}
                  className="rounded-xl border border-border bg-muted/20 p-5 space-y-2"
                >
                  <h3 className="font-semibold text-base">{q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </article>

      <Separator />

      {/* CTA */}
      <section className="px-4 py-12 bg-green-50 dark:bg-green-950/30 border-y border-green-100 dark:border-green-900">
        <div className="mx-auto max-w-2xl text-center space-y-4">
          <div className="text-4xl">⚖️</div>
          <h2 className="text-2xl font-bold tracking-tight text-green-900 dark:text-green-100">
            Generează contestația acum
          </h2>
          <p className="text-green-800 dark:text-green-300 text-base max-w-md mx-auto">
            Document profesional generat cu AI în 5 minute — complet gratuit,
            scutit de taxă de timbru prin lege.
          </p>
          <Button
            render={<Link href="/login" />}
            size="lg"
            className="bg-green-700 hover:bg-green-800 text-white text-base px-10 shadow-md mt-2"
          >
            Încearcă gratuit →
          </Button>
          <p className="text-xs text-green-700 dark:text-green-500">
            Fără card, fără abonament, 100% gratuit
          </p>
        </div>
      </section>
    </div>
  );
}
