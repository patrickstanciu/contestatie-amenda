import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getDatePersonale } from "@/app/actions/account";
import { AccountForm } from "./account-form";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const datePersonale = await getDatePersonale();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Setări cont</h1>
        <p className="text-muted-foreground mt-1">
          Datele salvate vor fi completate automat la o contestație nouă.
        </p>
      </div>
      <AccountForm initialData={datePersonale} />
    </div>
  );
}
