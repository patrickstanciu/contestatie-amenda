import type { ReactNode } from "react";
import Link from "next/link";

export interface Article {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  publishedAt: string;
  readTime: number;
  emoji: string;
  intro: string;
  sections: {
    heading: string;
    emoji: string;
    content: ReactNode;
  }[];
  faq: { q: string; a: string }[];
}

export const articles: Article[] = [
  {
    slug: "cum-sa-contesti-o-amenda-de-circulatie",
    title: "Cum să contești o amendă de circulație pas cu pas (2026)",
    metaTitle: "Cum să contești o amendă de circulație pas cu pas (2026)",
    metaDescription:
      "Ghid complet: cum depui plângere contravențională împotriva unei amenzi rutiere în 2026. Termen 15 zile, acte necesare, judecătorie competentă, scutit de taxă.",
    category: "Ghid practic",
    publishedAt: "2026-03-21",
    readTime: 7,
    emoji: "🚗",
    intro:
      "Ai primit un proces-verbal de contravenție și crezi că a fost aplicat incorect sau cu încălcarea procedurii? Ai dreptul legal să îl contești, iar procesul este mai simplu decât crezi. Această pagină îți explică pas cu pas cum depui o plângere contravențională în 2026, ce documente ai nevoie și ce te costă — spoiler: nimic.",
    sections: [
      {
        heading: "Ce este plângerea contravențională și când o poți folosi",
        emoji: "📋",
        content: (
          <>
            <p>
              Plângerea contravențională este calea legală prin care persoana sancționată
              (contravenientul) atacă în instanță un proces-verbal de contravenție. Este
              reglementată de <strong>Ordonanța Guvernului nr. 2/2001</strong> privind regimul
              juridic al contravențiilor, care rămâne actul normativ central în materie.
            </p>
            <p>
              Poți contesta orice proces-verbal de contravenție, indiferent de emitent: Poliția
              Rutieră, Poliția Locală, RAR, ITM, DSP sau orice altă autoritate. Nu este necesar
              să dovedești că ești nevinovat — poți obține anularea și pe motive exclusiv
              procedurale, cum ar fi lipsa martoruluiasistat, erori materiale în datele procesului
              verbal sau depășirea termenului legal de întocmire.
            </p>
            <p>
              Conform <strong>Art. 32 din OG 2/2001</strong>, depunerea plângerii suspendă de
              drept executarea sancțiunii. Cu alte cuvinte, nu ești obligat să plătești amenda
              cât timp dosarul este pe rol la instanță.
            </p>
          </>
        ),
      },
      {
        heading: "Termenul de 15 zile: de când se calculează și ce se întâmplă dacă îl depășești",
        emoji: "⏱️",
        content: (
          <>
            <p>
              <strong>Art. 31 alin. (1) din OG 2/2001</strong> prevede că plângerea se depune în
              termen de <strong>15 zile de la data înmânării sau comunicării procesului
              verbal</strong>. Atenție: termenul curge de la data la care ai primit efectiv
              procesul verbal, nu de la data la care a fost întocmit. Dacă l-ai primit prin poștă,
              termenul curge de la data de pe confirmarea de primire.
            </p>
            <p>
              Dacă agentul ți-a înmânat procesul verbal pe loc și ai semnat de primire, termenul
              curge din acea zi. Weekendurile și sărbătorile legale sunt incluse în calcul, dar
              dacă ultima zi cade într-o sâmbătă, duminică sau zi nelucrătoare, termenul se
              prelungește automat până în prima zi lucrătoare (conform Codului de procedură
              civilă, aplicabil subsidiar).
            </p>
            <p>
              Dacă termenul a expirat, nu totul este pierdut. Instanța poate repune cauza în
              termen dacă există <em>motive temeinice</em> care au împiedicat depunerea la timp
              (boală gravă, calamitate, absență din țară dovedită cu documente). Totuși, această
              situație este excepțională — cel mai bine este să acționezi în termen.
            </p>
          </>
        ),
      },
      {
        heading: "Documentele necesare pentru a contesta amenda",
        emoji: "📁",
        content: (
          <>
            <p>
              Dosarul de contestație nu este complicat. Ai nevoie de:
            </p>
            <ul>
              <li>
                <strong>Plângerea contravențională</strong> — documentul principal, redactat în
                limbaj juridic, în care explici motivele de contestare. Poate fi generată automat
                cu <Link href="/contestatie/noua">ContestațieAI</Link> în câteva minute.
              </li>
              <li>
                <strong>Copia procesului verbal</strong> — exemplarul tău, primit la momentul
                sancționării sau comunicat ulterior.
              </li>
              <li>
                <strong>Copia actului de identitate</strong> — B.I. sau pașaport.
              </li>
              <li>
                <strong>Dovezi suplimentare (opțional, dar recomandat)</strong> — fotografii de
                la locul faptei, înregistrări video, declarații de martori, certificate de
                omologare radar (solicitabile prin cerere prealabilă).
              </li>
            </ul>
            <p>
              Toate documentele se depun în două exemplare: unul pentru instanță și unul pentru
              agentul constatator (intimat), care va trebui notificat prin intermediul instanței.
            </p>
          </>
        ),
      },
      {
        heading: "Unde și cum se depune plângerea",
        emoji: "🏛️",
        content: (
          <>
            <p>
              Plângerea se depune la <strong>judecătoria în circumscripția căreia a fost săvârșită
              contravenția</strong>, conform Art. 32 alin. (2) din OG 2/2001. Nu contează domiciliul
              tău — contează locul unde a fost dat procesul verbal.
            </p>
            <p>
              Poți depune dosarul:
            </p>
            <ul>
              <li>
                <strong>Fizic</strong>, la registratura judecătoriei competente. Obții un număr de
                dosar pe loc.
              </li>
              <li>
                <strong>Prin poștă</strong>, cu scrisoare recomandată cu confirmare de primire.
                Data depunerii este data ștampilei poștale, deci poți trimite chiar în ultima zi
                a termenului.
              </li>
              <li>
                <strong>Online</strong>, prin portalul <em>e-dosar.ro</em> sau sistemul ECRIS al
                instanței respective (disponibil la multe judecătorii).
              </li>
            </ul>
            <p>
              <strong>ContestațieAI</strong> detectează automat judecătoria competentă pe baza
              județului și îți afișează adresa exactă și linkul către portalul instanței.
            </p>
          </>
        ),
      },
      {
        heading: "Taxa de timbru și costurile procesului",
        emoji: "💰",
        content: (
          <>
            <p>
              Unul dintre cele mai mari avantaje ale contestației contravenționale este că este{" "}
              <strong>scutită de taxă de timbru</strong>. Conform{" "}
              <strong>Art. 36 alin. (2) din OUG 80/2013</strong> privind taxele judiciare de
              timbru, plângerile contravenționale nu se timbrează, indiferent de valoarea amenzii.
            </p>
            <p>
              Singurele cheltuieli posibile sunt:
            </p>
            <ul>
              <li>Transportul la judecătorie (dacă alegi depunerea fizică).</li>
              <li>Costul copiei legalizate sau al confirmărilor poștale, dacă trimiți prin poștă.</li>
              <li>Onorariul avocatului, dacă alegi să fii reprezentat (nu este obligatoriu).</li>
            </ul>
            <p>
              Dacă pierzi procesul, instanța poate obliga la plata cheltuielilor de judecată ale
              intimatului (rare în practică), dar nu poate majora amenda inițială. Riscul
              financiar al contestației este, practic, minim.
            </p>
            <p>
              Vrei să generezi contestația fără să plătești nimic? Folosește{" "}
              <Link href="/contestatie/noua">ContestațieAI</Link> — documentul este gata în 5 minute,
              complet gratuit.
            </p>
          </>
        ),
      },
    ],
    faq: [
      {
        q: "Cât timp am să contest o amendă rutieră?",
        a: "Ai 15 zile de la data înmânării sau comunicării procesului-verbal de contravenție (Art. 31 din OG 2/2001). Dacă procesul-verbal ți-a fost trimis prin poștă, termenul curge de la data confirmării de primire.",
      },
      {
        q: "Trebuie să plătesc amenda dacă o contest?",
        a: "Nu. Conform Art. 32 din OG 2/2001, depunerea plângerii contravenționale suspendă executarea sancțiunii până la soluționarea definitivă a cauzei. Nu ești obligat să plătești cât timp dosarul este pe rol.",
      },
      {
        q: "Merită să contest o amendă radar?",
        a: "Da, în special dacă există vicii procedurale: radar neomologat sau cu certificat de etalonare expirat, lipsă martor asistent, erori în procesul verbal (număr de înmatriculare greșit, dată eronată etc.). Rata de succes a contestațiilor bine argumentate este semnificativă.",
      },
      {
        q: "Ce acte sunt necesare pentru contestarea amenzii?",
        a: "Ai nevoie de: plângerea contravențională (documentul principal), copia procesului-verbal de contravenție și copia actului de identitate. Opțional, dar util: fotografii, înregistrări video, date despre omologarea aparaturii radar.",
      },
    ],
  },

  {
    slug: "termen-contestatie-amenda",
    title: "Termenul de contestare a amenzilor: 15 sau 30 de zile? (Ghid complet)",
    metaTitle: "Termen contestație amendă: 15 sau 30 de zile? Ghid complet 2026",
    metaDescription:
      "Când expiră dreptul de a contesta o amendă? 15 zile pentru contravenții, 30 de zile pentru ANAF. Cum se calculează corect termenul și ce faci dacă a expirat.",
    category: "Legislație",
    publishedAt: "2026-03-28",
    readTime: 6,
    emoji: "📅",
    intro:
      "Una dintre cele mai frecvente greșeli ale persoanelor sancționate este să calculeze greșit termenul de contestare și să piardă dreptul la acțiune. Termenul este fie de 15 zile, fie de 30 de zile — depinde de tipul amenzii. Ghidul de față îți explică exact de când curge, cum se calculează și ce opțiuni ai dacă a expirat.",
    sections: [
      {
        heading: "15 zile pentru contravenții: regula generală din OG 2/2001",
        emoji: "📌",
        content: (
          <>
            <p>
              Termenul standard pentru contestarea unui proces-verbal de contravenție este de{" "}
              <strong>15 zile calendaristice</strong>, prevăzut de{" "}
              <strong>Art. 31 alin. (1) din OG 2/2001</strong>. Această regulă se aplică pentru
              marea majoritate a amenzilor: rutiere (Poliția Rutieră, radar), amenzi de la
              Poliția Locală, Primărie, ITM, DSP, ISU, ANPC și altele.
            </p>
            <p>
              Termenul este <em>de drept substanțial</em>, ceea ce înseamnă că nerespectarea lui
              atrage respingerea plângerii ca tardiv introdusă — instanța nu va analiza fondul
              cauzei. De aceea, calcularea corectă a termenului este esențială.
            </p>
            <p>
              Legea specială poate prevedea termene diferite. De exemplu, în domeniul siguranței
              rutiere, <strong>OUG 195/2002</strong> (Codul Rutier) nu modifică termenul general
              de 15 zile, dar poate impune condiții procedurale suplimentare.
            </p>
          </>
        ),
      },
      {
        heading: "30 de zile pentru actele ANAF: Legea 207/2015",
        emoji: "🏦",
        content: (
          <>
            <p>
              Dacă amenda sau actul contestat provine de la <strong>ANAF</strong> (Agenția
              Națională de Administrare Fiscală) — decizii de impunere, decizii de soluționare a
              inspecției fiscale, somații de plată fiscale — termenul de contestare este de{" "}
              <strong>30 de zile de la data comunicării actului</strong>, conform{" "}
              <strong>Art. 270 alin. (1) din Legea nr. 207/2015</strong> (Codul de procedură
              fiscală).
            </p>
            <p>
              Contestația fiscală se depune mai întâi la <strong>organul fiscal emitent</strong>{" "}
              (nu direct la instanță!), care are obligația să o soluționeze în 45 de zile. Abia
              după răspunsul negativ (sau tăcerea ANAF) poți merge la instanță.
            </p>
            <p>
              Confundarea celor două proceduri este o greșeală frecventă. Dacă ai primit o amendă
              de la un inspector ANAF printr-un proces-verbal de contravenție fiscal (nu o decizie
              de impunere), se aplică tot termenul de 15 zile din OG 2/2001.
            </p>
          </>
        ),
      },
      {
        heading: "De la ce dată se calculează termenul: comunicare, nu data PV",
        emoji: "🗓️",
        content: (
          <>
            <p>
              Cea mai importantă regulă de calcul: termenul curge <strong>de la data comunicării
              procesului verbal</strong>, nu de la data la care a fost întocmit de agent.
            </p>
            <ul>
              <li>
                <strong>Înmânare directă pe loc</strong>: dacă agentul ți-a dat procesul verbal
                pe loc și ai semnat de primire, termenul curge din acea zi (ziua înmânării nu se
                include — prima zi a termenului este ziua următoare, conform regulilor de calcul
                al termenelor procedurale din Codul de procedură civilă, art. 2553).
              </li>
              <li>
                <strong>Comunicare prin poștă</strong>: termenul curge de la data la care ai
                semnat confirmarea de primire (avizul de expediere). Dacă nu ai ridicat coletul
                și s-a returnat, există jurisprudență care consideră comunicarea îndeplinită la
                expirarea termenului de păstrare la oficiul poștal.
              </li>
              <li>
                <strong>Procesul verbal lăsat la ușă / vecin</strong>: în lipsa unei comunicări
                legale, termenul nu curge — poți invoca această neregularitate în contestație.
              </li>
            </ul>
            <p>
              <strong>ContestațieAI</strong> calculează automat dacă ești în termen, pe baza
              datei pe care o introduci, și te avertizează dacă termenul este pe cale să expire.
            </p>
          </>
        ),
      },
      {
        heading: "Ce se întâmplă dacă termenul a expirat",
        emoji: "⚠️",
        content: (
          <>
            <p>
              Dacă termenul de 15 zile a trecut, instanța va respinge plângerea ca{" "}
              <em>tardiv introdusă</em>, fără a analiza motivele invocate. Totuși, există câteva
              situații în care mai poți acționa:
            </p>
            <ul>
              <li>
                <strong>Repunerea în termen</strong> (Art. 186 Cod procedură civilă): poți cere
                instanței să te repună în termen dacă dovedești că ai fost împiedicat de un motiv
                temeinic (spitalizare, calamitate naturală, absență din țară pentru muncă etc.).
                Cererea se depune în 15 zile de la încetarea împiedicării.
              </li>
              <li>
                <strong>Excepția de nelegalitate</strong>: dacă procesul-verbal a fost deja pus
                în executare silită, poți contesta executarea în instanță, invocând neregularități
                grave ale actului.
              </li>
              <li>
                <strong>Contestația la executare</strong>: dacă s-a pornit executarea silită
                (poprire conturi, somare), poți formula contestație la executare în termen de 15
                zile de la comunicarea somaţiei, invocând inclusiv nulitatea titlului executoriu.
              </li>
            </ul>
          </>
        ),
      },
      {
        heading: "Cum dovedești data comunicării: importanța documentelor",
        emoji: "🔍",
        content: (
          <>
            <p>
              Data comunicării este crucială și trebuie dovedită cu documente. Iată ce păstrezi:
            </p>
            <ul>
              <li>
                <strong>Confirmarea de primire poștală</strong> (rosa sau galbenă) — este dovada
                principală a datei comunicării. Nu o arunca niciodată.
              </li>
              <li>
                <strong>Chitanța sau borderoul de înmânare directă</strong> — dacă agentul te-a
                prins pe loc, exemplarul tău din procesul verbal menționează data înmânării.
              </li>
              <li>
                <strong>Notificările din contul <em>ghișeul.ro</em></strong> — dacă ești
                înregistrat, comunicările electronice sunt opozabile și datate.
              </li>
            </ul>
            <p>
              Dacă nu poți dovedi data comunicării și există dubiu, instanțele interpretează de
              obicei în favoarea contestatorului (în dubio pro reo), dar nu te baza exclusiv pe
              aceasta. Acționează cât mai repede după primirea procesului verbal.
            </p>
            <p>
              Folosește <Link href="/contestatie/noua">ContestațieAI</Link> pentru a genera rapid
              contestația și a nu pierde termenul din cauza birocrației.
            </p>
          </>
        ),
      },
    ],
    faq: [
      {
        q: "De când se calculează termenul de contestare?",
        a: "Termenul de 15 zile curge de la data înmânării sau comunicării procesului-verbal, nu de la data întocmirii lui. Prima zi a termenului este ziua următoare datei de comunicare. Pentru actele ANAF, termenul este de 30 de zile și curge de la data comunicării actului administrativ-fiscal.",
      },
      {
        q: "Ce se întâmplă dacă am depășit termenul de 15 zile?",
        a: "Instanța va respinge plângerea ca tardiv introdusă. Totuși, poți cere repunerea în termen dacă ai fost împiedicat de un motiv temeinic (boală, calamitate). Alternativ, dacă s-a pornit executarea silită, poți formula contestație la executare.",
      },
      {
        q: "Termenul de 15 zile include weekendurile?",
        a: "Da, termenul de 15 zile este calendaristic și include weekendurile și sărbătorile legale. Excepție: dacă ultima zi a termenului cade sâmbătă, duminică sau într-o zi de sărbătoare legală, termenul se prelungește până în prima zi lucrătoare ulterioară.",
      },
      {
        q: "Cum dovedesc data comunicării procesului verbal?",
        a: "Prin confirmarea de primire poștală (pentru PV-uri trimise prin poștă), prin copia PV-ului cu data înmânării notată și semnată (pentru înmânare directă), sau prin notificările din contul ghișeul.ro pentru comunicările electronice.",
      },
    ],
  },

  {
    slug: "ce-se-intampla-daca-nu-contesti-amenda",
    title: "Ce se întâmplă dacă nu plătești și nu contești o amendă în România",
    metaTitle: "Ce se întâmplă dacă nu plătești și nu contești amenda în România",
    metaDescription:
      "Riști executare silită, poprire conturi și suspendarea permisului. Află consecințele ignorării unei amenzi și de ce e mai bine să o contești decât să o ignori.",
    category: "Consecințe juridice",
    publishedAt: "2026-04-04",
    readTime: 6,
    emoji: "⚠️",
    intro:
      "Ignorarea unui proces-verbal de contravenție este o strategie care aproape întotdeauna se întoarce împotriva celui sancționat. Chiar dacă la început pare că nu se întâmplă nimic, consecințele pot apărea după luni sau ani: popriri pe cont, suspendarea permisului, înscrierea în cazierul fiscal. Iată ce riscuri asumate concret și de ce contestarea este întotdeauna mai bună decât ignorarea.",
    sections: [
      {
        heading: "Prescripția executării: când expiră dreptul statului de a colecta amenda",
        emoji: "⏳",
        content: (
          <>
            <p>
              Conform <strong>Art. 14 din OG 2/2001</strong>, executarea sancțiunii amenzii
              contravenționale se prescrie în termen de <strong>1 an</strong> de la data la care
              procesul-verbal a rămas definitiv (adică după expirarea termenului de contestare
              sau după rămânerea definitivă a hotărârii judecătorești). Dacă în acest interval
              nu s-a pornit executarea silită, amenda se prescrie și nu mai poate fi colectată
              forțat.
            </p>
            <p>
              Totuși, prescripția nu operează automat — trebuie invocată fie printr-o cerere la
              executorul judecătoresc, fie ca excepție în cadrul contestației la executare.
              Mulți oameni nu știu asta și plătesc amenzi prescrise. Mai mult, prescripția
              poate fi <em>întreruptă</em> prin acte de executare (o somaţie de plată trimisă în
              termen repornește ceasul).
            </p>
            <p>
              Concluzie: prescripția există, dar nu este un plan sigur. Statul are suficient timp
              și resurse să colecteze amenzile, mai ales pe cele rutiere, unde datele sunt
              centralizate în sistemele DRPCIV.
            </p>
          </>
        ),
      },
      {
        heading: "Executarea silită: poprire conturi și somaţie",
        emoji: "🏦",
        content: (
          <>
            <p>
              Procesul-verbal de contravenție este <strong>titlu executoriu</strong> conform{" "}
              <strong>Art. 37 din OG 2/2001</strong>. Asta înseamnă că, la expirarea termenului
              de contestare (sau după respingerea definitivă a plângerii), autoritatea emitentă
              poate porni executarea silită fără a mai obține o hotărâre judecătorească
              suplimentară.
            </p>
            <p>
              Procedura tipică de executare silită:
            </p>
            <ul>
              <li>
                Autoritatea transmite titlul executoriu către un{" "}
                <strong>executor judecătoresc</strong>, care emite somaţia de plată.
              </li>
              <li>
                Dacă nu plătești în termenul din somaţie (de obicei 15 zile), executorul
                procedează la <strong>poprirea conturilor bancare</strong> sau reținerea
                salariului.
              </li>
              <li>
                La suma amenzii se adaugă <strong>cheltuielile de executare</strong> (onorariul
                executorului, taxe poștale etc.), care pot ajunge la 10-20% din suma inițială.
              </li>
            </ul>
            <p>
              Poprirea contului poate fi o surpriză neplăcută care blochează accesul la bani
              exact când ai nevoie de ei. Evită această situație — contestă amenda înainte să
              fie prea târziu cu <Link href="/contestatie/noua">ContestațieAI</Link>.
            </p>
          </>
        ),
      },
      {
        heading: "Suspendarea permisului la acumularea de puncte penalizare",
        emoji: "🚦",
        content: (
          <>
            <p>
              Amenzile rutiere vin însoțite adesea de <strong>puncte de penalizare</strong>,
              conform sistemului prevăzut de <strong>OUG 195/2002</strong> și HG 1391/2006.
              Spre deosebire de amendă, punctele de penalizare nu sunt suspendate prin contestație
              — ele se aplică automat la rămânerea definitivă a procesului-verbal.
            </p>
            <p>
              La acumularea a <strong>15 puncte de penalizare</strong> în ultimii 2 ani,
              permisul de conducere se suspendă timp de 30-90 de zile, în funcție de
              circumstanțe. La 30 de puncte, permisul se anulează și trebuie redobândit prin
              examen.
            </p>
            <p>
              Contestarea procesului-verbal <strong>suspendă inclusiv aplicarea punctelor de
              penalizare</strong> până la soluționarea definitivă a cauzei. Dacă instanța anulează
              PV-ul, punctele nu se mai aplică. Acesta este un motiv suplimentar — uneori mai
              important decât valoarea amenzii — pentru a contesta.
            </p>
          </>
        ),
      },
      {
        heading: "Înregistrarea în cazierul fiscal pentru amenzile ANAF",
        emoji: "📊",
        content: (
          <>
            <p>
              În cazul amenzilor fiscale emise de ANAF, neachitarea la termen generează
              consecințe suplimentare față de cele contravenționale obișnuite:
            </p>
            <ul>
              <li>
                <strong>Înscrierea în cazierul fiscal</strong> (Art. 2 din OG 75/2001):
                contravenienții cu amenzi fiscale neachitate pot apărea în cazierul fiscal,
                document solicitat la înființarea firmelor, la licitații publice și la obținerea
                unor autorizații.
              </li>
              <li>
                <strong>Dobânzi și penalități de întârziere</strong>: pentru obligațiile fiscale
                neachitate la termen, ANAF calculează dobânzi de 0,02% pe zi de întârziere
                și penalități de 0,01% pe zi (conform Legii 207/2015, Codul de procedură
                fiscală).
              </li>
              <li>
                <strong>Blocare rambursări TVA</strong>: firmele cu amenzi fiscale restante pot
                fi blocate de la rambursările de TVA.
              </li>
            </ul>
            <p>
              Pentru amenzi ANAF, contestația se depune în <strong>30 de zile</strong> direct la
              organul fiscal (nu la instanță). Generează contestația cu{" "}
              <Link href="/contestatie/noua">ContestațieAI</Link>, care este adaptat și pentru
              procedura ANAF.
            </p>
          </>
        ),
      },
      {
        heading: "Reducerea cu 50% față de contestare: ce alegi?",
        emoji: "⚖️",
        content: (
          <>
            <p>
              Procesul-verbal de contravenție menționează că poți plăti{" "}
              <strong>jumătate din minimul amenzii</strong> în termen de 15 zile de la comunicare,
              dacă legea specială permite acest lucru (Art. 28 din OG 2/2001). Pare tentant, dar
              există un mare dezavantaj: plata echivalează cu recunoaşterea contravenției.
            </p>
            <ul>
              <li>
                <strong>Dacă plătești jumătate</strong>: recunoști fapta, punctele de penalizare
                se aplică, nu mai poți contesta.
              </li>
              <li>
                <strong>Dacă contești</strong>: suspenda executarea, nu recunoști fapta, poți
                obține anularea completă — inclusiv a punctelor. Dacă pierzi contestația, plătești
                amenda integrală (nu jumătate), dar fără costuri judiciare suplimentare (taxa de
                timbru nu există).
              </li>
            </ul>
            <p>
              Dacă există vicii procedurale sau motive solide de contestare, alegerea este clară:
              contestă. Dacă nu există niciun motiv și vrei să scapi rapid, jumătate poate fi
              convenabil pentru amenzi mici. Pentru amenzi mari sau cu puncte de penalizare
              semnificative, contestația este aproape întotdeauna mai avantajoasă.
            </p>
          </>
        ),
      },
    ],
    faq: [
      {
        q: "Se prescrie o amendă neplătită?",
        a: "Da. Executarea amenzii contravenționale se prescrie în 1 an de la data la care procesul-verbal a rămas definitiv (Art. 14 OG 2/2001). Totuși, prescripția poate fi întreruptă prin acte de executare (somaţii) și trebuie invocată — nu operează automat.",
      },
      {
        q: "Pot să-mi fie poprite conturile pentru o amendă?",
        a: "Da. Procesul-verbal de contravenție este titlu executoriu (Art. 37 OG 2/2001). La expirarea termenului de contestare, autoritatea poate porni executarea silită, inclusiv poprirea conturilor bancare sau reținerea din salariu, la care se adaugă cheltuielile de executare.",
      },
      {
        q: "Amenda neachitată apare în cazierul judiciar?",
        a: "Nu în cazierul judiciar (penal). Amenzile contravenționale nu sunt infracțiuni. Totuși, amenzile fiscale ANAF neachitate pot apărea în cazierul fiscal, care este distinct și poate afecta activitățile comerciale.",
      },
      {
        q: "Pot contesta o amendă după ce a expirat termenul de 15 zile?",
        a: "În principiu, nu. Instanța va respinge plângerea ca tardivă. Excepție: poți cere repunerea în termen dacă dovedești un motiv temeinic de împiedicare (boală gravă, forță majoră). Dacă s-a pornit executarea, poți face contestație la executare (termen: 15 zile de la somaţie).",
      },
    ],
  },

  {
    slug: "motive-contestatie-amenda",
    title: "Cele mai bune motive pentru contestarea unei amenzi (cu exemple reale)",
    metaTitle: "Cele mai bune motive contestare amendă — exemple reale (2026)",
    metaDescription:
      "Care sunt motivele de contestare cu cele mai mari șanse de câștig? Vicii procedurale, probe lipsă, radar neomologat — ghid cu exemple din practica judiciară.",
    category: "Strategii juridice",
    publishedAt: "2026-04-11",
    readTime: 8,
    emoji: "⚖️",
    intro:
      "Nu orice contestație are aceleași șanse de câștig. Motivele invocate fac diferența dintre o plângere admisă și una respinsă. Există trei categorii principale de motive — procedurale, probatorii și de fond — iar unele sunt semnificativ mai puternice decât altele. Ghidul de față îți explică fiecare categorie cu exemple concrete din practica judiciară românească.",
    sections: [
      {
        heading: "Motive procedurale: cele mai puternice arme ale contestatorului",
        emoji: "📋",
        content: (
          <>
            <p>
              Viciile procedurale sunt adesea cele mai eficiente motive de contestare, deoarece
              instanța le poate constata fără a analiza fondul (fapta în sine). Conform{" "}
              <strong>Art. 16 și 17 din OG 2/2001</strong>, procesul-verbal de contravenție
              trebuie să conțină o serie de mențiuni obligatorii; lipsa uneia dintre cele
              esențiale atrage <strong>nulitatea absolută</strong> a actului.
            </p>
            <p>
              Cele mai frecvente vicii procedurale admise de instanțe:
            </p>
            <ul>
              <li>
                <strong>Lipsa descrierii faptei</strong>: procesul-verbal trebuie să conțină o
                descriere clară și completă a faptei. Formulări vagi de tipul „a condus
                neregulamentar&rdquo; fără detalii sunt lovite de nulitate.
              </li>
              <li>
                <strong>Lipsă semnătură agent sau șef ierarhic</strong>: PV-ul semnat doar de
                un agent fără delegare de competență este nul.
              </li>
              <li>
                <strong>Erori materiale esențiale</strong>: număr de înmatriculare greșit,
                dată eronată, date de identitate incorecte — dacă creează confuzie cu privire
                la identitatea contravenientului sau a vehiculului.
              </li>
              <li>
                <strong>Competență teritorială depășită</strong>: agentul constatator care
                aplică amenda în afara circumscripției sale depășește competența, ceea ce poate
                atrage nulitatea.
              </li>
            </ul>
          </>
        ),
      },
      {
        heading: "Motive legate de probe: radarul, martorii și înregistrările",
        emoji: "🔬",
        content: (
          <>
            <p>
              Chiar dacă procesul-verbal este corect formal, poți contesta probele pe care se
              bazează sancționarea. Aceasta este cea mai frecventă strategie pentru amenzile
              radar.
            </p>
            <ul>
              <li>
                <strong>Radar neomologat sau cu etalon expirat</strong>: aparatele de măsurare
                a vitezei trebuie să fie omologate metrologic și verificate periodic. Dacă
                certificatul de etalon a expirat la data constatării, măsurătoarea este nulă de
                drept. Poți solicita prin cerere prealabilă sau prin adresă la instanță buletinul
                de verificare metrologică al radarului.
              </li>
              <li>
                <strong>Lipsă martor asistent</strong>: conform <strong>Art. 19 din OG
                2/2001</strong>, în cazul în care contravenientul nu este de față sau refuză
                semnătura, PV-ul trebuie semnat de un martor asistent. Dacă lipsește martorul
                sau datele acestuia sunt incomplete/fictive (ex. martor cu același domiciliu ca
                agentul), PV-ul poate fi anulat.
              </li>
              <li>
                <strong>Fotografii sau înregistrări care contrazic PV-ul</strong>: dacă ai
                dovezi (GPS log, înregistrare dashcam, martori) care contrazic constatările
                agentului, le poți prezenta instanței. Instanța evaluează probele în contradictoriu.
              </li>
            </ul>
            <p>
              Folosind <Link href="/contestatie-radar">ghidul de contestație radar</Link>, poți
              identifica rapid ce verificări metrologice să soliciți.
            </p>
          </>
        ),
      },
      {
        heading: "Motive de fond: fapta nu constituie contravenție",
        emoji: "🏛️",
        content: (
          <>
            <p>
              Motivele de fond atacă substanța sancționării — susții că fapta fie nu a existat,
              fie nu este prevăzută de lege ca contravenție, fie există circumstanțe care înlătură
              răspunderea.
            </p>
            <ul>
              <li>
                <strong>Starea de necesitate</strong>: dacă ai depășit viteza pentru a evita un
                accident, pentru a transporta de urgență o persoană la spital sau pentru a evita
                o situație periculoasă imprevizibilă, starea de necesitate poate înlătura
                răspunderea contravențională (Art. 11 lit. e din OG 2/2001).
              </li>
              <li>
                <strong>Fapta săvârșită de o altă persoană</strong>: dacă mașina era condusă de
                altcineva la momentul faptei, iar amenda a ajuns la tine ca proprietar (caz
                frecvent la amenzi parcare/radar), poți dovedi că nu erai la volan. Atenție:
                trebuie să poți identifica șoferul real.
              </li>
              <li>
                <strong>Norma juridică aplicabilă nu exista la data faptei</strong>: dacă
                contravenția invocată a fost introdusă după data comiterii faptei, sancționarea
                este ilegală (principiul legalității contravenționale, Art. 1 din OG 2/2001).
              </li>
              <li>
                <strong>Proporționalitate</strong>: instanța poate reduce cuantumul amenzii dacă
                îl consideră disproporționat față de gravitatea faptei și situația materială a
                contravenientului (Art. 21 alin. 3 din OG 2/2001).
              </li>
            </ul>
          </>
        ),
      },
      {
        heading: "Cum alegi motivele cu cea mai mare probabilitate de succes",
        emoji: "🎯",
        content: (
          <>
            <p>
              Strategia corectă este să înveți să prioritizezi motivele în ordinea puterii lor
              juridice:
            </p>
            <ol>
              <li>
                <strong>Nulitate absolută</strong> (vicii procedurale esențiale) — cea mai
                puternică; instanța o constată din oficiu.
              </li>
              <li>
                <strong>Lipsa probelor / probe nelegale</strong> (radar neomologat, martor
                fictiv) — foarte eficientă, dar necesită dovezi sau solicitare de probe la
                instanță.
              </li>
              <li>
                <strong>Cauze exoneratoare de răspundere</strong> (stare de necesitate, altă
                persoană) — necesită dovedire; posibil dacă ai martori sau înregistrări.
              </li>
              <li>
                <strong>Reducerea cuantumului amenzii</strong> — cel mai ușor de obținut, dar
                cel mai puțin spectaculos; util când alte motive lipsesc.
              </li>
            </ol>
            <p>
              Poți invoca <strong>mai multe motive simultan</strong> — acesta este chiar
              recomandat. Instanța va analiza fiecare motiv și va admite plângerea dacă cel puțin
              unul este fondat.
            </p>
            <p>
              <Link href="/contestatie/noua">ContestațieAI</Link> estimează automat șansele de succes
              pe baza motivelor selectate și generează o contestație cu argumentație juridică
              completă pentru fiecare motiv ales.
            </p>
          </>
        ),
      },
      {
        heading: "Exemple din practica judiciară: ce au admis instanțele",
        emoji: "📚",
        content: (
          <>
            <p>
              Practica instanțelor românești conține numeroase cazuri relevante:
            </p>
            <ul>
              <li>
                <strong>Curtea de Apel Cluj, decizie 2023</strong>: a anulat un PV de viteză
                constatând că radarele utilizate nu aveau certificatul de etalonare valabil la
                data constatării. Lipsa documentului metrologic echivalează cu lipsa probei
                contravenției.
              </li>
              <li>
                <strong>Judecătoria Sector 1, sentință 2024</strong>: a admis contestația și a
                anulat PV-ul din cauza lipsei martorului asistent în condițiile în care
                contravenientul nu semna procesul-verbal. Agentul completase rubrica &bdquo;martor&rdquo;
                cu un coleg de serviciu fără prezență fizică la locul faptei — sancționat ca
                martor fictiv.
              </li>
              <li>
                <strong>Judecătoria Iași, sentință 2024</strong>: a redus amenda de la cuantumul
                maxim la cel minim legal, considerând că instanța are dreptul și obligația de a
                individualiza sancțiunea în raport cu gravitatea faptei, periculozitatea
                socială a contravenientului și situația materială a acestuia.
              </li>
            </ul>
            <p>
              Aceste precedente arată că instanțele sunt receptive la argumente bine fundamentate.
              O contestație redactată profesional, cu referințe legale exacte, are șanse reale de
              succes. Generează-o acum cu <Link href="/contestatie/noua">ContestațieAI</Link>.
            </p>
          </>
        ),
      },
    ],
    faq: [
      {
        q: "Care sunt cele mai frecvente motive de contestare admise?",
        a: "Cele mai frecvente motive admise sunt: lipsa sau fictivitatea martorului asistent, radar neomologat sau cu certificat de etalonare expirat, descrierea incompletă a faptei în PV și erori materiale esențiale (număr înmatriculare greșit, dată eronată). Nulitățile absolute sunt constatate de instanță inclusiv din oficiu.",
      },
      {
        q: "Poate fi respinsă contestația dacă am ales motiv greșit?",
        a: "Da, dacă motivul invocat nu este fondat, instanța îl va respinge. Tocmai de aceea este recomandat să invoci mai multe motive simultan. ContestațieAI estimează șansele fiecărui motiv și le include pe cele mai solide în contestație.",
      },
      {
        q: "Ce înseamnă viciu procedural în procesul verbal?",
        a: "Un viciu procedural este o neregularitate în modul în care a fost întocmit sau comunicat procesul-verbal, care afectează legalitatea actului. Viciile esențiale (lipsa descrierii faptei, lipsa semnăturii, lipsă martor obligatoriu) atrag nulitatea absolută a PV-ului.",
      },
      {
        q: "Trebuie să aduc dovezi pentru toate motivele invocate?",
        a: "Nu pentru toate. Viciile de formă ale PV-ului rezultă din însuși actul contestat — nu ai nevoie de probe suplimentare. Pentru motive de fond (stare de necesitate, altă persoană la volan) sau probatorii (radar neomologat), da — trebuie să aduci sau să soliciți probe. Instanța poate dispune și din oficiu administrarea de probe.",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
