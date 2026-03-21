import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LoginForm } from "./LoginForm";

const AUTH_ERRORS: Record<string, string> = {
  OAuthAccountNotLinked: "Această adresă de email este deja asociată unui alt provider. Folosește același provider cu care te-ai înregistrat.",
  EmailSignin: "Nu s-a putut trimite emailul de autentificare. Verifică adresa și încearcă din nou.",
  Callback: "A apărut o eroare în procesul de autentificare. Încearcă din nou.",
  OAuthCallback: "Eroare la autentificarea cu Google. Încearcă din nou.",
  Default: "A apărut o eroare la autentificare. Încearcă din nou.",
};

interface PageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function LoginPage({ searchParams }: PageProps) {
  const { error } = await searchParams;
  const errorMessage = error ? (AUTH_ERRORS[error] ?? AUTH_ERRORS.Default) : null;
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-1">
          <div className="text-4xl mb-2">⚖️</div>
          <CardTitle className="text-2xl font-bold">Autentifică-te</CardTitle>
          <CardDescription>
            Intră în cont pentru a-ți accesa contestațiile
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {errorMessage && (
            <div className="rounded-md bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
              {errorMessage}
            </div>
          )}
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
