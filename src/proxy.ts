import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const maintenance = process.env.MAINTENANCE_MODE === "true";
  const { pathname } = request.nextUrl;

  if (
    maintenance &&
    pathname !== "/maintenance" &&
    !pathname.startsWith("/api/auth")
  ) {
    return new NextResponse("Service Unavailable", { status: 503 });
  }

  if (!maintenance && pathname === "/maintenance") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // @ts-expect-error — auth middleware accepts NextRequest
  return auth(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.svg|.*\\.jpg|.*\\.ico).*)",
  ],
};
