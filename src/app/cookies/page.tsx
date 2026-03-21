import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politică Cookies | ContestațieAI",
  description: "Politica de utilizare a cookie-urilor și a stocării locale pentru contestatieamenda.ro.",
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Politică Cookies și Stocare Locală</h1>
        <p className="text-muted-foreground mt-2 text-sm">Ultima actualizare: 21 martie 2026 · Versiunea 2.0</p>
        <p className="text-muted-foreground text-xs mt-1">
          Conformă cu Legea nr. 506/2004 (ePrivacy), GDPR și Directiva 2009/136/CE.
        </p>
      </div>

      <div className="rounded-xl border border-green-200 bg-green-50 dark:bg-green-950/30 dark:border-green-800 p-4 text-sm text-green-800 dark:text-green-300">
        <strong>Pe scurt:</strong> Folosim exclusiv cookie-uri <strong>esențiale</strong> pentru autentificare și stocare locală pentru preferința de notificare cookies. <strong>Nu folosim niciun cookie de tracking, publicitate sau analytics bazat pe identificare individuală.</strong>
      </div>

      <Section title="1. Ce sunt cookie-urile și stocarea locală">
        <p>
          <strong>Cookie-urile</strong> sunt fișiere mici de text stocate în browserul tău de serverul web. Permit site-ului să îți recunoască sesiunea și să funcționeze corect la autentificare.
        </p>
        <p className="mt-3">
          <strong>Stocarea locală (localStorage)</strong> este un mecanism de stocare în browser, similar cookie-urilor, dar care nu este trimis automat la server. Îl utilizăm exclusiv pentru preferința ta de afișare a bannerului de cookies (dacă l-ai închis sau nu).
        </p>
        <p className="mt-3">
          Conform <strong>Legii nr. 506/2004</strong> și Directivei ePrivacy, cookie-urile strict necesare funcționării serviciului (autentificare, securitate) nu necesită consimțământ prealabil, întrucât serviciul nu poate funcționa fără ele.
        </p>
      </Section>

      <Section title="2. Cookie-urile pe care le folosim">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left">
                <th className="px-4 py-2 font-medium text-foreground">Nume</th>
                <th className="px-4 py-2 font-medium text-foreground">Categorie</th>
                <th className="px-4 py-2 font-medium text-foreground">Emis de</th>
                <th className="px-4 py-2 font-medium text-foreground">Scop</th>
                <th className="px-4 py-2 font-medium text-foreground">Durata</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["authjs.session-token", "Strict necesar", "contestatieamenda.ro", "Menține sesiunea de autentificare activă după login", "30 zile"],
                ["authjs.csrf-token", "Strict necesar", "contestatieamenda.ro", "Protecție împotriva atacurilor CSRF (securitate)", "Sesiune"],
                ["authjs.callback-url", "Strict necesar", "contestatieamenda.ro", "Redirecționare corectă după autentificare", "Sesiune"],
                ["__Secure-authjs.session-token", "Strict necesar", "contestatieamenda.ro", "Varianta securizată (HTTPS) a token-ului de sesiune", "30 zile"],
                ["__Host-authjs.csrf-token", "Strict necesar", "contestatieamenda.ro", "Varianta securizată a protecției CSRF", "Sesiune"],
              ].map(([name, type, issuer, purpose, duration]) => (
                <tr key={name} className="border-b border-border last:border-0">
                  <td className="px-4 py-2 font-mono text-xs break-all">{name}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span className="rounded-full bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 px-2 py-0.5 text-xs font-medium">{type}</span>
                  </td>
                  <td className="px-4 py-2 text-xs">{issuer}</td>
                  <td className="px-4 py-2">{purpose}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="3. Stocarea locală (localStorage)">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left">
                <th className="px-4 py-2 font-medium text-foreground">Cheie</th>
                <th className="px-4 py-2 font-medium text-foreground">Scop</th>
                <th className="px-4 py-2 font-medium text-foreground">Date stocate</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["cookie-banner-dismissed", "Reținerea preferinței tale de a închide bannerul de informare cookies", "Valoare boolean (true/false) — nicio dată personală"],
              ].map(([key, purpose, data]) => (
                <tr key={key} className="border-b border-border last:border-0">
                  <td className="px-4 py-2 font-mono text-xs">{key}</td>
                  <td className="px-4 py-2">{purpose}</td>
                  <td className="px-4 py-2 text-xs">{data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3">
          Stocarea locală nu este transmisă la server și nu conține date cu caracter personal. Poate fi ștearsă oricând din setările browserului (Instrumente pentru dezvoltatori → Application → Local Storage).
        </p>
      </Section>

      <Section title="4. Analytics — Vercel Analytics">
        <p>
          Utilizăm <strong>Vercel Analytics</strong> pentru statistici agregate de utilizare (număr de vizite, pagini vizitate, țări, tipuri de dispozitive).
        </p>
        <p className="mt-3">Vercel Analytics:</p>
        <ul className="list-disc list-inside mt-1 space-y-1 text-muted-foreground">
          <li>✅ <strong>Nu folosește cookie-uri</strong>;</li>
          <li>✅ <strong>Nu identifică individual vizitatorii</strong> — datele sunt agregate;</li>
          <li>✅ <strong>Nu colectează adresa IP completă</strong> — doar originea geografică aproximativă;</li>
          <li>✅ Conformă cu GDPR prin design (privacy-first analytics).</li>
        </ul>
        <p className="mt-3">
          Prin urmare, Vercel Analytics <strong>nu necesită consimțământul tău</strong> pentru cookies (nu folosește cookies) și nu constituie prelucrare de date cu caracter personal identificabile.
        </p>
      </Section>

      <Section title="5. Cookie-uri de la terți (publicitate, tracking)">
        <p>
          <strong className="text-foreground">Nu folosim</strong> cookie-uri de la terți în scop publicitar, de retargeting sau tracking comportamental. Nu avem integrări cu Google Analytics, Facebook Pixel, Hotjar sau servicii similare.
        </p>
      </Section>

      <Section title="6. Baza legală pentru cookie-urile esențiale">
        <p>
          Cookie-urile de sesiune și CSRF sunt strict necesare funcționării serviciului (autentificare, securitate). Conform Art. 5(3) din Directiva 2002/58/CE (ePrivacy), implementat prin <strong>Legea nr. 506/2004 Art. 4(2)</strong>, aceste cookie-uri sunt <strong>exceptate de la cerința de consimțământ</strong> deoarece sunt necesare exclusiv pentru furnizarea unui serviciu solicitat explicit de utilizator.
        </p>
        <p className="mt-3">
          Nu vei putea utiliza serviciul (autentifica, genera contestații) dacă blochezi complet cookie-urile — acestea sunt necesare tehnic.
        </p>
      </Section>

      <Section title="7. Cum poți controla și șterge cookie-urile">
        <p>
          Poți gestiona cookie-urile din setările browserului tău:
        </p>
        <ul className="mt-3 space-y-1 text-muted-foreground">
          <li>🌐 <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Google Chrome</a></li>
          <li>🦊 <a href="https://support.mozilla.org/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Mozilla Firefox</a></li>
          <li>🍎 <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Apple Safari</a></li>
          <li>🔵 <a href="https://support.microsoft.com/en-us/windows/manage-cookies-in-microsoft-edge" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Microsoft Edge</a></li>
        </ul>
        <p className="mt-3">
          De asemenea, poți opta din urmărirea web în general prin <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">aboutads.info</a> sau <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">youronlinechoices.eu</a> (nu se aplică serviciului nostru, dar poate fi util pentru alte site-uri).
        </p>
      </Section>

      <Section title="8. Modificări ale politicii de cookies">
        <p>
          Această politică poate fi actualizată în cazul în care introducem noi funcționalități sau servicii terțe. Modificările vor fi comunicate prin actualizarea datei din antet și, în cazul modificărilor semnificative, prin notificare în aplicație.
        </p>
      </Section>

      <Section title="9. Contact">
        <p>
          Întrebări privind cookie-urile sau stocarea datelor:
        </p>
        <ul className="mt-2 space-y-1 text-muted-foreground">
          <li><strong>Email:</strong> <a href="mailto:contact@contestatieamenda.ro" className="text-primary underline underline-offset-4">contact@contestatieamenda.ro</a></li>
          <li><strong>Adresă poștală:</strong> TECHNEST LABS SRL (CUI 49393956, J02/47/2024), Principala 14, Dulcele, județul Arad, cod poștal 317147, România</li>
        </ul>
        <p className="mt-2">
          Vezi și: <Link href="/confidentialitate" className="text-primary underline underline-offset-4">Politica de Confidențialitate</Link> · <Link href="/termeni" className="text-primary underline underline-offset-4">Termeni și Condiții</Link>
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
