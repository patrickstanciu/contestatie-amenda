import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";
import { Mail, MapPin, Clock, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | ContestațieAI",
  description:
    "Ai întrebări sau ai nevoie de ajutor? Contactează echipa ContestațieAI — îți răspundem în cel mult 24 de ore.",
};

const details = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@contestatieamenda.ro",
    href: "mailto:contact@contestatieamenda.ro",
  },
  {
    icon: Clock,
    label: "Timp de răspuns",
    value: "Maximum 24 de ore",
    href: null,
  },
  {
    icon: Building2,
    label: "Firmă",
    value: "TECHNEST LABS SRL · CUI 49393956",
    href: null,
  },
  {
    icon: MapPin,
    label: "Adresă",
    value: "Principala 14, Dulcele, jud. Arad, 317147",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      {/* Hero */}
      <section className="border-b bg-muted/30 py-14 px-4 text-center">
        <div className="mx-auto max-w-xl">
          <p className="text-3xl mb-3">📬</p>
          <h1 className="text-3xl font-bold tracking-tight mb-3">
            Contactează-ne
          </h1>
          <p className="text-muted-foreground text-base">
            Ai o întrebare, o problemă sau vrei să ne dai un feedback?
            Completează formularul și îți răspundem în cel mult 24 de ore.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-1">Date de contact</h2>
              <p className="text-sm text-muted-foreground">
                Suntem o echipă mică, dar răspundem rapid la orice întrebare.
              </p>
            </div>

            <ul className="space-y-4">
              {details.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border bg-card p-8 shadow-sm">
              <h2 className="text-lg font-semibold mb-1">Trimite un mesaj</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Completează formularul de mai jos și te contactăm noi.
              </p>
              <ContactForm />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
