import { signIn } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

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
          {/* Google sign-in */}
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dashboard" });
            }}
          >
            <Button type="submit" variant="outline" className="w-full gap-3" size="lg">
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continuă cu Google
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">sau</span>
            </div>
          </div>

          {/* Email sign-in */}
          <form
            action={async (formData: FormData) => {
              "use server";
              const email = formData.get("email") as string;
              await signIn("resend", {
                email,
                redirectTo: "/dashboard",
              });
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Adresă de email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="tu@exemplu.ro"
                required
                autoComplete="email"
              />
            </div>
            <Button type="submit" className="w-full" size="lg">
              Trimite link de autentificare
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            Vei primi un email cu un link magic de autentificare.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
