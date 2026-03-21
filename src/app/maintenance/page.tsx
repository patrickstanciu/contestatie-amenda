import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentenanță | ContestațieAI",
  description: "Efectuăm îmbunătățiri. Revenim în curând.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#4f46e5]">
      {/* Dot grid */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Glow */}
      <div aria-hidden className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-violet-500/25 blur-3xl" />

      <div className="relative text-center space-y-6 max-w-lg">
        <div className="text-6xl">⚖️</div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Revenim în curând
          </h1>
          <p className="mt-3 text-violet-200 text-lg">
            Efectuăm îmbunătățiri la ContestațieAI.
            <br />
            Ne cerem scuze pentru inconveniență.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-5 py-2.5 text-sm text-white font-medium">
          🔧 &nbsp;Mentenanță în curs
        </div>

        <p className="text-violet-300 text-sm">
          Întrebări?{" "}
          <a
            href="mailto:contact@contestatieamenda.ro"
            className="underline underline-offset-4 hover:text-white transition-colors"
          >
            contact@contestatieamenda.ro
          </a>
        </p>
      </div>
    </div>
  );
}
