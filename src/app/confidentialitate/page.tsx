import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politică de Confidențialitate | ContestațieAI",
  description: "Politica de confidențialitate și prelucrare a datelor cu caracter personal pentru ContestațieAI, conformă GDPR.",
};

export default function ConfidentialitiatePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Politică de Confidențialitate</h1>
        <p className="text-muted-foreground mt-2 text-sm">Ultima actualizare: 21 martie 2026 · Versiunea 2.0</p>
        <p className="text-muted-foreground text-xs mt-1">
          Conformă cu Regulamentul (UE) 2016/679 (GDPR) și Legea nr. 190/2018 privind implementarea GDPR în România.
        </p>
      </div>

      <div className="rounded-xl border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800 p-4 text-sm text-yellow-800 dark:text-yellow-300">
        <strong>Important:</strong> Această aplicație poate colecta CNP-ul tău dacă îl introduci în formular pentru generarea documentelor. CNP-ul este un identificator personal. Nu îl afișăm în interfață (mascăm ultimele cifre) și nu îl transmitem terților în afara procesului de generare a documentului tău.
      </div>

      <Section title="1. Operatorul de date cu caracter personal">
        <p>
          Operatorul de date este:
        </p>
        <ul className="mt-3 space-y-1 text-muted-foreground">
          <li><strong>Denumire:</strong> TECHNEST LABS SRL</li>
          <li><strong>CUI:</strong> 49393956</li>
          <li><strong>Nr. Reg. Com.:</strong> J02/47/2024</li>
          <li><strong>Sediul social:</strong> Principala 14, Dulcele, județul Arad, cod poștal 317147, România</li>
          <li><strong>Email:</strong> <a href="mailto:contact@contestatieamenda.ro" className="text-primary underline underline-offset-4">contact@contestatieamenda.ro</a></li>
          <li><strong>Website:</strong> <a href="https://contestatieamenda.ro" className="text-primary underline underline-offset-4">contestatieamenda.ro</a></li>
        </ul>
        <p className="mt-3">
          <strong>Responsabil cu protecția datelor (DPO):</strong> Conform Art. 37 GDPR, TECHNEST LABS SRL nu are obligația legală de a desemna un DPO (suntem un operator de dimensiuni mici care nu prelucrează date la scară largă și nu prelucrăm categorii speciale de date în mod sistematic). Solicitările privind datele personale se adresează la emailul de mai sus.
        </p>
      </Section>

      <Section title="2. Ce date colectăm și în ce scop">
        <Table
          rows={[
            ["Date de cont", "Adresă email, nume (din profil Google opțional)", "Crearea și autentificarea contului", "Art. 6(1)(b) — executarea contractului"],
            ["Date personale introduse voluntar", "Nume, prenume, CNP, adresă, județ, telefon", "Generarea documentului de contestație", "Art. 6(1)(b) — executarea contractului"],
            ["Date privind amenda", "Nr. PV, dată, emitent, sumă, temei legal, descrierea faptei, motive de contestare", "Generarea documentului de contestație", "Art. 6(1)(b) — executarea contractului"],
            ["Date de utilizare a serviciului", "Contestații create, statusuri (generat/descărcat), date și ore", "Funcționarea serviciului, istoricul tău", "Art. 6(1)(b) — executarea contractului"],
            ["Date tehnice de sesiune", "Adresă IP (prin autentificare), tip browser, cookie de sesiune", "Securitate, prevenirea fraudei, autentificare", "Art. 6(1)(f) — interes legitim"],
            ["Date analitice agregate", "Număr vizite, țări (fără identificare individuală), prin Vercel Analytics", "Îmbunătățirea serviciului", "Art. 6(1)(f) — interes legitim"],
          ]}
          headers={["Categorie", "Date colectate", "Scop", "Baza legală GDPR"]}
        />
        <p className="mt-3">
          <strong className="text-foreground">Nu colectăm date din categorii speciale</strong> (Art. 9 GDPR): sănătate, origine etnică, opinii politice, credințe religioase, date biometrice etc.
        </p>
        <p className="mt-3">
          <strong className="text-foreground">Minori:</strong> Serviciul nu este destinat persoanelor sub 18 ani. Nu colectăm în mod intenționat date de la minori. Dacă identificăm astfel de date, le ștergem imediat.
        </p>
      </Section>

      <Section title="3. Cum folosim datele">
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>Generarea documentelor:</strong> Datele introduse sunt transmise către OpenAI API (criptat prin HTTPS) exclusiv pentru a genera textul contestației. OpenAI nu stochează aceste date pentru antrenarea modelelor, conform contractului de procesare de date (DPA) încheiat cu OpenAI.</li>
          <li><strong>Stocarea contestațiilor:</strong> Contestațiile generate sunt salvate în contul tău pentru acces ulterior, editare și descărcare.</li>
          <li><strong>Autentificarea:</strong> Email-ul tău este utilizat pentru autentificare (Google OAuth sau magic link prin Resend).</li>
          <li><strong>Îmbunătățirea serviciului:</strong> Date agregate și anonimizate despre utilizarea platformei (fără identificare individuală).</li>
        </ul>
        <p className="mt-4 font-medium text-foreground">
          ❌ Nu vindem, nu închiriem și nu cedăm datele tale terților în scop publicitar sau de marketing.
          <br />
          ❌ Nu folosim datele tale pentru profilare sau luare de decizii automate cu efecte juridice.
        </p>
      </Section>

      <Section title="4. Subprocesori și transferuri internaționale">
        <p className="mb-3">
          Utilizăm servicii terțe pentru funcționarea platformei. Fiecare subprocesor este contractat printr-un acord de prelucrare a datelor (DPA):
        </p>
        <Table
          rows={[
            ["OpenAI Ireland Ltd.", "Irlanda/SUA", "Generarea textului AI (DPA + Standard Contractual Clauses pentru transferuri SUA)", "Per cerere — datele nu sunt reținute de OpenAI"],
            ["Vercel Inc.", "SUA", "Hosting aplicație + Analytics agregat (Standard Contractual Clauses)", "Durata serviciului"],
            ["Neon / PostgreSQL", "UE (Frankfurt)", "Baza de date — stocarea datelor utilizatorilor", "Durata contului + 30 zile după ștergere"],
            ["Google LLC (OAuth)", "SUA", "Autentificare opțională prin Google (Standard Contractual Clauses)", "Sesiune / token OAuth"],
            ["Resend Inc.", "SUA", "Trimitere email pentru autentificare magic link (Standard Contractual Clauses)", "Per trimitere — neretenționate"],
          ]}
          headers={["Furnizor", "Locație date", "Scop și mecanism de transfer", "Retenție"]}
        />
        <p className="mt-3">
          Transferurile de date către SUA se realizează pe baza <strong>Clauzelor Contractuale Standard (SCC)</strong> adoptate de Comisia Europeană (Decizia de implementare 2021/914/EU), care asigură un nivel adecvat de protecție conform Art. 46 GDPR.
        </p>
      </Section>

      <Section title="5. Drepturile tale în calitate de persoană vizată (GDPR)">
        <p>În conformitate cu Art. 15-22 GDPR și Legea nr. 190/2018, ai următoarele drepturi:</p>
        <ul className="mt-3 space-y-2 text-muted-foreground">
          <li><strong className="text-foreground">Dreptul de acces (Art. 15):</strong> Poți solicita o copie a tuturor datelor pe care le deținem despre tine.</li>
          <li><strong className="text-foreground">Dreptul la rectificare (Art. 16):</strong> Poți corecta datele incorecte direct din contul tău sau prin cerere scrisă.</li>
          <li><strong className="text-foreground">Dreptul la ștergere / &ldquo;dreptul de a fi uitat&rdquo; (Art. 17):</strong> Poți solicita ștergerea completă a contului și a tuturor datelor asociate.</li>
          <li><strong className="text-foreground">Dreptul la restricționarea prelucrării (Art. 18):</strong> Poți solicita suspendarea prelucrării datelor tale în anumite circumstanțe (ex: contest exactitatea lor).</li>
          <li><strong className="text-foreground">Dreptul la portabilitate (Art. 20):</strong> Poți solicita datele tale în format structurat, lizibil automat (JSON).</li>
          <li><strong className="text-foreground">Dreptul de opoziție (Art. 21):</strong> Poți obiecta față de prelucrarea bazată pe interes legitim (ex: analytics).</li>
          <li><strong className="text-foreground">Dreptul de a nu fi supus deciziei automate (Art. 22):</strong> Nu utilizăm decizii automate cu efecte juridice — estimarea șanselor este strict informativă și nu afectează nicio decizie în numele tău.</li>
          <li><strong className="text-foreground">Dreptul de a retrage consimțământul:</strong> Unde prelucrarea se bazează pe consimțământ, îl poți retrage oricând, fără a afecta legalitatea prelucrării anterioare.</li>
        </ul>
        <p className="mt-4 p-3 rounded-lg bg-muted/50 text-muted-foreground">
          <strong className="text-foreground">Cum îți exerciți drepturile:</strong> Trimite o solicitare la{" "}
          <a href="mailto:contact@contestatieamenda.ro" className="text-primary underline underline-offset-4">contact@contestatieamenda.ro</a>.
          Răspundem în maxim <strong>30 de zile calendaristice</strong> (cu posibilitate de prelungire la 60 de zile în cazuri complexe, cu notificare prealabilă).
          Verificarea identității poate fi necesară pentru securitatea datelor tale.
        </p>
        <p className="mt-3">
          <strong className="text-foreground">Dreptul de a depune plângere la autoritatea de supraveghere:</strong>
        </p>
        <ul className="mt-1 space-y-1 text-muted-foreground">
          <li>
            <strong>ANSPDCP</strong> (Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal) —{" "}
            <a href="https://www.dataprotection.ro" className="text-primary underline underline-offset-4" target="_blank" rel="noopener noreferrer">dataprotection.ro</a>,
            B-dul General Gheorghe Magheru 28-30, Sector 1, București, Tel: +40.318.059.211,
            Email: <a href="mailto:anspdcp@dataprotection.ro" className="text-primary underline underline-offset-4">anspdcp@dataprotection.ro</a>.
          </li>
        </ul>
      </Section>

      <Section title="6. Retenția datelor">
        <Table
          rows={[
            ["Date cont și contestații", "Pe durata activității contului", "La ștergerea contului — eliminate în 30 de zile"],
            ["CNP și date personale din contestații", "Pe durata activității contului", "Șterse odată cu contul"],
            ["Date tehnice (loguri sesiuni)", "Maxim 90 de zile", "Ștergere automată"],
            ["Date analitice agregate (Vercel)", "Maxim 1 an (agregate, fără identificare)", "Anonimizate, nu sunt șterse individual"],
            ["Backup-uri baza de date", "Maxim 30 de zile (politica Neon)", "Suprascrise automat"],
          ]}
          headers={["Categorie date", "Perioadă retenție", "Note"]}
        />
      </Section>

      <Section title="7. Securitatea datelor">
        <p>Luăm măsuri tehnice și organizatorice adecvate conform Art. 32 GDPR:</p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
          <li>Toate conexiunile sunt criptate prin <strong>HTTPS/TLS 1.2+</strong>;</li>
          <li>Baza de date este accesibilă exclusiv prin conexiuni autentificate și criptate (<code>sslmode=require</code>);</li>
          <li>CNP-ul este mascat în interfața utilizator (ex: <code>1*******56</code>) după salvare;</li>
          <li>Accesul la sistemele de producție este restricționat și auditat;</li>
          <li>Parolele nu sunt stocate (autentificare exclusiv prin OAuth / magic link);</li>
          <li>Nu stocăm informații de plată (serviciul este gratuit).</li>
        </ul>
        <p className="mt-3">
          <strong className="text-foreground">Notificare breșă de securitate:</strong> În cazul unui incident de securitate care afectează datele tale, te vom notifica în maxim <strong>72 de ore</strong> de la identificare (conform Art. 33-34 GDPR), dacă breșa prezintă un risc ridicat pentru drepturile tale.
        </p>
      </Section>

      <Section title="8. Cookie-uri și tehnologii similare">
        <p>
          Utilizăm exclusiv cookie-uri esențiale pentru autentificare și nu folosim cookie-uri de tracking sau publicitate. Detalii complete în{" "}
          <Link href="/cookies" className="text-primary underline underline-offset-4">Politica Cookies</Link>.
        </p>
      </Section>

      <Section title="9. Modificări ale politicii">
        <p>
          Această politică poate fi actualizată pentru a reflecta modificări legislative, tehnologice sau ale serviciilor noastre. Orice modificare semnificativă va fi comunicată prin email la adresa înregistrată, cu cel puțin <strong>14 zile calendaristice</strong> înainte de intrarea în vigoare.
        </p>
        <p className="mt-3">
          Data ultimei actualizări și versiunea sunt afișate în antetul acestui document. Versiunile anterioare pot fi solicitate la adresa de email de contact.
        </p>
      </Section>

      <Section title="10. Contact pentru aspecte privind confidențialitatea">
        <ul className="space-y-1 text-muted-foreground">
          <li><strong>Email:</strong> <a href="mailto:contact@contestatieamenda.ro" className="text-primary underline underline-offset-4">contact@contestatieamenda.ro</a></li>
          <li><strong>Adresă poștală:</strong> TECHNEST LABS SRL, Principala 14, Dulcele, județul Arad, cod poștal 317147, România — cu mențiunea <em>&ldquo;Solicitare GDPR — [tipul solicitării]&rdquo;</em></li>
          <li><strong>Timp de răspuns:</strong> Maxim 30 de zile calendaristice.</li>
        </ul>
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
  headers,
}: Readonly<{ rows: string[][]; headers: string[] }>) {
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
