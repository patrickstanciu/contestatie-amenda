export interface Instanta {
  nume: string;
  adresa: string;
  portal: string;
}

/** Main Judecătorie per județ (Romania). For București, defaults to sector 1. */
const INSTANTE: Record<string, Instanta> = {
  "Alba":               { nume: "Judecătoria Alba Iulia",            adresa: "Str. Tudor Vladimirescu nr. 23, Alba Iulia",     portal: "https://portal.just.ro/57/SitePages/default.aspx" },
  "Arad":               { nume: "Judecătoria Arad",                  adresa: "Str. Tribunalului nr. 1, Arad",                  portal: "https://portal.just.ro/6/SitePages/default.aspx" },
  "Argeș":              { nume: "Judecătoria Pitești",               adresa: "Str. Armand Călinescu nr. 14, Pitești",          portal: "https://portal.just.ro/110/SitePages/default.aspx" },
  "Bacău":              { nume: "Judecătoria Bacău",                 adresa: "Str. Mărășești nr. 2, Bacău",                   portal: "https://portal.just.ro/111/SitePages/default.aspx" },
  "Bihor":              { nume: "Judecătoria Oradea",                adresa: "Str. Dimitrie Cantemir nr. 2-4, Oradea",         portal: "https://portal.just.ro/7/SitePages/default.aspx" },
  "Bistrița-Năsăud":   { nume: "Judecătoria Bistrița",              adresa: "Str. Andrei Mureșanu nr. 1, Bistrița",           portal: "https://portal.just.ro/87/SitePages/default.aspx" },
  "Botoșani":           { nume: "Judecătoria Botoșani",              adresa: "Piața Revoluției nr. 5, Botoșani",               portal: "https://portal.just.ro/113/SitePages/default.aspx" },
  "Brăila":             { nume: "Judecătoria Brăila",                adresa: "Str. Griviței nr. 1, Brăila",                   portal: "https://portal.just.ro/114/SitePages/default.aspx" },
  "Brașov":             { nume: "Judecătoria Brașov",                adresa: "Str. Lungă nr. 35, Brașov",                     portal: "https://portal.just.ro/11/SitePages/default.aspx" },
  "București":          { nume: "Judecătoria Sectorului 1 București",adresa: "Str. Știrbei Vodă nr. 79-81, București",        portal: "https://portal.just.ro/177/SitePages/default.aspx" },
  "Buzău":              { nume: "Judecătoria Buzău",                 adresa: "Bd. Nicolae Bălcescu nr. 5, Buzău",              portal: "https://portal.just.ro/116/SitePages/default.aspx" },
  "Călărași":           { nume: "Judecătoria Călărași",              adresa: "Str. București nr. 56, Călărași",                portal: "https://portal.just.ro/178/SitePages/default.aspx" },
  "Caraș-Severin":      { nume: "Judecătoria Reșița",               adresa: "Str. Republicii nr. 5, Reșița",                  portal: "https://portal.just.ro/37/SitePages/default.aspx" },
  "Cluj":               { nume: "Judecătoria Cluj-Napoca",           adresa: "Calea Dorobanților nr. 2-4, Cluj-Napoca",        portal: "https://portal.just.ro/85/SitePages/default.aspx" },
  "Constanța":          { nume: "Judecătoria Constanța",             adresa: "Str. Traian nr. 33, Constanța",                 portal: "https://portal.just.ro/56/SitePages/default.aspx" },
  "Covasna":            { nume: "Judecătoria Sfântu Gheorghe",       adresa: "Str. Gábor Áron nr. 1, Sfântu Gheorghe",         portal: "https://portal.just.ro/13/SitePages/default.aspx" },
  "Dâmbovița":          { nume: "Judecătoria Târgoviște",            adresa: "Str. Justiției nr. 2, Târgoviște",              portal: "https://portal.just.ro/122/SitePages/default.aspx" },
  "Dolj":               { nume: "Judecătoria Craiova",               adresa: "Str. Brestei nr. 2, Craiova",                   portal: "https://portal.just.ro/94/SitePages/default.aspx" },
  "Galați":             { nume: "Judecătoria Galați",                adresa: "Str. Brăilei nr. 153, Galați",                  portal: "https://portal.just.ro/118/SitePages/default.aspx" },
  "Giurgiu":            { nume: "Judecătoria Giurgiu",               adresa: "Str. Vlad Țepeș nr. 1, Giurgiu",               portal: "https://portal.just.ro/181/SitePages/default.aspx" },
  "Gorj":               { nume: "Judecătoria Târgu Jiu",             adresa: "Str. Victoriei nr. 4, Târgu Jiu",               portal: "https://portal.just.ro/95/SitePages/default.aspx" },
  "Harghita":           { nume: "Judecătoria Miercurea Ciuc",        adresa: "Str. Kossuth Lajos nr. 2, Miercurea Ciuc",       portal: "https://portal.just.ro/14/SitePages/default.aspx" },
  "Hunedoara":          { nume: "Judecătoria Deva",                  adresa: "Str. 1 Decembrie nr. 37, Deva",                  portal: "https://portal.just.ro/62/SitePages/default.aspx" },
  "Ialomița":           { nume: "Judecătoria Slobozia",              adresa: "Str. Lacului nr. 1, Slobozia",                  portal: "https://portal.just.ro/182/SitePages/default.aspx" },
  "Iași":               { nume: "Judecătoria Iași",                  adresa: "Str. Anastasie Panu nr. 25, Iași",               portal: "https://portal.just.ro/1/SitePages/default.aspx" },
  "Ilfov":              { nume: "Judecătoria Buftea",                adresa: "Str. Republicii nr. 1, Buftea",                  portal: "https://portal.just.ro/183/SitePages/default.aspx" },
  "Maramureș":          { nume: "Judecătoria Baia Mare",             adresa: "Str. Gheorghe Șincai nr. 18, Baia Mare",         portal: "https://portal.just.ro/90/SitePages/default.aspx" },
  "Mehedinți":          { nume: "Judecătoria Drobeta-Turnu Severin", adresa: "Str. Crișan nr. 2, Drobeta-Turnu Severin",       portal: "https://portal.just.ro/97/SitePages/default.aspx" },
  "Mureș":              { nume: "Judecătoria Târgu Mureș",           adresa: "Str. Justitiei nr. 1, Târgu Mureș",             portal: "https://portal.just.ro/15/SitePages/default.aspx" },
  "Neamț":              { nume: "Judecătoria Piatra Neamț",          adresa: "Str. Mihai Eminescu nr. 2, Piatra Neamț",        portal: "https://portal.just.ro/103/SitePages/default.aspx" },
  "Olt":                { nume: "Judecătoria Slatina",               adresa: "Str. Pitești nr. 1, Slatina",                   portal: "https://portal.just.ro/100/SitePages/default.aspx" },
  "Prahova":            { nume: "Judecătoria Ploiești",              adresa: "Str. Gheorghe Gr. Cantacuzino nr. 1, Ploiești",  portal: "https://portal.just.ro/105/SitePages/default.aspx" },
  "Sălaj":              { nume: "Judecătoria Zalău",                 adresa: "Str. Unirii nr. 2, Zalău",                      portal: "https://portal.just.ro/67/SitePages/default.aspx" },
  "Satu Mare":          { nume: "Judecătoria Satu Mare",             adresa: "Str. Parcului nr. 2, Satu Mare",                portal: "https://portal.just.ro/68/SitePages/default.aspx" },
  "Sibiu":              { nume: "Judecătoria Sibiu",                 adresa: "Str. Tribunalului nr. 1, Sibiu",                portal: "https://portal.just.ro/16/SitePages/default.aspx" },
  "Suceava":            { nume: "Judecătoria Suceava",               adresa: "Str. Ștefan cel Mare nr. 62, Suceava",          portal: "https://portal.just.ro/42/SitePages/default.aspx" },
  "Teleorman":          { nume: "Judecătoria Alexandria",            adresa: "Str. Dunării nr. 2, Alexandria",                portal: "https://portal.just.ro/186/SitePages/default.aspx" },
  "Timiș":              { nume: "Judecătoria Timișoara",             adresa: "Str. Mărășești nr. 2, Timișoara",               portal: "https://portal.just.ro/55/SitePages/default.aspx" },
  "Tulcea":             { nume: "Judecătoria Tulcea",                adresa: "Str. Păcii nr. 2, Tulcea",                      portal: "https://portal.just.ro/131/SitePages/default.aspx" },
  "Vâlcea":             { nume: "Judecătoria Râmnicu Vâlcea",        adresa: "Str. General Praporgescu nr. 1, Râmnicu Vâlcea", portal: "https://portal.just.ro/101/SitePages/default.aspx" },
  "Vaslui":             { nume: "Judecătoria Vaslui",                adresa: "Str. Ștefan cel Mare nr. 88, Vaslui",           portal: "https://portal.just.ro/107/SitePages/default.aspx" },
  "Vrancea":            { nume: "Judecătoria Focșani",               adresa: "Str. Cuza Vodă nr. 31, Focșani",               portal: "https://portal.just.ro/132/SitePages/default.aspx" },
};

export function detecteazaInstanta(judet?: string): Instanta | null {
  if (!judet) return null;
  return INSTANTE[judet] ?? null;
}
