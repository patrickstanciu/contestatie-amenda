import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/auth";

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
          <footer className="border-t py-4 mt-8">
            <p className="text-center text-xs text-muted-foreground px-4">
              ⚠️ Acest document este generat automat și nu constituie consultanță juridică. Consultați un avocat pentru situații complexe.
            </p>
          </footer>
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
