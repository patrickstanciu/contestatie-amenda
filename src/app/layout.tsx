import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { CookieBanner } from "@/components/cookie-banner";
import { auth } from "@/auth";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ContestațieAI | Generează contestații administrative cu AI",
  description:
    "Contestă amenzile rapid și profesionist. Generezi o contestație administrativă în 5 minute cu ajutorul inteligenței artificiale — ANAF, Poliție Rutieră, Primărie și altele.",
  metadataBase: new URL("https://www.contestatieamenda.ro"),
  openGraph: {
    title: "ContestațieAI — Contestă amenzile cu AI",
    description: "Generezi o contestație administrativă profesională în 5 minute.",
    url: "https://www.contestatieamenda.ro",
    siteName: "ContestațieAI",
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ContestațieAI — Contestă amenzile cu AI",
    description: "Generezi o contestație administrativă profesională în 5 minute.",
  },
  keywords: ["contestatie amenda", "contestatie administrativă", "contestatie radar", "contestatie ANAF", "plangere contraventionala"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="ro">
      <head>
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18031857239" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
          gtag('js', new Date());
          gtag('config', 'AW-18031857239');
        `}} />
      </head>
      <body
        className={`${inter.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers session={session}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t py-6 mt-8">
            <div className="mx-auto max-w-5xl px-4 flex flex-col items-center gap-3">
              <p className="text-center text-xs text-muted-foreground">
                ⚠️ Documentele sunt generate automat și nu constituie consultanță juridică. Consultați un avocat pentru situații complexe.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
                <a href="/termeni" className="hover:text-foreground transition-colors underline underline-offset-4">Termeni și Condiții</a>
                <a href="/confidentialitate" className="hover:text-foreground transition-colors underline underline-offset-4">Politică de Confidențialitate</a>
                <a href="/cookies" className="hover:text-foreground transition-colors underline underline-offset-4">Politică Cookies</a>
                <span>© {new Date().getFullYear()} TECHNEST LABS SRL</span>
              </div>
            </div>
          </footer>
          <Toaster richColors position="top-right" />
          <CookieBanner />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
