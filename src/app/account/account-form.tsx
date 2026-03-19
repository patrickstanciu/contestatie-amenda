"use client";

import { useState } from "react";
import { saveDatePersonale, type DatePersonaleInput } from "@/app/actions/account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const JUDETE = [
  "Alba", "Arad", "Argeș", "Bacău", "Bihor", "Bistrița-Năsăud", "Botoșani",
  "Brăila", "Brașov", "București", "Buzău", "Călărași", "Caraș-Severin",
  "Cluj", "Constanța", "Covasna", "Dâmbovița", "Dolj", "Galați", "Giurgiu",
  "Gorj", "Harghita", "Hunedoara", "Ialomița", "Iași", "Ilfov", "Maramureș",
  "Mehedinți", "Mureș", "Neamț", "Olt", "Prahova", "Sălaj", "Satu Mare",
  "Sibiu", "Suceava", "Teleorman", "Timiș", "Tulcea", "Vâlcea", "Vaslui", "Vrancea",
];

interface AccountFormProps {
  initialData: DatePersonaleInput | null;
}

export function AccountForm({ initialData }: Readonly<AccountFormProps>) {
  const [form, setForm] = useState<DatePersonaleInput>({
    numePrenume: initialData?.numePrenume ?? "",
    cnp: initialData?.cnp ?? "",
    adresa: initialData?.adresa ?? "",
    judet: initialData?.judet ?? "",
    telefon: initialData?.telefon ?? "",
    email: initialData?.email ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set(field: keyof DatePersonaleInput, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      await saveDatePersonale(form);
      setSaved(true);
    } catch {
      setError("A apărut o eroare la salvare. Încearcă din nou.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Date personale</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="numePrenume">Nume și prenume *</Label>
              <Input
                id="numePrenume"
                value={form.numePrenume}
                onChange={(e) => set("numePrenume", e.target.value)}
                placeholder="ex. Ionescu Alexandru"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cnp">CNP *</Label>
              <Input
                id="cnp"
                value={form.cnp}
                onChange={(e) => set("cnp", e.target.value)}
                placeholder="1850315123456"
                maxLength={13}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="adresa">Adresă *</Label>
            <Input
              id="adresa"
              value={form.adresa}
              onChange={(e) => set("adresa", e.target.value)}
              placeholder="ex. Str. Mihai Eminescu nr. 12, ap. 3"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="judet">Județ *</Label>
              <select
                id="judet"
                value={form.judet}
                onChange={(e) => set("judet", e.target.value)}
                required
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">Selectează județ</option>
                {JUDETE.map((j) => (
                  <option key={j} value={j}>{j}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefon">Telefon *</Label>
              <Input
                id="telefon"
                type="tel"
                value={form.telefon}
                onChange={(e) => set("telefon", e.target.value)}
                placeholder="07xx xxx xxx"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="adresa@email.ro"
              required
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" disabled={saving}>
              {saving ? "Se salvează..." : "Salvează"}
            </Button>
            {saved && (
              <span className="text-sm text-green-600 dark:text-green-400">
                ✓ Salvat cu succes
              </span>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
