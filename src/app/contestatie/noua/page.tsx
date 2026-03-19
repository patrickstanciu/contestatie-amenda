import { ContestatieStepper } from "@/components/contestatie/ContestatieStepper";

export default function ContestatiNouaPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Contestație nouă</h1>
        <p className="mt-1 text-muted-foreground">
          Completează formularul pas cu pas pentru a genera contestația ta.
        </p>
      </div>
      <ContestatieStepper />
    </div>
  );
}
