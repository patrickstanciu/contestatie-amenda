import Link from "next/link";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
        >
          <span>⚖️</span>
          <span>ContestațieAI</span>
        </Link>

        <nav className="hidden sm:flex items-center gap-6 text-m font-medium">
          {!session && (
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Acasă
            </Link>
          )}
          {session && (
            <>
              <Link
                href="/dashboard"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/account"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Setări cont
              </Link>
              {session.user?.email === process.env.ADMIN_EMAIL && (
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary hover:bg-primary/20 transition-colors"
                >
                  📊 Admin
                </Link>
              )}
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {session ? (
            <>
              <div className="hidden sm:flex items-center gap-2">
                {session.user?.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={session.user.image}
                    alt={session.user.name ?? "Avatar"}
                    className="h-8 w-8 rounded-full border border-border"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    {session.user?.name?.charAt(0).toUpperCase() ?? "U"}
                  </div>
                )}
                <span className="text-m text-muted-foreground truncate max-w-[140px]">
                  {session.user?.name ?? session.user?.email}
                </span>
              </div>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <Button type="submit" variant="outline" size="sm">
                  Ieși din cont
                </Button>
              </form>
            </>
          ) : (
            <Button render={<Link href="/login" />} size="sm">
              Autentificare
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
