import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Already logged in → redirect away from login page ──
  if (pathname === "/admin/login") {
    const token = req.cookies.get("token")?.value;
    if (token && process.env.JWT_SECRET) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(token, secret);
        // Valid token → send to dashboard instead of showing login
        return NextResponse.redirect(new URL("/admin/mission", req.url));
      } catch {
        // Invalid token → let them see login page
      }
    }
    return NextResponse.next();
  }

  // ── Protect all /admin/* routes ──
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("token")?.value;

    // No token at all
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    // JWT_SECRET missing → block access, don't crash
    if (!process.env.JWT_SECRET) {
      console.error("FATAL: JWT_SECRET is not set in .env.local");
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.next(); // ✅ Valid → allow
    } catch (err) {
      // Expired or tampered token
      const res = NextResponse.redirect(new URL("/admin/login", req.url));
      res.cookies.set("token", "", { maxAge: 0, path: "/" }); // clear bad cookie
      return res;
    }
  }

  // ── Protect all /api/admin/* routes ──
  if (pathname.startsWith("/api/admin") && pathname !== "/api/admin/login") {
    const token = req.cookies.get("token")?.value;

    if (!token || !process.env.JWT_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
