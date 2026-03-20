import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termeni și Condiții | ContestațieAI",
};

export default function TermeniPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Termeni și Condiții</h1>
        <p className="text-muted-foreground mt-2 text-sm">Ultima actualizare: martie 2025</p>
      </div>

      <Section title="1. Despre serviciu">
        <p>
          ContestațieAI este un serviciu oferit de <strong>TECHNEST LABS SRL</strong> care permite
          utilizatorilor să genereze automat documente de contestație administrativă cu ajutorul
          inteligenței artificiale.
        </p>
        <p className="mt-3">
          Serviciul are caracter <strong>informativ și de asistență</strong>. Documentele generate
          nu constituie consultanță juridică și nu înlocuiesc sfatul unui avocat calificat.
        </p>
      </Section>

      <Section title="2. Acceptarea termenilor">
        <p>
          Prin crearea unui cont și utilizarea serviciului, ești de acord cu prezenții Termeni și
          Condiții. Dacă nu ești de acord, te rugăm să nu utilizezi serviciul.
        </p>
      </Section>

      <Section title="3. Utilizarea serviciului">
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Serviciul este destinat exclusiv persoanelor fizice majore sau persoanelor juridice.</li>
          <li>
            Ești responsabil pentru corectitudinea datelor introduse (date personale, detalii amendă,
            motive).
          </li>
          <li>
            Documentele generate sunt un punct de plecare — verifică-le și adaptează-le înainte de
            depunere.
          </li>
          <li>Este interzisă utilizarea serviciului în scopuri ilegale sau frauduloase.</li>
          <li>Este interzisă introducerea datelor personale ale altor persoane fără acordul acestora.</li>
        </ul>
      </Section>

      <Section title="4. Limitarea răspunderii">
        <p>
          TECHNEST LABS SRL nu garantează succesul contestațiilor generate și nu își asumă
          răspunderea pentru:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
          <li>Inexactitățile sau omisiunile din documentele generate de AI.</li>
          <li>Consecințele juridice ale depunerii unui document generat nemodificat.</li>
          <li>Pierderea de date cauzată de evenimente tehnice în afara controlului nostru.</li>
          <li>Deciziile instanțelor sau autorităților ca urmare a contestațiilor depuse.</li>
        </ul>
      </Section>

      <Section title="5. Proprietate intelectuală">
        <p>
          Platforma ContestațieAI, inclusiv codul sursă, designul și conținutul propriu, sunt
          proprietatea TECHNEST LABS SRL. Documentele generate pe baza datelor tale îți aparțin în
          totalitate.
        </p>
      </Section>

      <Section title="6. Modificarea termenilor">
        <p>
          Ne rezervăm dreptul de a modifica acești termeni. Vei fi notificat prin email sau prin
          afișarea unui mesaj în aplicație. Continuarea utilizării serviciului după modificări
          constituie acceptarea noilor termeni.
        </p>
      </Section>

      <Section title="7. Legislație aplicabilă">
        <p>
          Prezenții termeni sunt guvernați de legislația română. Orice litigiu va fi soluționat de
          instanțele competente din România.
        </p>
      </Section>

      <Section title="8. Contact">
        <p>
          Întrebări sau sesizări:{" "}
          <a
            href="mailto:contact@contestatieamenda.ro"
            className="text-primary underline underline-offset-4"
          >
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
