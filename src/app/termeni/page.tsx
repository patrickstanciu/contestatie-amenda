import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termeni și Condiții | ContestațieAI",
  description: "Termenii și condițiile de utilizare a platformei ContestațieAI, oferită de TECHNEST LABS SRL.",
};

export default function TermeniPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Termeni și Condiții de Utilizare</h1>
        <p className="text-muted-foreground mt-2 text-sm">Ultima actualizare: 21 martie 2026 · Versiunea 2.0</p>
      </div>

      <div className="rounded-xl border border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-800 p-4 text-sm text-blue-800 dark:text-blue-300">
        <strong>Rezumat:</strong> ContestațieAI este un serviciu <strong>gratuit</strong> de asistare la redactarea contestațiilor administrative, oferit de TECHNEST LABS SRL. Documentele generate au caracter informativ și <strong>nu constituie consultanță juridică</strong>. Prin utilizarea serviciului, ești de acord cu prezentele condiții.
      </div>

      <Section title="1. Identitatea prestatorului de servicii">
        <p>
          Platforma <strong>contestatieamenda.ro</strong> și serviciul <strong>ContestațieAI</strong> sunt operate de:
        </p>
        <ul className="mt-3 space-y-1 text-muted-foreground">
          <li><strong>Denumire:</strong> TECHNEST LABS SRL</li>
          <li><strong>Formă juridică:</strong> Societate cu răspundere limitată, înregistrată în România</li>
          <li><strong>CUI:</strong> 49393956</li>
          <li><strong>Nr. Reg. Com.:</strong> J02/47/2024</li>
          <li><strong>Sediul social:</strong> Principala 14, Dulcele, județul Arad, cod poștal 317147, România</li>
          <li><strong>Email:</strong> <a href="mailto:contact@contestatieamenda.ro" className="text-primary underline underline-offset-4">contact@contestatieamenda.ro</a></li>
          <li><strong>Website:</strong> <a href="https://contestatieamenda.ro" className="text-primary underline underline-offset-4">contestatieamenda.ro</a></li>
        </ul>
        <p className="mt-3">
          Serviciul este furnizat în temeiul <strong>Legii nr. 365/2002</strong> privind comerțul electronic și al reglementărilor europene aplicabile serviciilor societății informaționale.
        </p>
      </Section>

      <Section title="2. Descrierea serviciului și caracterul necomercial al documentelor">
        <p>
          ContestațieAI este un serviciu digital care utilizează inteligența artificială (OpenAI GPT) pentru a asista utilizatorii în redactarea documentelor de contestație administrativă (plângeri contravenționale, contestații acte administrative fiscale etc.).
        </p>
        <p className="mt-3">
          <strong className="text-foreground">Limitare esențială:</strong> Documentele generate au caracter exclusiv <strong>informativ și de asistare</strong>. Ele nu constituie și nu înlocuiesc:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
          <li>Consultanța juridică oferită de un avocat (Legea nr. 51/1995);</li>
          <li>Asistența unui consilier juridic;</li>
          <li>Orice altă formă de reprezentare juridică profesională.</li>
        </ul>
        <p className="mt-3">
          TECHNEST LABS SRL nu exercită activitate de asistență juridică și nu este înscrisă în Baroul Avocaților din România.
        </p>
      </Section>

      <Section title="3. Accesul la serviciu și condițiile de utilizare">
        <p>Serviciul poate fi utilizat de:</p>
        <ul className="list-disc list-inside mt-2 space-y-2 text-muted-foreground">
          <li>Persoane fizice cu capacitate deplină de exercițiu (minimum 18 ani împliniți);</li>
          <li>Persoane juridice, prin reprezentanții lor legali.</li>
        </ul>
        <p className="mt-3">Prin crearea unui cont și utilizarea serviciului, confirmi că:</p>
        <ul className="list-disc list-inside mt-2 space-y-2 text-muted-foreground">
          <li>Ai cel puțin 18 ani sau, în cazul persoanelor juridice, ești autorizat să acționezi în numele entității;</li>
          <li>Datele introduse sunt corecte, complete și te privesc pe tine sau persoana juridică pe care o reprezinți;</li>
          <li>Vei verifica și, dacă este necesar, vei adapta documentele generate înainte de depunere;</li>
          <li>Nu vei utiliza serviciul pentru scopuri ilegale, frauduloase sau contrare bunelor moravuri;</li>
          <li>Nu vei introduce datele personale ale terților fără consimțământul expres al acestora.</li>
        </ul>
      </Section>

      <Section title="4. Gratuitatea serviciului și limitele acesteia">
        <p>
          Serviciul ContestațieAI este oferit <strong>gratuit</strong> utilizatorilor înregistrați, cu un număr limitat de generări pe zi (în prezent <strong>5 contestații/zi/utilizator</strong>), pentru prevenirea abuzurilor.
        </p>
        <p className="mt-3">
          TECHNEST LABS SRL își rezervă dreptul de a introduce planuri plătite cu funcționalități suplimentare, fără a elimina accesul gratuit de bază. Orice modificare a modelului de prețuri va fi comunicată cu cel puțin <strong>30 de zile</strong> înainte.
        </p>
        <p className="mt-3">
          Contestațiile administrative sunt scutite de taxă de timbru conform <strong>OUG nr. 80/2013</strong> privind taxele judiciare de timbru — aceasta este o prevedere legală și nu o facilitate oferită de platforma noastră.
        </p>
      </Section>

      <Section title="5. Limitarea răspunderii">
        <p>
          În măsura permisă de legislația aplicabilă, TECHNEST LABS SRL nu este responsabilă pentru:
        </p>
        <ul className="list-disc list-inside mt-3 space-y-2 text-muted-foreground">
          <li>Inexactitățile, omisiunile sau inadecvările conținutului generat de AI față de situația ta specifică;</li>
          <li>Consecințele juridice, inclusiv respingerea contestației, cauzate de utilizarea nemodificată a unui document generat;</li>
          <li>Deciziile instanțelor, tribunalelor sau autorităților administrative ca urmare a contestațiilor depuse;</li>
          <li>Pierderea de date sau întreruperea serviciului cauzate de evenimente tehnice, forță majoră sau atacuri cibernetice;</li>
          <li>Erori în calculul termenelor legale — te rugăm să verifici întotdeauna termenele aplicabile cu un specialist.</li>
        </ul>
        <p className="mt-3">
          Răspunderea noastră totală față de tine, pentru orice cauză și indiferent de forma acțiunii, este limitată la suma de <strong>0 EUR</strong> (serviciul este gratuit), cu excepția cazurilor de fraudă sau neglijență gravă.
        </p>
        <p className="mt-3">
          Prezentele limitări nu afectează drepturile tale legale ca <strong>consumator</strong> în temeiul Legii nr. 363/2007 și al Directivei UE 2019/770 privind contractele pentru furnizarea de conținut digital.
        </p>
      </Section>

      <Section title="6. Proprietate intelectuală">
        <p>
          Platforma ContestațieAI, inclusiv codul sursă, designul, structura și conținutul editorial propriu, sunt proprietatea TECHNEST LABS SRL și sunt protejate de Legea nr. 8/1996 privind dreptul de autor.
        </p>
        <p className="mt-3">
          <strong className="text-foreground">Documentele generate pe baza datelor tale îți aparțin în totalitate.</strong> Prin utilizarea serviciului, acorzi TECHNEST LABS SRL o licență limitată, neexclusivă și gratuită de procesare a datelor tale exclusiv în scopul furnizării serviciului.
        </p>
        <p className="mt-3">
          Nu este permisă copierea, redistribuirea sau utilizarea comercială a platformei sau a componentelor sale fără acordul scris al TECHNEST LABS SRL.
        </p>
      </Section>

      <Section title="7. Disponibilitatea serviciului și forța majoră">
        <p>
          Ne străduim să asigurăm disponibilitatea serviciului 24/7, dar nu garantăm funcționarea neîntreruptă. Serviciul poate fi întrerupt temporar pentru:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
          <li>Mentenanță planificată (anunțată în avans când este posibil);</li>
          <li>Actualizări de securitate urgente;</li>
          <li>Evenimente de forță majoră (pene de curent, atacuri cibernetice, defecțiuni ale furnizorilor de infrastructură).</li>
        </ul>
      </Section>

      <Section title="8. Modificarea termenilor și rezilierea">
        <p>
          Ne rezervăm dreptul de a modifica prezentele condiții. Modificările semnificative vor fi comunicate prin:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
          <li>Email la adresa înregistrată în cont, cu cel puțin <strong>14 zile</strong> înainte de intrarea în vigoare;</li>
          <li>Notificare vizibilă la accesarea aplicației.</li>
        </ul>
        <p className="mt-3">
          Continuarea utilizării serviciului după data intrării în vigoare a modificărilor constituie acceptarea noilor condiții. Dacă nu ești de acord, poți solicita ștergerea contului tău.
        </p>
        <p className="mt-3">
          Poți rezilia oricând acordul prin ștergerea contului tău (din setările contului sau prin email la <a href="mailto:contact@contestatieamenda.ro" className="text-primary underline underline-offset-4">contact@contestatieamenda.ro</a>).
        </p>
      </Section>

      <Section title="9. Soluționarea litigiilor și legislație aplicabilă">
        <p>
          Prezentele condiții sunt guvernate de <strong>legislația română</strong>. Orice litigiu va fi soluționat de instanțele competente din România.
        </p>
        <p className="mt-3">
          Înainte de a apela la instanță, te încurajăm să ne contactezi pentru rezolvarea amiabilă a oricărei dispute.
        </p>
        <p className="mt-3">
          Dacă ești consumator, poți apela și la:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
          <li><strong>ANPC</strong> (Autoritatea Națională pentru Protecția Consumatorilor) — <a href="https://anpc.ro" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">anpc.ro</a>;</li>
          <li>Platforma europeană de soluționare online a litigiilor: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">ec.europa.eu/consumers/odr</a>.</li>
        </ul>
      </Section>

      <Section title="10. Contact">
        <p>
          Pentru orice întrebare sau sesizare privind prezentele condiții:
        </p>
        <ul className="mt-2 space-y-1 text-muted-foreground">
          <li><strong>Email:</strong> <a href="mailto:contact@contestatieamenda.ro" className="text-primary underline underline-offset-4">contact@contestatieamenda.ro</a></li>
          <li><strong>Adresă poștală:</strong> TECHNEST LABS SRL, Principala 14, Dulcele, județul Arad, cod poștal 317147, România — cu mențiunea <em>&ldquo;Sesizare Termeni și Condiții&rdquo;</em></li>
          <li><strong>Timp de răspuns:</strong> Maxim 5 zile lucrătoare.</li>
        </ul>
        <p className="mt-3">
          Consultă și <Link href="/confidentialitate" className="text-primary underline underline-offset-4">Politica de Confidențialitate</Link> și <Link href="/cookies" className="text-primary underline underline-offset-4">Politica Cookies</Link>.
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
