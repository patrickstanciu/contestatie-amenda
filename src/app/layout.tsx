import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { CookieBanner } from "@/components/cookie-banner";
import { auth } from "@/auth";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Contestație Amendă | Generează contestații administrative",
  description:
    "Generează rapid contestații administrative cu ajutorul inteligenței artificiale.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="ro">
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
      </body>
    </html>
  );
}
