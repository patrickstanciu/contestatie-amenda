import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politică Cookies | ContestațieAI",
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Politică Cookies</h1>
        <p className="text-muted-foreground mt-2 text-sm">Ultima actualizare: martie 2025</p>
      </div>

      <Section title="1. Ce sunt cookie-urile">
        <p>
          Cookie-urile sunt fișiere mici stocate în browserul tău când vizitezi un site web. Ele
          permit site-ului să îți recunoască sesiunea și să funcționeze corect.
        </p>
      </Section>

      <Section title="2. Cookie-urile pe care le folosim">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left">
                <th className="px-4 py-2 font-medium text-foreground">Nume</th>
                <th className="px-4 py-2 font-medium text-foreground">Tip</th>
                <th className="px-4 py-2 font-medium text-foreground">Scop</th>
                <th className="px-4 py-2 font-medium text-foreground">Durata</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["authjs.session-token", "Esențial", "Menține sesiunea de autentificare", "30 zile"],
                ["authjs.csrf-token", "Esențial", "Protecție CSRF (securitate)", "Sesiune"],
                ["authjs.callback-url", "Esențial", "Redirecționare după autentificare", "Sesiune"],
                ["theme", "Preferință", "Salvează preferința dark/light mode", "1 an"],
              ].map(([name, type, purpose, duration]) => (
                <tr key={name} className="border-b border-border last:border-0">
                  <td className="px-4 py-2 font-mono text-xs">{name}</td>
                  <td className="px-4 py-2">{type}</td>
                  <td className="px-4 py-2">{purpose}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="3. Cookie-uri de analiză sau publicitate">
        <p>
          <strong>Nu folosim</strong> cookie-uri de analiză (Google Analytics, etc.) sau cookie-uri
          publicitare. Aplicația nu conține trackeri terți.
        </p>
      </Section>

      <Section title="4. Controlul cookie-urilor">
        <p>
          Poți șterge sau bloca cookie-urile din setările browserului tău. Rețineți că blocarea
          cookie-urilor esențiale va împiedica funcționarea autentificării.
        </p>
        <ul className="mt-3 list-disc list-inside space-y-1 text-muted-foreground">
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Chrome</a></li>
          <li><a href="https://support.mozilla.org/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Firefox</a></li>
          <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Safari</a></li>
        </ul>
      </Section>

      <Section title="5. Contact">
        <p>
          Întrebări:{" "}
          <a href="mailto:contact@contestatieamenda.ro" className="text-primary underline underline-offset-4">
            contact@contestatieamenda.ro
          </a>
        </p>
      </Section>
    </div>
  );
}

function Section({ title, children }: Readonly<{ title: string; children: React.ReactNode }>) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="text-sm text-muted-foreground leading-relaxed">{children}</div>
    </section>
  );
}
