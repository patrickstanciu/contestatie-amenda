import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politică de Confidențialitate | ContestațieAI",
};

export default function ConfidentialitiatePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Politică de Confidențialitate</h1>
        <p className="text-muted-foreground mt-2 text-sm">Ultima actualizare: martie 2025</p>
      </div>

      <div className="rounded-xl border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800 p-4 text-sm text-yellow-800 dark:text-yellow-300">
        <strong>Important:</strong> Această aplicație colectează CNP-ul tău pentru generarea
        documentelor. CNP-ul este o dată cu caracter personal sensibil. Îl stocăm criptat și nu îl
        transmitem terților.
      </div>

      <Section title="1. Operatorul de date">
        <p>
          <strong>TECHNEST LABS SRL</strong>
          <br />
          Contact: <a href="mailto:contact@contestatieamenda.ro" className="text-primary underline underline-offset-4">contact@contestatieamenda.ro</a>
        </p>
      </Section>

      <Section title="2. Ce date colectăm">
        <Table
          rows={[
            ["Date de cont", "Adresă email, imagine profil (Google OAuth)", "Creare și autentificare cont"],
            ["Date personale", "Nume, prenume, CNP, adresă, județ, telefon", "Generarea documentelor de contestație"],
            ["Date amendă", "Nr. proces verbal, dată, emitent, sumă, temei legal, descriere faptă", "Generarea documentelor de contestație"],
            ["Date de utilizare", "Contestații create, statusuri, date generare", "Funcționarea serviciului"],
            ["Date tehnice", "Adresă IP, tip browser (prin sesiunea de autentificare)", "Securitate și prevenirea fraudei"],
          ]}
        />
      </Section>

      <Section title="3. Baza legală GDPR">
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>Executarea unui contract</strong> (Art. 6(1)(b) GDPR) — pentru furnizarea serviciului.</li>
          <li><strong>Consimțământ</strong> (Art. 6(1)(a) GDPR) — pentru stocarea datelor personale în contul tău.</li>
          <li><strong>Interes legitim</strong> (Art. 6(1)(f) GDPR) — pentru securitatea platformei.</li>
        </ul>
      </Section>

      <Section title="4. Cum folosim datele">
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Generarea documentelor de contestație prin OpenAI API — datele sunt transmise criptat (HTTPS) și nu sunt stocate de OpenAI pentru antrenament conform contractului nostru.</li>
          <li>Stocarea contestațiilor tale pentru a le putea accesa ulterior.</li>
          <li>Autentificarea în platformă.</li>
        </ul>
        <p className="mt-3 font-medium text-foreground">Nu vindem, nu închiriem și nu cedăm datele tale terților în scop publicitar.</p>
      </Section>

      <Section title="5. Subprocesori (terți)">
        <Table
          rows={[
            ["OpenAI", "SUA", "Generarea textului contestației (date trimise per cerere, nestocate)"],
            ["Vercel / hosting", "UE/SUA", "Găzduirea aplicației + analytics agregate fără cookies (pageviews, țări)"],
            ["Baza de date (PostgreSQL)", "UE", "Stocarea datelor"],
            ["Google OAuth", "SUA", "Autentificare opțională"],
            ["Resend", "SUA", "Trimitere email magic link (opțional)"],
          ]}
          headers={["Furnizor", "Locație", "Scop"]}
        />
      </Section>

      <Section title="6. Drepturile tale (GDPR)">
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>Dreptul de acces</strong> — poți solicita o copie a datelor tale.</li>
          <li><strong>Dreptul la rectificare</strong> — poți corecta date incorecte din secțiunea Setări cont.</li>
          <li><strong>Dreptul la ștergere</strong> — poți solicita ștergerea contului și a tuturor datelor asociate.</li>
          <li><strong>Dreptul la portabilitate</strong> — poți solicita datele tale în format JSON/CSV.</li>
          <li><strong>Dreptul de opoziție</strong> — poți refuza prelucrarea bazată pe interes legitim.</li>
          <li><strong>Dreptul de a depune plângere</strong> — la ANSPDCP (<a href="https://www.dataprotection.ro" className="text-primary underline underline-offset-4" target="_blank" rel="noopener noreferrer">dataprotection.ro</a>).</li>
        </ul>
        <p className="mt-3">
          Pentru exercitarea drepturilor:{" "}
          <a href="mailto:contact@contestatieamenda.ro" className="text-primary underline underline-offset-4">
            contact@contestatieamenda.ro
          </a>
          . Răspundem în maxim 30 de zile.
        </p>
      </Section>

      <Section title="7. Retenția datelor">
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Datele contului și contestațiile: atât timp cât contul este activ.</li>
          <li>La ștergerea contului: toate datele sunt eliminate definitiv în 30 de zile.</li>
          <li>Date tehnice (loguri): maxim 90 de zile.</li>
        </ul>
      </Section>

      <Section title="8. Securitate">
        <p>
          Datele sunt stocate criptat. Conexiunile sunt protejate prin HTTPS/TLS. Accesul la baza de
          date este restricționat și monitorizat. CNP-ul nu este afișat în interfață după salvare.
        </p>
      </Section>

      <Section title="9. Modificări">
        <p>
          Orice modificare semnificativă va fi comunicată prin email cu cel puțin 14 zile înainte de
          intrarea în vigoare.
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

function Table({
  rows,
  headers = ["Categorie", "Date", "Scop"],
}: Readonly<{ rows: string[][]; headers?: string[] }>) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40 text-left">
            {headers.map((h) => (
              <th key={h} className="px-4 py-2 font-medium text-foreground">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2 align-top">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
